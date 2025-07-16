<template>
  <div class="content-section fade-in">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Knowledge Graph & AI Chat</h1>
        <p class="text-gray-600">Explore lung cancer gene relationships and interact with our AI assistant</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Knowledge Graph Panel -->
        <div class="bg-white rounded-lg shadow-sm p-6" style="min-height: 700px;">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Lung Cancer Knowledge Graph</h2>
          
          <div class="relative" style="width: 100%; height: 600px;">
            <div ref="knowledgeGraphContainer" style="width: 100%; height: 100%; min-height: 600px; background: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px;"></div>
          </div>
        </div>
        
        <!-- AI Chat Panel -->
        <div class="bg-white rounded-lg shadow-sm p-6" style="min-height: 700px;">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">AI Assistant</h2>
          
          <div class="bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4" style="height: 520px;">
            <div v-for="message in chatMessages" :key="message.id" class="mb-4">
              <div :class="['flex items-start space-x-3', message.isUser ? 'justify-end' : '']">
                <div v-if="!message.isUser" class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div :class="['flex-1', message.isUser ? 'text-right' : '']">
                  <div :class="[
                    'rounded-lg p-3 shadow-sm',
                    message.isUser ? 'bg-primary text-white inline-block' : 'bg-white'
                  ]">
                    <p class="text-sm" :class="message.isUser ? 'text-white' : 'text-gray-800'" v-html="message.content"></p>
                  </div>
                </div>
                <div v-if="message.isUser" class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-gray-600 text-sm"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <input 
              v-model="chatInput" 
              @keypress.enter="sendMessage"
              type="text" 
              placeholder="Ask about lung cancer, genes, or treatments..." 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
            <button @click="sendMessage" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Template refs
const knowledgeGraphContainer = ref(null)

// Reactive state
const chatInput = ref('')
const chatMessages = ref([
  {
    id: 1,
    isUser: false,
    content: "Hello! I'm your AI assistant for lung cancer research. What would you like to know?"
  },
  {
    id: 2,
    isUser: true,
    content: "What are the key genes associated with lung cancer?"
  },
  {
    id: 3,
    isUser: false,
    content: `The key genes associated with lung cancer include:<br/>
              <ul class="mt-2 list-disc list-inside">
                <li><strong>EGFR</strong> - Epidermal Growth Factor Receptor</li>
                <li><strong>KRAS</strong> - Kirsten RAS oncogene</li>
                <li><strong>TP53</strong> - Tumor Protein p53</li>
                <li><strong>ALK</strong> - Anaplastic Lymphoma Kinase</li>
                <li><strong>ROS1</strong> - ROS Proto-Oncogene 1</li>
              </ul><br/>
              Would you like to know more about any specific gene or treatment options?`
  }
])

// Methods
const sendMessage = () => {
  if (!chatInput.value.trim()) return
  
  // Add user message
  const userMessage = {
    id: Date.now(),
    isUser: true,
    content: chatInput.value
  }
  chatMessages.value.push(userMessage)
  
  // Store user input
  const userInput = chatInput.value.toLowerCase()
  chatInput.value = ''
  
  // Simulate AI response
  setTimeout(() => {
    const aiResponse = {
      id: Date.now() + 1,
      isUser: false,
      content: getAIResponse(userInput)
    }
    chatMessages.value.push(aiResponse)
  }, 1000)
}

const getAIResponse = (message) => {
  if (message.includes('egfr')) {
    return 'EGFR (Epidermal Growth Factor Receptor) is a key oncogene in lung cancer. Mutations in EGFR are found in about 10-15% of lung adenocarcinomas and are targetable with drugs like gefitinib, erlotinib, and osimertinib.'
  } else if (message.includes('kras')) {
    return 'KRAS is the most commonly mutated oncogene in lung cancer, found in about 25-30% of lung adenocarcinomas. KRAS G12C mutations can now be targeted with drugs like sotorasib and adagrasib.'
  } else if (message.includes('treatment')) {
    return 'Lung cancer treatment depends on the stage and molecular profile. Options include surgery, chemotherapy, radiation therapy, targeted therapy (for EGFR, ALK, ROS1 mutations), and immunotherapy (PD-1/PD-L1 inhibitors).'
  } else {
    return 'I can help you with information about lung cancer genes, biomarkers, treatments, and research. Try asking about specific genes like EGFR, KRAS, or TP53, or about treatment options.'
  }
}

const initKnowledgeGraph = async () => {
  await nextTick()
  if (!knowledgeGraphContainer.value) return
  
  try {
    // Import ECharts dynamically
    const echarts = await import('echarts')
    const myChart = echarts.init(knowledgeGraphContainer.value)
    
    // Simple knowledge graph configuration
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (params.dataType === 'node') {
            return `<strong>${params.data.name}</strong><br/>Type: ${params.data.category}`
          }
          return ''
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 20,
        data: ['Disease', 'Gene', 'Drug', 'Pathway']
      },
      series: [{
        name: 'Knowledge Graph',
        type: 'graph',
        layout: 'force',
        data: [
          { id: 1, name: 'Lung Cancer', category: 'Disease', symbolSize: 50 },
          { id: 2, name: 'EGFR', category: 'Gene', symbolSize: 40 },
          { id: 3, name: 'KRAS', category: 'Gene', symbolSize: 40 },
          { id: 4, name: 'TP53', category: 'Gene', symbolSize: 35 },
          { id: 5, name: 'Gefitinib', category: 'Drug', symbolSize: 30 },
          { id: 6, name: 'PI3K/AKT', category: 'Pathway', symbolSize: 35 }
        ],
        links: [
          { source: 2, target: 1 },
          { source: 3, target: 1 },
          { source: 4, target: 1 },
          { source: 5, target: 2 },
          { source: 2, target: 6 }
        ],
        categories: [
          { name: 'Disease', itemStyle: { color: '#8B4513' } },
          { name: 'Gene', itemStyle: { color: '#1F4E79' } },
          { name: 'Drug', itemStyle: { color: '#C8102E' } },
          { name: 'Pathway', itemStyle: { color: '#FFD700' } }
        ],
        roam: true,
        label: {
          show: true,
          position: 'inside',
          fontSize: 10,
          fontWeight: 'bold',
          color: '#fff'
        },
        force: {
          repulsion: 1000,
          edgeLength: [50, 200]
        }
      }]
    }
    
    myChart.setOption(option)
    
    // Responsive
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  } catch (error) {
    console.error('Error initializing knowledge graph:', error)
  }
}

onMounted(() => {
  initKnowledgeGraph()
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

.bg-primary {
  background-color: #519294;
}

.hover\:bg-primary\/90:hover {
  background-color: rgba(81, 146, 148, 0.9);
}

.focus\:ring-primary\/20:focus {
  --tw-ring-color: rgba(81, 146, 148, 0.2);
}

.focus\:border-primary:focus {
  border-color: #519294;
}
</style> 