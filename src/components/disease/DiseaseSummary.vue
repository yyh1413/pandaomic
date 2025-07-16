<template>
  <div class="content-section active fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Lung Cancer</h1>
      <p class="text-gray-600">A malignant neoplasm involving the lung</p>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Left Column (1/3) -->
      <div class="space-y-6">
        <!-- Attention Score -->
        <MetricCard
          title="Attention Score"
          value="100%"
          icon="fas fa-eye"
          iconColor="from-red-600 to-red-700"
          valueColor="text-red-600"
          :progress="100"
          progressColor="from-red-500 to-red-600"
          description="Attention Score is based on the total mentions of a disease in the text data."
        />

        <!-- Trend -->
        <MetricCard
          title="Trend"
          value="5%"
          icon="fas fa-chart-line"
          iconColor="from-yellow-500 to-orange-500"
          valueColor="text-yellow-600"
          description="Estimates the growth of attention to the disease given during the last 5-year period."
        />

        <!-- Target ID -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-bullseye text-green-600 text-sm"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Target ID</h3>
              <i class="fas fa-check-circle text-green-500 ml-2"></i>
            </div>
            <a href="#" class="text-[#519294] text-sm hover:underline">FIND TARGETS ></a>
          </div>
          <p class="text-sm text-gray-600">Targets and associated Genes</p>
        </div>
      </div>

      <!-- Middle Column (1/3) -->
      <div class="space-y-6">
        <!-- Research Dynamics -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Research Dynamics</h2>
            <a href="#" class="text-[#519294] text-sm hover:underline">VIEW ALL ></a>
          </div>
          
          <div class="space-y-4">
            <div class="relative h-64">
              <canvas ref="researchDynamicsChart"></canvas>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-sm font-medium text-gray-500">Total Grants</div>
                <div class="text-lg font-bold text-gray-900">33,237</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Total Funding</div>
                <div class="text-lg font-bold text-gray-900">$14,028,879,697</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Trials</div>
                <div class="text-lg font-bold text-gray-900">5,702</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Publications</div>
                <div class="text-lg font-bold text-gray-900">122,141</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drugs and Clinical Trials -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Drugs and Clinical Trials</h2>
            <a href="#" class="text-[#519294] text-sm hover:underline">VIEW ALL ></a>
          </div>
          
          <!-- Interactive Stacked Bar Chart -->
          <div class="relative h-32 mb-6">
            <canvas ref="clinicalTrialsChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">
        <!-- Related Datasets Table -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">1729 other related Datasets</h3>
            <a href="#" class="text-[#519294] text-sm hover:underline">VIEW ALL ></a>
          </div>
          
          <DatasetsTable :datasets="datasetsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MetricCard from './components/MetricCard.vue'
import DatasetsTable from './components/DatasetsTable.vue'

// Template refs
const researchDynamicsChart = ref(null)
const clinicalTrialsChart = ref(null)

// Data
const datasetsData = ref([
  {
    name: 'GSE85534',
    manualQa: true,
    samples: 906,
    case: 0,
    control: 328,
    published: '2017-02-13'
  },
  {
    name: 'GSE66499',
    manualQa: true,
    samples: 680,
    case: 490,
    control: 190,
    published: '2015-05-17'
  },
  {
    name: 'GDC-TCGA-LUAD',
    manualQa: false,
    samples: 1129,
    case: 1019,
    control: 110,
    published: null
  },
  {
    name: 'GDC-TCGA-LUSC',
    manualQa: false,
    samples: 574,
    case: 515,
    control: 59,
    published: null
  },
  {
    name: 'GDC-TCGA-LUSC',
    manualQa: false,
    samples: 550,
    case: 501,
    control: 49,
    published: null
  },
  {
    name: 'GSE203024',
    manualQa: false,
    samples: 2845,
    case: 1045,
    control: 0,
    published: '2024-08-31'
  },
  {
    name: 'CCLE-GeneExpression',
    manualQa: false,
    samples: 1406,
    case: 0,
    control: 0,
    published: null
  },
  {
    name: 'GSE111894',
    manualQa: true,
    samples: 1008,
    case: 1008,
    control: 0,
    published: '2019-06-13'
  },
  {
    name: 'GSE68950',
    manualQa: true,
    samples: 798,
    case: 758,
    control: 0,
    published: '2015-05-16'
  }
])

