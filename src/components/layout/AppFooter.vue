<template>
  <footer class="bg-gray-900 text-white py-12">
   
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* 确保链接样式正确 */
.router-link-active {
  color: #83a594;
}

/* 自定义样式 */
a:hover {
  transition: color 0.2s ease-in-out;
}
</style> 