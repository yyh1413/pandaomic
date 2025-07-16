<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Target Identification</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Select Disease</label>
        <el-select v-model="selectedDisease" placeholder="Choose a disease" class="w-full" size="large">
          <el-option
            v-for="disease in diseases"
            :key="disease.value"
            :label="disease.label"
            :value="disease.value"
          />
        </el-select>
      </div>
      
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Analysis Type</label>
        <el-radio-group v-model="analysisType" class="w-full">
          <el-radio label="comprehensive">Comprehensive Analysis</el-radio>
          <el-radio label="pathway">Pathway-focused</el-radio>
          <el-radio label="druggable">Druggable Targets</el-radio>
        </el-radio-group>
      </div>
      
      <el-button 
        type="primary" 
        size="large"
        :loading="isAnalyzing"
        @click="identifyTargets"
      >
        <i class="fas fa-search mr-2"></i>
        Identify Targets
      </el-button>
      
      <!-- Results Section -->
      <div v-if="results.length > 0" class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Identified Targets</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="target in results" 
            :key="target.gene"
            class="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 class="font-bold text-lg text-primary">{{ target.gene }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ target.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs bg-gray-100 px-2 py-1 rounded">
                Score: {{ target.score }}
              </span>
              <el-button type="text" size="small">
                View Details
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const selectedDisease = ref('')
const analysisType = ref('comprehensive')
const isAnalyzing = ref(false)
const results = ref([])

const diseases = [
  { label: 'Lung Cancer', value: 'lung-cancer' },
  { label: 'Breast Cancer', value: 'breast-cancer' },
  { label: 'Colorectal Cancer', value: 'colorectal-cancer' },
  { label: 'Prostate Cancer', value: 'prostate-cancer' },
  { label: 'Alzheimer\'s Disease', value: 'alzheimers' }
]

const mockResults = [
  { gene: 'EGFR', description: 'Epidermal growth factor receptor', score: '95%' },
  { gene: 'KRAS', description: 'Kirsten rat sarcoma viral oncogene', score: '88%' },
  { gene: 'TP53', description: 'Tumor protein p53', score: '82%' },
  { gene: 'PIK3CA', description: 'Phosphatidylinositol-4,5-bisphosphate', score: '76%' },
  { gene: 'ALK', description: 'Anaplastic lymphoma kinase', score: '71%' },
  { gene: 'ROS1', description: 'ROS proto-oncogene 1', score: '68%' }
]

const identifyTargets = async () => {
  if (!selectedDisease.value) {
    ElMessage.warning('Please select a disease first')
    return
  }
  
  isAnalyzing.value = true
  
  try {
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    results.value = mockResults
    ElMessage.success('Target identification completed!')
    
  } catch (error) {
    ElMessage.error('Analysis failed. Please try again.')
  } finally {
    isAnalyzing.value = false
  }
}
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-primary {
  color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}

:deep(.el-button--primary:hover) {
  background-color: #519294;
  border-color: #519294;
}
</style> 