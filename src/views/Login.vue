<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="bg-primary text-white px-4 py-2 rounded-lg font-bold text-2xl inline-block mb-4">Y150</div>
        <h2 class="text-2xl font-bold text-dark">Welcome Back</h2>
        <p class="text-gray-600">Sign in to your account</p>
      </div>
      
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" @submit.prevent="handleSubmit">
        <el-form-item prop="email">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <el-input 
            v-model="loginForm.email" 
            type="email" 
            placeholder="Enter your email"
            size="large"
            class="w-full"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="Enter your password"
            size="large"
            class="w-full"
            show-password
          />
        </el-form-item>
        
        <div class="flex items-center justify-between mb-6">
          <el-checkbox v-model="loginForm.remember">Remember me</el-checkbox>
          <router-link to="/forgot-password" class="text-sm text-primary hover:underline">
            Forgot password?
          </router-link>
        </div>
        
        <el-button 
          type="primary" 
          size="large"
          class="w-full mb-4"
          :loading="loading"
          @click="handleSubmit"
        >
          Sign In
        </el-button>
        
        <div class="text-center">
          <span class="text-gray-600">Don't have an account? </span>
          <router-link to="/signup" class="text-primary hover:underline">Sign up</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

const rules = reactive({
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
})

const handleSubmit = async () => {
  try {
    await loginFormRef.value.validate()
    loading.value = true

    const result = await userStore.login({
      username: loginForm.email, // 适配store中的字段名
      password: loginForm.password
    })

    if (result.success) {
      ElMessage.success('Login successful!')
      router.push('/')
    } else {
      ElMessage.error(result.message || 'Login failed')
    }
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.primary {
  background-color: #83a594;
}

.secondary {
  background-color: #519294;
}

.text-primary {
  color: #83a594;
}

.text-dark {
  color: #58798c;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}

:deep(.el-button--primary:hover) {
  background-color: #519294;
  border-color: #519294;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 12px 16px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 