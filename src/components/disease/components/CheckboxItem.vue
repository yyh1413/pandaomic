<template>
  <div class="flex items-center justify-between">
    <div class="checkbox-item" @click="toggle">
      <label class="flex items-center text-sm text-gray-700 cursor-pointer">
        <input 
          type="checkbox" 
          :checked="modelValue" 
          @change="toggle"
          class="mr-2 rounded border-gray-300 text-primary focus:ring-primary/20"
        >
        {{ label }}
      </label>
    </div>
    <span v-if="count !== null" class="text-xs text-gray-500">{{ count.toLocaleString() }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
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

.focus\:ring-primary\/20:focus {
  --tw-ring-color: rgba(81, 146, 148, 0.2);
}
</style> 