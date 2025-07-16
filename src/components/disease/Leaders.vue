<template>
  <div class="content-section fade-in">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Key Opinion Leaders</h1>
        <p class="text-gray-600">Leading researchers and clinicians in lung cancer research</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-primary mb-1">234</div>
          <div class="text-sm text-gray-600">Total Experts</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-green-600 mb-1">156</div>
          <div class="text-sm text-gray-600">Active Researchers</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-blue-600 mb-1">67</div>
          <div class="text-sm text-gray-600">Clinical Leaders</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">45</div>
          <div class="text-sm text-gray-600">Industry Experts</div>
        </div>
      </div>

      <!-- Leader Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LeaderCard 
          v-for="leader in leaders" 
          :key="leader.id"
          :leader="leader"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeaderCard from './components/LeaderCard.vue'

const leaders = ref([
  {
    id: 1,
    name: 'Dr. Alice Sequist',
    institution: 'Massachusetts General Hospital',
    initials: 'AS',
    color: 'from-blue-500 to-blue-600',
    expertise: ['Lung Cancer', 'EGFR'],
    papers: 456,
    citations: 23820
  },
  {
    id: 2,
    name: 'Dr. John Minna',
    institution: 'UT Southwestern Medical Center',
    initials: 'JM',
    color: 'from-green-500 to-green-600',
    expertise: ['NSCLC', 'Biomarkers'],
    papers: 389,
    citations: 18945
  },
  {
    id: 3,
    name: 'Dr. Roy Herbst',
    institution: 'Yale Cancer Center',
    initials: 'RH',
    color: 'from-purple-500 to-purple-600',
    expertise: ['Immunotherapy', 'PD-1/PD-L1'],
    papers: 523,
    citations: 31256
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