<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Datasets Repository</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="dataset in datasets" :key="dataset.id" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ dataset.name }}</h3>
        <p class="text-gray-600 mb-4">{{ dataset.description }}</p>
        <div class="flex justify-between items-center">
          <span :class="getTagClass(dataset.type)" class="px-3 py-1 rounded-full text-sm">
            {{ dataset.type }}
          </span>
          <el-button type="primary" size="small">View Details</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const datasets = ref([
  {
    id: 1,
    name: 'TCGA-LUAD',
    description: 'Lung adenocarcinoma dataset with comprehensive genomic profiles',
    type: 'RNA-seq'
  },
  {
    id: 2,
    name: 'Single Cell Lung Atlas',
    description: 'Comprehensive single cell RNA sequencing data from lung tissues',
    type: 'scRNA-seq'
  },
  {
    id: 3,
    name: 'CPTAC Proteomics',
    description: 'Clinical proteomic tumor analysis consortium data',
    type: 'Proteomics'
  },
  {
    id: 4,
    name: 'TCGA-BRCA',
    description: 'Breast invasive carcinoma comprehensive analysis',
    type: 'RNA-seq'
  },
  {
    id: 5,
    name: 'GTEx Portal',
    description: 'Gene expression data from healthy human tissues',
    type: 'RNA-seq'
  },
  {
    id: 6,
    name: 'Human Cell Atlas',
    description: 'Single cell atlas of human cell types',
    type: 'scRNA-seq'
  }
])

const getTagClass = (type) => {
  const classes = {
    'RNA-seq': 'bg-primary text-white',
    'scRNA-seq': 'bg-secondary text-white',
    'Proteomics': 'bg-neutral text-white'
  }
  return classes[type] || 'bg-gray-200 text-gray-800'
}
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.bg-primary {
  background-color: #83a594;
}

.bg-secondary {
  background-color: #519294;
}

.bg-neutral {
  background-color: #7f9eb0;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 