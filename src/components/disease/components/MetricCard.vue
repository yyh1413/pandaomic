<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-center mb-4">
      <div :class="['w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center mr-4', iconColor]">
        <i :class="[icon, 'text-white text-xl']"></i>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <div :class="['text-xl font-bold', valueColor]">{{ value }}</div>
      </div>
    </div>
    <div v-if="progress !== undefined" class="w-full bg-gray-200 rounded-full h-3 mb-2">
      <div 
        :class="['h-3 rounded-full bg-gradient-to-r', progressColor]" 
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <p class="text-sm text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  },
  valueColor: {
    type: String,
    default: 'text-blue-600'
  },
  progress: {
    type: Number,
    default: undefined
  },
  progressColor: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  },
  description: {
    type: String,
    required: true
  }
})
</script> 