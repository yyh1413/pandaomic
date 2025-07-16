<template>
  <div class="content-section fade-in">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Grant Opportunities</h1>
        <p class="text-gray-600">Lung cancer research funding opportunities from major institutions</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-green-600 mb-1">$234.8M</div>
          <div class="text-sm text-gray-600">Total Available</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-blue-600 mb-1">67</div>
          <div class="text-sm text-gray-600">Active Grants</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-orange-600 mb-1">23</div>
          <div class="text-sm text-gray-600">Upcoming Deadlines</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">189</div>
          <div class="text-sm text-gray-600">Total Opportunities</div>
        </div>
      </div>

      <!-- Grant Cards -->
      <div class="space-y-6">
        <GrantCard 
          v-for="grant in grants" 
          :key="grant.id"
          :grant="grant"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GrantCard from './components/GrantCard.vue'

const grants = ref([
  {
    id: 1,
    title: 'Lung Cancer Research Program',
    organization: 'National Cancer Institute (NCI)',
    mechanism: 'R01 Mechanism',
    description: 'Comprehensive research program for innovative approaches to lung cancer prevention and treatment.',
    amount: '$3.5M',
    duration: '5 years',
    deadline: 'Feb 28, 2024',
    daysLeft: 38,
    status: 'active'
  },
  {
    id: 2,
    title: 'EGFR Targeted Therapy Initiative',
    organization: 'American Cancer Society',
    mechanism: 'Research Scholar Grant',
    description: 'Focus on developing novel EGFR-targeted therapies for resistant lung cancer cases.',
    amount: '$1.2M',
    duration: '3 years',
    deadline: 'Mar 15, 2024',
    daysLeft: 55,
    status: 'active'
  },
  {
    id: 3,
    title: 'Immunotherapy Combination Studies',
    organization: 'Department of Defense',
    mechanism: 'Breakthrough Award',
    description: 'Investigating combination immunotherapy approaches for advanced lung cancer treatment.',
    amount: '$2.8M',
    duration: '4 years',
    deadline: 'Apr 10, 2024',
    daysLeft: 81,
    status: 'upcoming'
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
</style> 