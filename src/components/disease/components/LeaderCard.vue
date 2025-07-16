<template>
  <div class="card bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-start space-x-4">
      <div :class="['w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center text-white font-bold text-xl', leader.color]">
        {{ leader.initials }}
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900">{{ leader.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ leader.institution }}</p>
        <div class="flex flex-wrap gap-1 mb-3">
          <span 
            v-for="expertise in leader.expertise" 
            :key="expertise"
            class="expertise-tag"
          >
            {{ expertise }}
          </span>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>
            <i class="fas fa-file-alt mr-1"></i>{{ leader.papers.toLocaleString() }} papers
          </span>
          <span>
            <i class="fas fa-quote-left mr-1"></i>{{ leader.citations.toLocaleString() }} citations
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  leader: {
    type: Object,
    required: true
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

.expertise-tag {
  background: linear-gradient(45deg, #519294, #66a6a8);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}
</style> 