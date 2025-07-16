<template>
  <div class="card bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ dataset.name }}</h3>
        <p class="text-sm text-gray-600">{{ dataset.description }}</p>
      </div>
      <span :class="['px-3 py-1 rounded-full text-xs font-medium', statusClass]">
        {{ dataset.status }}
      </span>
    </div>
    <p class="text-sm text-gray-700 mb-4">{{ dataset.longDescription }}</p>
    <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
      <div>
        <span class="text-gray-500">Samples:</span> 
        <span class="font-medium">{{ dataset.samples.toLocaleString() }}</span>
      </div>
      <div>
        <span class="text-gray-500">Data Types:</span> 
        <span class="font-medium">{{ dataset.dataTypes }}</span>
      </div>
    </div>
    <div class="flex flex-wrap gap-1 mb-4">
      <span 
        v-for="tag in dataset.tags" 
        :key="tag"
        :class="['px-2 py-1 rounded text-xs', getTagClass(tag)]"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  dataset: {
    type: Object,
    required: true
  }
})

const statusClass = computed(() => {
  switch (props.dataset.status) {
    case 'Public':
      return 'bg-green-100 text-green-800'
    case 'Restricted':
      return 'bg-yellow-100 text-yellow-800'
    case 'Private':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const getTagClass = (tag) => {
  const tagColors = {
    'RNA-seq': 'bg-blue-100 text-blue-800',
    'WES': 'bg-blue-100 text-blue-800',
    'Methylation': 'bg-blue-100 text-blue-800',
    'CNV': 'bg-blue-100 text-blue-800',
    'Microarray': 'bg-purple-100 text-purple-800',
    'Clinical': 'bg-purple-100 text-purple-800',
    'Drug Response': 'bg-orange-100 text-orange-800',
    'Imaging': 'bg-green-100 text-green-800',
    'Proteomics': 'bg-indigo-100 text-indigo-800',
    'Phosphoproteomics': 'bg-indigo-100 text-indigo-800',
    'scRNA-seq': 'bg-red-100 text-red-800'
  }
  return tagColors[tag] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}
</style> 