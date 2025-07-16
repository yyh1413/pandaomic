<template>
  <div class="bg-white rounded-lg shadow-sm p-4 filter-section">
    <div class="flex items-center justify-between mb-4 section-header" @click="toggleCollapse">
      <div class="flex items-center">
        <i :class="['fas mr-2 section-toggle', allChecked ? 'fa-check-square text-primary' : 'fa-square text-gray-400']"></i>
        <h3 class="font-semibold text-gray-900">{{ title }}</h3>
      </div>
      <i :class="['fas text-gray-400 chevron-icon', collapsed ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
    </div>
    
    <div v-if="!collapsed" class="filter-content">
      <div v-if="activatedCount !== undefined" class="text-xs text-gray-500 mb-3">
        {{ activatedCount }} scores activated
      </div>
      
      <div class="space-y-2 mb-4">
        <div 
          v-for="item in items" 
          :key="item.key"
          class="checkbox-item"
          @click="toggleItem(item)"
        >
          <label class="flex items-center text-sm text-gray-700 cursor-pointer">
            <i :class="['fas mr-2 item-checkbox', item.checked ? 'fa-check-square text-primary' : 'fa-square text-gray-400']"></i>
            {{ item.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  activatedCount: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const collapsed = ref(false)

const allChecked = computed(() => {
  return props.items.every(item => item.checked)
})

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const toggleItem = (item) => {
  item.checked = !item.checked
  emit('update:modelValue', props.items)
}
</script>

<style scoped>
.filter-section {
  transition: all 0.3s ease;
}

.section-header {
  cursor: pointer;
  user-select: none;
}

.section-header:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.checkbox-item {
  cursor: pointer;
  padding: 4px 0;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.checkbox-item:hover {
  background-color: rgba(81, 146, 148, 0.1);
}

.text-primary {
  color: #519294;
}
</style> 