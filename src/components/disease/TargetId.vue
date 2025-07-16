<template>
  <div class="content-section fade-in" style="min-height: 120vh;">
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Top 100 Targets for Lung disease</h1>
        </div>
        <div class="flex items-center space-x-4">
          <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm">
            <option>Associated Genes</option>
            <option>Trending Genes</option>
            <option>Novel Targets (Small Molecules)</option>
            <option>Novel Targets (Antibodies)</option>
          </select>
          <TargetIdControls />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6" style="min-height: calc(120vh - 200px);">
      <!-- Left Sidebar - Filters -->
      <div class="lg:col-span-1">
        <TargetFilters />
      </div>

      <!-- Main Content - Heatmap -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-sm p-2" style="height: calc(120vh - 88px);">
          <div class="relative" style="height: 100%; padding-bottom: 30px;">
            <div ref="targetHeatmap" style="width: 100%; height: calc(100% - 30px);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import TargetIdControls from './components/TargetIdControls.vue'
import TargetFilters from './components/TargetFilters.vue'

// Template refs
const targetHeatmap = ref(null)

// Initialize heatmap
const initTargetHeatmap = async () => {
  await nextTick()
  if (!targetHeatmap.value) return
  
  // Import ECharts dynamically
  const echarts = await import('echarts')
  const myChart = echarts.init(targetHeatmap.value)
  
  // 简化的热图配置
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: 'Target: {b}<br/>Score: {c}'
    },
    grid: {
      left: 80,
      right: 60,
      top: 120,
      bottom: 100
    },
    xAxis: {
      type: 'category',
      data: ['Score1', 'Score2', 'Score3', 'Score4', 'Score5'],
      position: 'top',
      axisLabel: {
        rotate: -45,
        fontSize: 11
      }
    },
    yAxis: {
      type: 'category',
      data: ['EGFR', 'KRAS', 'TP53', 'ALK', 'ROS1'],
      axisLabel: {
        fontSize: 11
      }
    },
    series: [{
      name: 'Target Scores',
      type: 'heatmap',
      data: [
        [0, 0, Math.random()],
        [0, 1, Math.random()],
        [0, 2, Math.random()],
        [1, 0, Math.random()],
        [1, 1, Math.random()],
        [1, 2, Math.random()],
        [2, 0, Math.random()],
        [2, 1, Math.random()],
        [2, 2, Math.random()]
      ],
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      itemStyle: {
        borderRadius: 4
      }
    }]
  }
  
  myChart.setOption(option)
  
  // Responsive
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

onMounted(() => {
  initTargetHeatmap()
})
</script>

<style scoped>
.content-section {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.text-primary {
  color: #519294;
}

.focus\:ring-primary\/20:focus {
  --tw-ring-color: rgba(81, 146, 148, 0.2);
}

.focus\:border-primary:focus {
  border-color: #519294;
}
</style> 