<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral/10 to-accent/10 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-neutral rounded-lg flex items-center justify-center">
          <i class="fas fa-key text-white text-xl"></i>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive reset instructions
        </p>
      </div>
      
      <el-form ref="resetFormRef" :model="resetForm" :rules="rules" @submit.prevent="handleSubmit">
        <el-form-item prop="email">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <el-input 
            v-model="resetForm.email" 
            type="email" 
            placeholder="Enter your email address"
            size="large"
            class="w-full"
          />
        </el-form-item>
        
        <el-button 
          type="primary" 
          size="large"
          class="w-full mb-4"
          :loading="loading"
          @click="handleSubmit"
        >
          Send Reset Link
        </el-button>
        
        <div class="text-center">
          <router-link to="/login" class="text-neutral hover:underline">
            Back to Sign In
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const resetFormRef = ref()
const loading = ref(false)

const resetForm = reactive({
  email: ''
})

const rules = reactive({
  email: [
    { required: true, message: 'Please enter your email address', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ]
})

const handleSubmit = async () => {
  try {
    await resetFormRef.value.validate()
    loading.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success(`Reset link sent to ${resetForm.email}`)
    resetForm.email = ''
    
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-neutral {
  color: #7f9eb0;
}

:deep(.el-button--primary) {
  background-color: #7f9eb0;
  border-color: #7f9eb0;
}

:deep(.el-button--primary:hover) {
  background-color: #58798c;
  border-color: #58798c;
}
</style> 