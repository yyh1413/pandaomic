<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="text-gray-500 border-b border-gray-200">
          <th class="text-left py-2 font-medium">NAME</th>
          <th class="text-center py-2 font-medium">MANUAL_QA</th>
          <th class="text-center py-2 font-medium">SAMPLES</th>
          <th class="text-center py-2 font-medium">CASE</th>
          <th class="text-center py-2 font-medium">CONTROL</th>
          <th class="text-center py-2 font-medium">PUBLISHED</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr 
          v-for="(dataset, index) in datasets" 
          :key="index"
          class="border-b border-gray-100"
        >
          <td class="py-3 text-blue-600 font-medium">{{ dataset.name }}</td>
          <td class="py-3 text-center">
            <i v-if="dataset.manualQa" class="fas fa-check text-green-500"></i>
            <span v-else>-</span>
          </td>
          <td class="py-3 text-center">{{ dataset.samples.toLocaleString() }}</td>
          <td class="py-3 text-center" :class="getCaseClass(dataset.case)">{{ formatNumber(dataset.case) }}</td>
          <td class="py-3 text-center" :class="getControlClass(dataset.control)">{{ formatNumber(dataset.control) }}</td>
          <td class="py-3 text-center">{{ dataset.published || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  datasets: {
    type: Array,
    required: true
  }
})

// Methods
const formatNumber = (num) => {
  if (num === 0) return '0'
  return num.toLocaleString()
}

const getCaseClass = (caseValue) => {
  if (caseValue === 0) return 'text-blue-600'
  return ''
}

const getControlClass = (controlValue) => {
  if (controlValue === 0) return 'text-blue-600'
  if (controlValue > 0 && controlValue < 200) return 'text-red-600'
  return ''
}
</script> 