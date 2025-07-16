<template>
  <div 
    @click="toggle"
    :class="[
      'toggle-switch',
      modelValue ? 'active' : ''
    ]"
  ></div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch.active {
  background: #519294;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active::after {
  transform: translateX(20px);
}
</style> 