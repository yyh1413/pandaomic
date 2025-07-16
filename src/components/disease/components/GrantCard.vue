<template>
  <div class="card bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center space-x-3 mb-2">
          <h3 class="text-lg font-semibold text-gray-900">{{ grant.title }}</h3>
          <span :class="['status-badge', statusClass]">{{ statusText }}</span>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ grant.organization }} • {{ grant.mechanism }}</p>
        <p class="text-gray-700">{{ grant.description }}</p>
      </div>
      <div class="text-right ml-6">
        <div class="text-2xl font-bold text-green-600">{{ grant.amount }}</div>
        <div class="text-sm text-gray-500">{{ grant.duration }}</div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-6 text-sm text-gray-500">
        <span>
          <i class="fas fa-calendar-alt mr-1"></i>Deadline: {{ grant.deadline }}
        </span>
        <span v-if="grant.status !== 'closed'">
          <i class="fas fa-clock mr-1"></i>{{ grant.daysLeft }} days left
        </span>
        <span v-else>
          <i class="fas fa-times-circle mr-1"></i>Closed
        </span>
      </div>
      <div class="flex space-x-2">
        <button 
          :disabled="grant.status === 'closed'"
          :class="[
            'px-4 py-2 rounded-md text-sm transition-colors',
            grant.status === 'closed' 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          ]"
        >
          <i class="fas fa-eye mr-1"></i>View Details
        </button>
        <button 
          :disabled="grant.status === 'closed'"
          :class="[
            'px-4 py-2 rounded-md text-sm transition-colors',
            grant.status === 'closed' 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          ]"
        >
          <i :class="grant.status === 'closed' ? 'fas fa-ban mr-1' : 'fas fa-external-link-alt mr-1'"></i>
          {{ grant.status === 'closed' ? 'Closed' : 'Apply' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  grant: {
    type: Object,
    required: true
  }
})

const statusClass = computed(() => {
  switch (props.grant.status) {
    case 'active':
      return 'status-active'
    case 'upcoming':
      return 'status-upcoming'
    case 'closed':
      return 'status-closed'
    default:
      return 'status-active'
  }
})

const statusText = computed(() => {
  switch (props.grant.status) {
    case 'active':
      return 'Active'
    case 'upcoming':
      return 'Upcoming'
    case 'closed':
      return 'Closed'
    default:
      return 'Active'
  }
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.status-active { 
  background: #dcfce7; 
  color: #16a34a; 
}

.status-closed { 
  background: #fee2e2; 
  color: #dc2626; 
}

.status-upcoming { 
  background: #dbeafe; 
  color: #2563eb; 
}

.bg-primary {
  background-color: #519294;
}

.text-primary {
  color: #519294;
}

.hover\:bg-primary\/90:hover {
  background-color: rgba(81, 146, 148, 0.9);
}

.bg-primary\/10 {
  background-color: rgba(81, 146, 148, 0.1);
}

.hover\:bg-primary\/20:hover {
  background-color: rgba(81, 146, 148, 0.2);
}
</style> 