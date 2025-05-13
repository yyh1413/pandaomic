<template>
  <div class="container">
    <h1>基因表达差异分析可视化</h1>

    <div class="statistics">
      <div class="stat-box">
        <div class="stat-value" id="total-genes">{{ totalGenes }}</div>
        <div class="stat-label">总基因数</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" id="up-genes">{{ upGenes }}</div>
        <div class="stat-label">上调基因数</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" id="down-genes">{{ downGenes }}</div>
        <div class="stat-label">下调基因数</div>
      </div>
    </div>

    <div class="legends">
      <div class="legend-item">
        <div class="legend-color" style="background-color: #ff4d4f;"></div>
        <span>下调基因</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #52c41a;"></div>
        <span>上调基因</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #bfbfbf;"></div>
        <span>无显著差异</span>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-box">
        <div class="chart-header">
          <h3 class="chart-title">火山图 - logFC vs -log10(FDR)</h3>
        </div>
        <div id="volcano-chart" class="chart" ref="volcanoChart">
          <div class="loading" v-if="loading">加载中...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ScatterPlot',
  data() {
    return {
      volcanoChart: null,
      loading: true,
      geneData: [],
      totalGenes: 0,
      upGenes: 0,
      downGenes: 0
    };
  },
  mounted() {
    this.initCharts();
    this.fetchGeneData();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.volcanoChart) {
      this.volcanoChart.dispose();
    }
  },
  methods: {
    initCharts() {
      this.volcanoChart = echarts.init(this.$refs.volcanoChart);
    },
    handleResize() {
      if (this.volcanoChart) {
        this.volcanoChart.resize();
      }
    },
    fetchGeneData() {
      const apiUrl = 'http://192.168.0.12:7860/api/v1/run/a33815a4-a01b-4201-9e3e-25fdb0c004ed?stream=false';
      
      const requestBody = {
        "input_value": JSON.stringify({ "x": "1", "y": "2", "method": "0" }),
        "output_type": "chat",
        "input_type": "chat"
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          this.geneData = this.parseApiResponse(data);
          this.updateStatistics();
          this.drawVolcanoChart();
          this.loading = false;
        })
        .catch(error => {
          console.error('获取数据出错:', error);
          alert('获取数据出错，请检查控制台以获取详细信息');
          this.loading = false;
        });
    },
    parseApiResponse(apiResponse) {
      try {
        const outputData = apiResponse.outputs[0].outputs[0].results.message.text;
        return JSON.parse(outputData);
      } catch (error) {
        console.error('解析API响应失败:', error);
        return [];
      }
    },
    updateStatistics() {
      this.totalGenes = this.geneData.length;
      this.upGenes = this.geneData.filter(item => item.regulation.includes('Upregulated')).length;
      this.downGenes = this.geneData.filter(item => item.regulation.includes('Downregulated')).length;
    },
    drawVolcanoChart() {
      const scatterData = this.geneData.map(item => {
        let color = '#bfbfbf'; // 默认灰色
        if (item.regulation.includes('Upregulated')) {
          color = '#52c41a'; // 上调为绿色
        } else if (item.regulation.includes('Downregulated')) {
          color = '#ff4d4f'; // 下调为红色
        }

        return {
          value: [item.logFC, item.negLogFDR],
          itemStyle: {
            color: color
          },
          gene: item.gene,
          regulation: item.regulation
        };
      });

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const data = params.data;
            return `基因: ${data.gene}<br/>` +
              `logFC: ${data.value[0].toFixed(4)}<br/>` +
              `-log10(FDR): ${data.value[1].toFixed(4)}<br/>` +
              `调控: ${data.regulation}`;
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: 'logFC',
          nameLocation: 'center',
          nameGap: 30,
          nameTextStyle: {
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ddd'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '-log10(FDR)',
          nameLocation: 'center',
          nameGap: 40,
          nameTextStyle: {
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ddd'
            }
          }
        },
        series: [{
          type: 'scatter',
          data: scatterData,
          symbolSize: 8,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderColor: '#333',
              borderWidth: 2
            }
          }
        }],
        markLine: {
          silent: true,
          lineStyle: {
            color: '#999',
            type: 'dashed'
          },
          data: [
            {
              xAxis: 0,
              label: {
                formatter: 'logFC = 0',
                position: 'end'
              }
            },
            {
              yAxis: 1.3, // -log10(0.05)
              label: {
                formatter: 'FDR = 0.05',
                position: 'end'
              }
            }
          ]
        }
      };

      this.volcanoChart.setOption(option);
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chart-box {
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.chart {
  height: 500px;
  width: 100%;
}

.chart-header {
  background-color: #f8f8f8;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.chart-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
}

.legends {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.statistics {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 10px;
}

.stat-box {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
}

.stat-label {
  color: #666;
  font-size: 14px;
}
</style>