// Chart initialization functions
const initResearchDynamicsChart = async () => {
  await nextTick()
  if (!researchDynamicsChart.value) return
  
  // Import Chart.js dynamically
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  
  const ctx = researchDynamicsChart.value.getContext('2d')
  
  // 中国风配色方案
  const chineseColors = {
    grants: '#C8102E',      // 中国红
    funding: '#FFD700',     // 金色
    trials: '#1F4E79',      // 深蓝
    publications: '#228B22'  // 森林绿
  }
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Grants',
        data: [28500, 29800, 31200, 32100, 32800, 33237],
        borderColor: chineseColors.grants,
        backgroundColor: chineseColors.grants + '20',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: chineseColors.grants,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }, {
        label: 'Total Funding (B$)',
        data: [11.2, 12.1, 12.8, 13.2, 13.6, 14.0],
        borderColor: chineseColors.funding,
        backgroundColor: chineseColors.funding + '20',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: chineseColors.funding,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }, {
        label: 'Trials',
        data: [4800, 5100, 5300, 5450, 5580, 5702],
        borderColor: chineseColors.trials,
        backgroundColor: chineseColors.trials + '20',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: chineseColors.trials,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }, {
        label: 'Publications',
        data: [98000, 105000, 112000, 116500, 119800, 122141],
        borderColor: chineseColors.publications,
        backgroundColor: chineseColors.publications + '20',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: chineseColors.publications,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 13
          },
          bodyFont: {
            size: 12
          },
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.dataset.label === 'Total Funding (B$)') {
                label += '$' + context.parsed.y + 'B'
              } else {
                label += context.parsed.y.toLocaleString()
              }
              return label
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            borderDash: [2, 2]
          },
          ticks: {
            font: {
              size: 11
            }
          }
        },
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            borderDash: [2, 2]
          },
          ticks: {
            font: {
              size: 11
            },
            callback: function(value) {
              if (value >= 1000) {
                return (value / 1000).toFixed(0) + 'K'
              }
              return value
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      elements: {
        line: {
          borderJoinStyle: 'round'
        }
      }
    }
  })
}

const initClinicalTrialsChart = async () => {
  await nextTick()
  if (!clinicalTrialsChart.value) return
  
  // Import Chart.js dynamically
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  
  const ctx = clinicalTrialsChart.value.getContext('2d')
  
  // 中国风配色方案 - 临床试验阶段
  const phaseColors = {
    phase1: '#C8102E',    // 中国红
    phase2: '#FFD700',    // 金色  
    phase3: '#1F4E79',    // 深蓝
    phase4: '#FF6B35',    // 橙红
    noData: '#808080'     // 灰色
  }
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Clinical Trial Phases'],
      datasets: [{
        label: 'Phase I',
        data: [2526],
        backgroundColor: phaseColors.phase1,
        borderColor: phaseColors.phase1,
        borderWidth: 1,
        barThickness: 60
      }, {
        label: 'Phase II',
        data: [1741],
        backgroundColor: phaseColors.phase2,
        borderColor: phaseColors.phase2,
        borderWidth: 1,
        barThickness: 60
      }, {
        label: 'Phase III',
        data: [3413],
        backgroundColor: phaseColors.phase3,
        borderColor: phaseColors.phase3,
        borderWidth: 1,
        barThickness: 60
      }, {
        label: 'Phase IV',
        data: [590],
        backgroundColor: phaseColors.phase4,
        borderColor: phaseColors.phase4,
        borderWidth: 1,
        barThickness: 60
      }, {
        label: 'No Data',
        data: [0],
        backgroundColor: phaseColors.noData,
        borderColor: phaseColors.noData,
        borderWidth: 1,
        barThickness: 60
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'rect',
            padding: 15,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 12
          },
          bodyFont: {
            size: 11
          },
          cornerRadius: 6,
          displayColors: true,
          callbacks: {
            title: function(context) {
              return 'Clinical Trials Distribution'
            },
            label: function(context) {
              const label = context.dataset.label || ''
              const value = context.parsed.x
              const total = context.chart.data.datasets.reduce((sum, dataset) => {
                return sum + (dataset.data[0] || 0)
              }, 0)
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
              return `${label}: ${value.toLocaleString()} (${percentage}%)`
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 10
            },
            callback: function(value) {
              if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K'
              }
              return value
            }
          }
        },
        y: {
          stacked: true,
          display: false,
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      },
      layout: {
        padding: {
          top: 5,
          bottom: 5
        }
      }
    }
  })
}

// Lifecycle
onMounted(() => {
  initResearchDynamicsChart()
  initClinicalTrialsChart()
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
</style> 