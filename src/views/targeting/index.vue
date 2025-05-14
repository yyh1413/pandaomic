<template>
  <div class="heatmap-container" v-loading="loading">
    <LeftMenu />

    <table class="heatmap-table">
      <thead>
        <tr class="thead-group">
          <!-- <th class="thead-cell">Gene</th> -->
          <!-- <th v-for="(group, index) in columnGroups" :key="index" :colspan="group.columns.length" class="thead-group-cell">
            {{ group.name }}
          </th> -->
          <!-- <th class="thead-cell" colspan="4">Status</th>
          <th class="thead-cell">Source</th>
          <th class="thead-cell">Type</th> -->
        </tr>
        <tr class="thead-column">
          <th class="thead-cell"></th>
          <th v-for="col in flatColumns" :key="col" class="thead-column-cell">
            <div class="column-label">{{ col }}</div>
          </th>
          <!-- <th class="thead-status-cell success">✓</th>
          <th class="thead-status-cell warning">!</th>
          <th class="thead-status-cell error">×</th>
          <th class="thead-status-cell">-</th>
          <th class="thead-cell"></th>
          <th class="thead-cell"></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rowData" :key="rowIndex" :class="{ 'row-alt': rowIndex % 2 === 0 }">
          <td class="tbody-cell gene-cell">{{ row.gene }}</td>
          <td v-for="(score, colIndex) in row.scores" :key="colIndex" class="tbody-cell score-cell" :style="{ backgroundColor: getColorIntensity(score) }"
            @mouseenter="onMouseEnter(row.gene, colIndex, score, $event)" @mouseleave="onMouseLeave"></td>
          <!-- <td class="tbody-cell status-cell success">
            <span v-html="getStatusIcon(true, 'check')"></span>
          </td>
          <td class="tbody-cell status-cell warning">
            <span v-html="getStatusIcon(false, 'check')"></span>
          </td>
          <td class="tbody-cell status-cell error">
            <span v-html="getStatusIcon(true, 'check')"></span>
          </td> -->
          <!-- <td class="tbody-cell status-cell">-</td> -->
          <td class="tbody-cell source-cell">{{ row.source }}</td>
          <td class="tbody-cell source-cell">{{ row.type }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="hoveredCell" class="tooltip" :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }">
      <p><strong>Gene:</strong> {{ hoveredCell.row }}</p>
      <p><strong>Score:</strong> {{ hoveredCell.score.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/leftMenu/index.vue';
export default {
  components: {
    LeftMenu
  },
  name: 'HeatMap',
  data() {
    return {
      loading: false,
      id: '',
      hoveredCell: null,
      tooltipX: 0,
      tooltipY: 0,
      columnGroups: [
        // { name: 'KOL', columns: ['PMID', 'SAFETY', 'Novelty'] },
        // { name: 'Tissue', columns: ['Structure', 'Development level', 'Target family'] }
      ],
      rowData: [
        // { gene: 'STAT1', type: 'Transcription Factor', source: 'Tchem', scores: [0.1, 0.2, 0.3] },
        // { gene: 'STAT1', type: 'Transcription Factor', source: 'Tchem', scores: [0.1, 0.2, 0.3] },
      ]
    };
  },
  mounted() {
    this.id = this.$route.query.id
    // 初始化数据
    this.getTargetingData()
  },
  computed: {

    flatColumns() {
      return this.columnGroups.reduce((acc, group) => acc.concat(group.columns), []);
    }
  },
  methods: {
    getTargetingData() {
      const params = {
        "input_value": this.id || "MONDO_0008903",
        "output_type": "text",
        "input_type": "text"
      }
      this.loading = true
      this.http.post('http://192.168.0.12:7860/api/v1/run/d65739d6-7f86-4816-8cba-27e9a6f12255', params).then((res) => {
        const fixedJsonString = res.outputs[0]?.outputs[0]?.outputs?.message?.message.replaceAll(/:\s*NaN/g, ':null');
        const result = JSON.parse(fixedJsonString).merged_result
        this.transformGeneDataToHeatmapFormat(result)
        console.log('result', result);
      }).finally(() => {
        this.loading = false
      })
    },
    transformGeneDataToHeatmapFormat(originalData) {
      // 定义列组（可以根据实际需求调整）
      const columnGroups = [
        {
          name: 'Gene Info',
          columns: ['Mutated Score', 'Disease Score', 'Relevance Score', 'Development level', 'Target family']
        },
        // {
        //   name: 'Classification',
        //   columns: ['Gene Type', 'Target Level']
        // }
      ];

      // 转换行数据
      const rowData = originalData.map(gene => ({
        gene: gene['Gene Symbol'],
        type: gene.fam || '-',
        source: gene.TDL || '-',
        scores: [
          gene['Mutated sub-module Score'],
          gene['Disease sub-module Score'],
          gene['Relevance Score']
        ]
      }));
      this.columnGroups = columnGroups;
      this.rowData = rowData;
      console.log('columnGroups', columnGroups);
      console.log('rowData', rowData);

    },
    getColorIntensity(score) {
      return `rgba(40, 167, 69, ${score})`;
    },
    getStatusIcon(status, type) {
      if (type === 'check') {
        return status
          ? `<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`
          : `<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;
      }
      return '';
    },
    onMouseEnter(row, col, score, event) {
      this.hoveredCell = { row, col, score };
      this.tooltipX = event.pageX + 10;
      this.tooltipY = event.pageY + 10;
    },
    onMouseLeave() {
      this.hoveredCell = null;
    }
  }
};
</script>

<style scoped>
.heatmap-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px 0 82px 24px;
  /* margin-top: 20px; */
  height: 100%;
  padding: 16px;
  overflow-x: auto;
}

.heatmap-table {
  border-collapse: collapse;
  /* width: 100%; */
}

.thead-group {
  background-color: #f9fafb;
}

.thead-cell,
.thead-group-cell,
.thead-status-cell {
  padding: 8px;
  /* border: 1px solid #d1d5db; */
  font-weight: bold;
  color: #374151;
  text-align: center;
}

.thead-group-cell {
  background-color: #f3f4f6;
}

.thead-column {
  /* background-color: #ffffff; */
}

.thead-column-cell {
  position: relative;
  height: 128px;
  /* border: 1px solid #d1d5db; */
}

.column-label {
  position: absolute;
  bottom: 37px;
  left: 50px;
  transform: translateX(-50%) rotate(-45deg);
  white-space: nowrap;
  font-size: 12px;
  color: #6b7280;
}

.thead-status-cell.success {
  background-color: #d1fae5;
}

.thead-status-cell.warning {
  background-color: #fef9c3;
}

.thead-status-cell.error {
  background-color: #fee2e2;
}

.row-alt {
  background-color: #f9fafb;
}

.tbody-cell {
  padding: 8px;
  border: 1px solid #d1d5db;
  text-align: center;
  vertical-align: middle;
}

.source-cell {
  border: none;
  font-size: 12px;
  background: none;
  text-align: left;
}

.gene-cell {
  width: 100px;
  font-weight: 500;
  color: #374151;
}

.score-cell {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.status-cell {
  font-size: 16px;
}

.tooltip {
  position: fixed;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 14px;
  color: #374151;
}

.icon {
  width: 20px;
  height: 20px;
  color: inherit;
}
</style>
