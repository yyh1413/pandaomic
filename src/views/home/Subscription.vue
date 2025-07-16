<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Manage Subscription</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
        <h3 class="text-xl font-semibold mb-4">Basic</h3>
        <p class="text-3xl font-bold text-primary mb-4">$99/month</p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            10 datasets
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Basic analytics
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Email support
          </li>
          <li class="flex items-center">
            <i class="fas fa-times text-red-500 mr-2"></i>
            API access
          </li>
        </ul>
        <el-button type="default" class="w-full">Downgrade</el-button>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6 border-2 border-primary relative">
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            Current Plan
          </span>
        </div>
        <h3 class="text-xl font-semibold mb-4">Professional</h3>
        <p class="text-3xl font-bold text-secondary mb-4">$299/month</p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Unlimited datasets
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Advanced analytics
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Priority support
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            API access
          </li>
        </ul>
        <el-button type="primary" class="w-full" disabled>Current Plan</el-button>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
        <h3 class="text-xl font-semibold mb-4">Enterprise</h3>
        <p class="text-3xl font-bold text-neutral mb-4">Contact Us</p>
        <ul class="space-y-2 text-gray-600 mb-6">
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Custom solutions
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            Dedicated support
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            On-premise deployment
          </li>
          <li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            SLA guarantee
          </li>
        </ul>
        <el-button type="default" class="w-full">Contact Sales</el-button>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
      <div class="flex items-center justify-between border rounded-lg p-4">
        <div class="flex items-center">
          <i class="fab fa-cc-visa text-2xl text-blue-600 mr-3"></i>
          <div>
            <div class="font-medium">•••• •••• •••• 4242</div>
            <div class="text-sm text-gray-500">Expires 12/25</div>
          </div>
        </div>
        <el-button type="text">Update</el-button>
      </div>
    </div>

    <!-- Billing Settings -->
    <div class="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 class="text-xl font-semibold mb-4">Billing Settings</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">Next billing date</div>
            <div class="text-sm text-gray-500">April 1, 2024</div>
          </div>
          <div class="text-right">
            <div class="font-medium">$299.00</div>
            <div class="text-sm text-gray-500">Monthly</div>
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t">
          <div>
            <div class="font-medium">Cancel subscription</div>
            <div class="text-sm text-gray-500">You can cancel anytime</div>
          </div>
          <el-button type="danger" size="small">Cancel</el-button>
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

.border-primary {
  border-color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}

:deep(.el-button--primary:hover) {
  background-color: #519294;
  border-color: #519294;
}
</style> 