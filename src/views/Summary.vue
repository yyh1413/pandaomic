<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Summary Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-primary mb-2">Total Datasets</h3>
        <p class="text-3xl font-bold text-dark">1,247</p>
        <p class="text-sm text-gray-500 mt-2">+12% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-secondary mb-2">Active Projects</h3>
        <p class="text-3xl font-bold text-dark">23</p>
        <p class="text-sm text-gray-500 mt-2">5 completed this week</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-neutral mb-2">Targets Identified</h3>
        <p class="text-3xl font-bold text-dark">156</p>
        <p class="text-sm text-gray-500 mt-2">8 new targets found</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <div class="space-y-4">
        <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <i class="fas fa-upload text-white"></i>
          </div>
          <div>
            <p class="font-medium">New dataset uploaded</p>
            <p class="text-sm text-gray-500">LUAD_RNA_seq_2024 - 2 hours ago</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <i class="fas fa-chart-line text-white"></i>
          </div>
          <div>
            <p class="font-medium">Analysis completed</p>
            <p class="text-sm text-gray-500">EGFR-Lung Cancer report - 4 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 基础页面，无需特殊逻辑
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-primary {
  color: #83a594;
}

.text-secondary {
  color: #519294;
}

.text-neutral {
  color: #7f9eb0;
}
</style> 