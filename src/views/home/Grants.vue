<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Research Grants</h1>
    
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">Available Grants</h2>
      </div>
      <div class="p-6">
        <div class="space-y-6">
          <div v-for="grant in grants" :key="grant.id" class="border-l-4 border-primary pl-6 py-4">
            <h3 class="font-semibold text-lg text-dark">{{ grant.title }}</h3>
            <p class="text-gray-600 mb-2">{{ grant.description }}</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="font-medium">Deadline:</span>
                <span class="text-gray-600 ml-2">{{ grant.deadline }}</span>
              </div>
              <div>
                <span class="font-medium">Amount:</span>
                <span class="text-green-600 ml-2">{{ grant.amount }}</span>
              </div>
              <div>
                <span class="font-medium">Agency:</span>
                <span class="text-gray-600 ml-2">{{ grant.agency }}</span>
              </div>
            </div>
            <div class="mt-4">
              <el-button type="primary" size="small">Learn More</el-button>
              <el-button type="default" size="small">Apply</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const grants = ref([
  {
    id: 1,
    title: 'NIH R01: Cancer Target Discovery',
    description: 'Support for innovative approaches to identify and validate novel therapeutic targets in cancer research.',
    deadline: 'March 15, 2024',
    amount: '$2.5M',
    agency: 'National Institutes of Health'
  },
  {
    id: 2,
    title: 'NSF: Computational Biology Initiative',
    description: 'Funding for computational approaches to biological problems including multi-omics data integration.',
    deadline: 'April 20, 2024',
    amount: '$1.8M',
    agency: 'National Science Foundation'
  },
  {
    id: 3,
    title: 'DOD PRCRP: Precision Medicine',
    description: 'Department of Defense funding for precision medicine approaches in disease treatment.',
    deadline: 'May 10, 2024',
    amount: '$3.2M',
    agency: 'Department of Defense'
  },
  {
    id: 4,
    title: 'Gates Foundation: Global Health',
    description: 'Support for innovative technologies and approaches to address global health challenges.',
    deadline: 'June 1, 2024',
    amount: '$5.0M',
    agency: 'Bill & Melinda Gates Foundation'
  }
])
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.border-primary {
  border-color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 