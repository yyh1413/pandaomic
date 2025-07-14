<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-accent/20">
    <div class="container mx-auto px-4 py-20 pb-6">
      <div class="text-center mb-32">
        <h1 class="text-3xl font-bold text-dark mb-12">Multi-Omics Powered Target Discovery</h1>
        
        <div class="max-w-2xl mx-auto mb-8 relative">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Search Disease, Gene, Dataset, Gene-Disease Association..." 
              class="w-full px-6 py-4 pr-12 rounded-full border-2 border-secondary/60 focus:border-secondary focus:bg-[#e8f0fe] outline-none text-lg transition-all duration-200"
            >
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i class="fas fa-search text-lg"></i>
            </div>
          </div>

          <!-- Search Results -->
          <div v-if="showSearchResults" class="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl mt-2 z-50 search-results-container">
            <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 mx-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <!-- Diseases -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-primary text-left pl-3">Diseases</h3>
                  <ul class="space-y-1">
                    <li 
                      v-for="disease in diseases" 
                      :key="disease.name"
                      @click="navigateToPage('disease', disease.name)"
                      class="text-left p-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors group"
                    >
                      <div class="font-medium text-gray-800 group-hover:text-primary">{{ disease.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ disease.description }}</div>
                    </li>
                  </ul>
                </div>

                <!-- Genes -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-secondary text-left pl-3">Genes</h3>
                  <ul class="space-y-1">
                    <li 
                      v-for="gene in genes" 
                      :key="gene.name"
                      @click="navigateToPage('gene', gene.name)"
                      class="text-left p-3 rounded-lg hover:bg-secondary/5 cursor-pointer transition-colors group"
                    >
                      <div class="font-medium text-gray-800 group-hover:text-secondary">{{ gene.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ gene.description }}</div>
                    </li>
                  </ul>
                </div>

                <!-- Datasets -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-dark text-left pl-3">Datasets</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-semibold text-sm text-gray-600 mb-2 text-left pl-2">Regular Data</h4>
                      <ul class="space-y-1">
                        <li 
                          v-for="dataset in regularDatasets" 
                          :key="dataset.name"
                          @click="navigateToPage('dataset', dataset.name)"
                          class="text-left p-2 rounded-lg hover:bg-dark/5 cursor-pointer transition-colors group"
                        >
                          <div class="font-medium text-gray-800 text-sm group-hover:text-dark">{{ dataset.name }}</div>
                          <div class="text-xs text-gray-500 mt-1">{{ dataset.description }}</div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm text-gray-600 mb-2 text-left pl-2">Single Cell Data</h4>
                      <ul class="space-y-1">
                        <li 
                          v-for="dataset in singleCellDatasets" 
                          :key="dataset.name"
                          @click="navigateToPage('dataset', dataset.name)"
                          class="text-left p-2 rounded-lg hover:bg-dark/5 cursor-pointer transition-colors group"
                        >
                          <div class="font-medium text-gray-800 text-sm group-hover:text-dark">{{ dataset.name }}</div>
                          <div class="text-xs text-gray-500 mt-1">{{ dataset.description }}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-primary mb-4">
            <i class="fas fa-layer-group text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Multi-Omics Integration</h3>
          <p class="text-gray-600">Integrate transcriptomics, proteomics, metabolomics data for comprehensive analysis</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-secondary mb-4">
            <i class="fas fa-microscope text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Omics Analysis</h3>
          <p class="text-gray-600">Multi-dimensional analysis revealing biological mechanisms and pathways</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-neutral mb-4">
            <i class="fas fa-bullseye text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Target Discovery</h3>
          <p class="text-gray-600">AI-powered algorithms to screen and identify potential drug targets</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-light mb-4">
            <i class="fas fa-chart-bar text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Visual Reports</h3>
          <p class="text-gray-600">Generate intuitive analysis reports with multi-perspective results</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showSearchResults = ref(false)

// 搜索数据
const diseases = ref([
  { name: 'Lung Cancer', description: 'Malignant lung neoplasm' },
  { name: 'Non-small Cell Lung Cancer', description: 'NSCLC, most common type (85%)' },
  { name: 'Small Cell Lung Cancer', description: 'SCLC, aggressive subtype (15%)' },
  { name: 'Lung Adenocarcinoma', description: 'Most common NSCLC subtype' },
  { name: 'Lung Squamous Cell Carcinoma', description: 'Second most common NSCLC' },
  { name: 'Large Cell Lung Carcinoma', description: 'Poorly differentiated NSCLC' }
])

const genes = ref([
  { name: 'EGFR', description: 'Epidermal growth factor receptor (15% mutations)' },
  { name: 'KRAS', description: 'Kirsten rat sarcoma viral oncogene (25% mutations)' },
  { name: 'TP53', description: 'Tumor protein p53 (50% mutations)' },
  { name: 'ALK', description: 'Anaplastic lymphoma kinase (3-5% fusions)' },
  { name: 'ROS1', description: 'ROS proto-oncogene 1 (1-2% fusions)' },
  { name: 'BRAF', description: 'B-Raf proto-oncogene (2-3% mutations)' },
  { name: 'PIK3CA', description: 'Phosphatidylinositol-4,5-bisphosphate' },
  { name: 'MET', description: 'MET proto-oncogene (exon 14 skipping)' }
])

const regularDatasets = ref([
  { name: 'TCGA-LUAD', description: '515 samples, RNA-seq' },
  { name: 'TCGA-LUSC', description: '501 samples, RNA-seq' },
  { name: 'GSE203024', description: '2845 samples, microarray' },
  { name: 'GEO-GSE68465', description: '443 samples, RNA-seq' },
  { name: 'CPTAC-LUAD', description: '110 samples, proteomics' }
])

const singleCellDatasets = ref([
  { name: 'scRNA-seq LUAD Atlas', description: '58,662 cells, 10X' },
  { name: 'Lung Cancer Cell Atlas', description: '44,077 cells, smart-seq2' },
  { name: 'GSE131907 scRNA', description: '12,346 cells, 10X' },
  { name: 'GSE148071 scRNA', description: '26,830 cells, 10X' },
  { name: 'Human Lung Atlas', description: '75,000+ cells, multi-platform' }
])

const handleSearch = () => {
  showSearchResults.value = searchQuery.value.trim().length > 0
}

const navigateToPage = (type, name) => {
  // 关闭搜索结果
  showSearchResults.value = false
  searchQuery.value = ''
  
  // 跳转到对应页面
  console.log(`Navigating to ${type}: ${name}`)
  // 这里可以根据实际需求添加路由跳转
  // 例如：router.push(`/${type}/${encodeURIComponent(name)}`)
}

// 点击外部关闭搜索结果
const handleClickOutside = (e) => {
  const searchContainer = e.target.closest('.relative')
  if (!searchContainer) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 搜索结果面板响应式设计 */
.search-results-container {
  width: max(100vw - 2rem, 800px);
  max-width: 1200px;
}

@media (max-width: 768px) {
  .search-results-container {
    width: calc(100vw - 1rem);
    left: 0.5rem;
    transform: none;
  }
}

/* 动画效果 */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 搜索结果面板动画 */
.search-results-container {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { 
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style> 