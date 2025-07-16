<template>
  <div 
    :class="[
      'fixed left-0 top-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 h-screen pt-16',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="p-4">
      <ul class="space-y-2">
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'summary' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('summary')"
          >
            <i class="fas fa-chart-line mr-3"></i>Disease Summary
          </a>
        </li>
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'targetid' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('targetid')"
          >
            <i class="fas fa-bullseye mr-3"></i>Target ID
          </a>
        </li>
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'datasets' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('datasets')"
          >
            <i class="fas fa-database mr-3"></i>Datasets
          </a>
        </li>
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'knowledge' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('knowledge')"
          >
            <i class="fas fa-brain mr-3"></i>KnowledgeGraph
          </a>
        </li>
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'leaders' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('leaders')"
          >
            <i class="fas fa-user-graduate mr-3"></i>Key Opinion Leaders
          </a>
        </li>
        <li>
          <a 
            href="#" 
            :class="[
              'sidebar-item flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100',
              activeSection === 'grants' ? 'active bg-gray-100' : ''
            ]"
            @click.prevent="handleSectionChange('grants')"
          >
            <i class="fas fa-money-bill-wave mr-3"></i>Grants
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  activeSection: {
    type: String,
    default: 'summary'
  }
})

// Emits
const emit = defineEmits(['section-change', 'close'])

// Methods
const handleSectionChange = (section) => {
  emit('section-change', section)
}
</script>

<style scoped>
.sidebar-item.active {
  background-color: #f3f4f6;
}
</style> 