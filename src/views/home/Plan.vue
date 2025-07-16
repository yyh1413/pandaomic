<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Current Plan</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold">Professional Plan</h2>
          <p class="text-gray-600">Access to advanced analytics and unlimited datasets</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-primary">$299/month</div>
          <div class="text-sm text-gray-500">Billed monthly</div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="font-semibold mb-3">Current Usage</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span>Datasets uploaded:</span>
              <span class="font-medium">45 / Unlimited</span>
            </div>
            <div class="flex justify-between">
              <span>Analysis runs:</span>
              <span class="font-medium">156 / Unlimited</span>
            </div>
            <div class="flex justify-between">
              <span>Storage used:</span>
              <span class="font-medium">2.3 TB / 10 TB</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-3">Plan Features</h3>
          <ul class="space-y-2">
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
        </div>
      </div>
      
      <div class="flex space-x-4">
        <router-link to="/subscription">
          <el-button type="primary">Manage Subscription</el-button>
        </router-link>
        <el-button type="default">Download Invoice</el-button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Billing History</h2>
      <el-table :data="billingHistory" style="width: 100%">
        <el-table-column prop="date" label="Date" width="120" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="amount" label="Amount" width="100" />
        <el-table-column prop="status" label="Status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'Paid' ? 'success' : 'warning'" size="small">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="100">
          <template #default>
            <el-button type="text" size="small">Download</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const billingHistory = ref([
  {
    date: '2024-03-01',
    description: 'Professional Plan - March 2024',
    amount: '$299.00',
    status: 'Paid'
  },
  {
    date: '2024-02-01',
    description: 'Professional Plan - February 2024',
    amount: '$299.00',
    status: 'Paid'
  },
  {
    date: '2024-01-01',
    description: 'Professional Plan - January 2024',
    amount: '$299.00',
    status: 'Paid'
  }
])
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-primary {
  color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 