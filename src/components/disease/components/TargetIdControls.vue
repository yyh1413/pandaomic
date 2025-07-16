<template>
  <div class="flex items-center space-x-2">
    <!-- 搜索功能 -->
    <div class="relative">
      <button @click="toggleSearch" class="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
        <i class="fas fa-search text-gray-600"></i>
      </button>
      <div v-show="searchOpen" class="absolute right-0 top-full mt-2 z-10">
        <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-64">
          <div class="flex items-center space-x-2">
            <input 
              v-model="searchTerm" 
              type="text" 
              placeholder="Search gene name..." 
              class="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
            >
            <button @click="submitSearch" class="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 text-sm">
              <i class="fas fa-search"></i>
            </button>
            <button @click="closeSearch" class="px-3 py-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 下载按钮 -->
    <div class="relative">
      <button @click="toggleDownload" class="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
        <i class="fas fa-download text-gray-600"></i>
      </button>
      <div v-show="downloadOpen" class="absolute right-0 top-full mt-2 z-10">
        <div class="bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-48">
          <button @click="downloadAs('csv')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
            <i class="fas fa-file-csv mr-2 text-green-600"></i>Download as CSV
          </button>
          <button @click="downloadAs('excel')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
            <i class="fas fa-file-excel mr-2 text-green-600"></i>Download as Excel
          </button>
          <button @click="downloadAs('pdf')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
            <i class="fas fa-file-pdf mr-2 text-red-600"></i>Download as PDF
          </button>
          <button @click="downloadAs('image')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
            <i class="fas fa-image mr-2 text-blue-600"></i>Download as Image
          </button>
        </div>
      </div>
    </div>
    
    <!-- 信息按钮 -->
    <button class="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
      <i class="fas fa-info-circle text-gray-600"></i>
    </button>
    
    <!-- 分页信息和控制 -->
    <div class="flex items-center space-x-3 ml-4">
      <span class="text-sm text-gray-600">{{ paginationText }}</span>
      <div class="flex items-center space-x-1">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i class="fas fa-chevron-left text-gray-600 text-sm"></i>
        </button>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i class="fas fa-chevron-right text-gray-600 text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive state
const searchOpen = ref(false)
const downloadOpen = ref(false)
const searchTerm = ref('')
const currentPage = ref(1)
const totalPages = ref(5)
const itemsPerPage = ref(20)
const totalItems = ref(100)

// Computed
const paginationText = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1
  const end = Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
  return `${start}-${end} of ${totalItems.value}`
})

// Methods
const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
  downloadOpen.value = false
}

const toggleDownload = () => {
  downloadOpen.value = !downloadOpen.value
  searchOpen.value = false
}

const closeSearch = () => {
  searchOpen.value = false
  searchTerm.value = ''
}

const submitSearch = () => {
  if (searchTerm.value.trim()) {
    console.log('Searching for:', searchTerm.value)
    // Implement search logic
  }
}

const downloadAs = (format) => {
  console.log('Downloading as:', format)
  downloadOpen.value = false
  // Implement download logic
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const closeDropdowns = (event) => {
  if (!event.target.closest('.relative')) {
    searchOpen.value = false
    downloadOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<style scoped>
.bg-primary {
  background-color: #519294;
}

.hover\:bg-primary\/90:hover {
  background-color: rgba(81, 146, 148, 0.9);
}

.text-primary {
  color: #519294;
}

.focus\:ring-primary\/20:focus {
  --tw-ring-color: rgba(81, 146, 148, 0.2);
}

.focus\:border-primary:focus {
  border-color: #519294;
}
</style> 