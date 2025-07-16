<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button @click="$emit('toggle-sidebar')" class="text-gray-500 hover:text-primary mr-4">
            <i class="fas fa-bars text-lg"></i>
          </button>
          <router-link to="/" class="flex items-center">
            <div class="bg-[#519294] text-white px-3 py-1 rounded-lg font-bold text-xl">Y150</div>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-8 ml-auto mr-8">
          <router-link to="/" class="text-gray-700 hover:text-primary relative group">
            <i class="fas fa-search text-xl"></i>
            <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs">Search</span>
          </router-link>
          <router-link to="/upload" class="text-gray-700 hover:text-primary relative group">
            <i class="fas fa-cloud-upload-alt text-xl"></i>
            <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs">Data Upload</span>
          </router-link>
          <router-link to="/manager" class="text-gray-700 hover:text-primary relative group">
            <i class="fas fa-tasks text-xl"></i>
            <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs">Data Manager</span>
          </router-link>
        </div>
        
        <div class="flex items-center">
          <div class="relative">
            <button @click="toggleUserMenu" class="flex items-center text-[#519294] hover:text-[#3a6b6c]">
              <i class="fas fa-user-circle text-2xl"></i>
            </button>
            <div 
              v-show="userDropdownOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              @click.stop
            >
              <router-link to="/plan" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Current Plan</router-link>
              <router-link to="/manual" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Manual</router-link>
              <hr class="my-1">
              <a href="#" @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Emits
const emit = defineEmits(['toggle-sidebar', 'user-menu-toggle'])

// Reactive state
const userDropdownOpen = ref(false)

// Methods
const toggleUserMenu = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  emit('user-menu-toggle')
}

const logout = () => {
  // Handle logout logic
  console.log('Logout clicked')
  userDropdownOpen.value = false
}

const closeUserDropdown = (event) => {
  if (!event.target.closest('.relative')) {
    userDropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeUserDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserDropdown)
})
</script>

<style scoped>
.text-primary {
  color: #519294;
}

.hover\:text-primary:hover {
  color: #519294;
}
</style> 