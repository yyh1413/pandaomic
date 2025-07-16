<template>
  <div class="content-section fade-in">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Lung Cancer Datasets</h1>
        <p class="text-gray-600">Comprehensive multi-omics datasets for lung cancer research</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-primary mb-1">147</div>
          <div class="text-sm text-gray-600">Total Datasets</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-green-600 mb-1">89,234</div>
          <div class="text-sm text-gray-600">Total Samples</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-blue-600 mb-1">12</div>
          <div class="text-sm text-gray-600">Data Types</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">45</div>
          <div class="text-sm text-gray-600">Institutions</div>
        </div>
      </div>

      <!-- Dataset Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DatasetCard 
          v-for="dataset in datasets" 
          :key="dataset.id"
          :dataset="dataset"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DatasetCard from './components/DatasetCard.vue'

const datasets = ref([
  {
    id: 1,
    name: 'TCGA-LUAD',
    description: 'The Cancer Genome Atlas - Lung Adenocarcinoma',
    longDescription: 'Comprehensive molecular characterization of lung adenocarcinoma with multi-platform analysis.',
    status: 'Public',
    samples: 515,
    dataTypes: 7,
    tags: ['RNA-seq', 'WES', 'Methylation']
  },
  {
    id: 2,
    name: 'TCGA-LUSC',
    description: 'The Cancer Genome Atlas - Lung Squamous Cell Carcinoma',
    longDescription: 'Multi-omic profiling of lung squamous cell carcinoma including genomic and epigenomic data.',
    status: 'Public',
    samples: 501,
    dataTypes: 6,
    tags: ['RNA-seq', 'WES', 'CNV']
  },
  {
    id: 3,
    name: 'GSE68950',
    description: 'Gene Expression Omnibus - Lung Cancer Cohort',
    longDescription: 'Large-scale gene expression profiling of lung adenocarcinoma samples from multiple centers.',
    status: 'Public',
    samples: 443,
    dataTypes: 2,
    tags: ['Microarray', 'Clinical']
  }
])
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
</style> 