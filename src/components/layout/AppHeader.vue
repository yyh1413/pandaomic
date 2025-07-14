<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/home" class="flex items-center">
            <div class="bg-[#519294] text-white px-3 py-1 rounded-lg font-bold text-xl">Y150</div>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-8 ml-auto mr-8">
          <router-link to="/home" class="text-gray-700 hover:text-primary relative group">
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
            <button @click="toggleUserDropdown" class="flex items-center text-[#519294] hover:text-[#3a6b6c]">
              <i class="fas fa-user-circle text-2xl"></i>
            </button>
            <div v-show="showUserDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <router-link to="/plan" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Current Plan</router-link>
              <router-link to="/manual" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Manual</router-link>
              <hr class="my-1">
              <a href="#" @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const showUserDropdown = ref(false)

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
  showUserDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showUserDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.primary {
  color: #83a594;
}

.text-primary {
  color: #83a594;
}

.hover\:text-primary:hover {
  color: #83a594;
}

/* 确保路由链接样式正确 */
.router-link-active {
  color: #519294;
}
</style> 