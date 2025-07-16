<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Key Opinion Leaders</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="leader in leaders" :key="leader.id" class="bg-white rounded-lg shadow-md p-6 text-center">
        <img :src="leader.image" :alt="leader.name" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
        <h3 class="text-lg font-semibold text-dark">{{ leader.name }}</h3>
        <p class="text-gray-600 mb-2">{{ leader.specialty }}</p>
        <p class="text-sm text-gray-500 mb-4">{{ leader.institution }}</p>
        <div class="flex justify-center space-x-2">
          <el-button size="small" type="primary">
            <i class="fas fa-envelope mr-1"></i>
            Contact
          </el-button>
          <el-button size="small" type="default">
            <i class="fas fa-user mr-1"></i>
            Profile
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leaders = ref([
  {
    id: 1,
    name: 'Dr. John Smith',
    specialty: 'Oncology Research',
    institution: 'Harvard Medical School',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialty: 'Genomics & Bioinformatics',
    institution: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c6?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    specialty: 'Computational Biology',
    institution: 'MIT',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    specialty: 'Precision Medicine',
    institution: 'Johns Hopkins',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Dr. Robert Wilson',
    specialty: 'Drug Discovery',
    institution: 'UCSF',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Dr. Lisa Martinez',
    specialty: 'Systems Biology',
    institution: 'Caltech',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c6?w=100&h=100&fit=crop&crop=face'
  }
])
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 