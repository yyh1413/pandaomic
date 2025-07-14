<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-accent/20 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
          <i class="fas fa-user-plus text-white text-xl"></i>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
          Sign Up for Y150
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Request access to our multi-omics platform
        </p>
      </div>
      
      <el-form ref="signupFormRef" :model="signupForm" :rules="rules" @submit.prevent="handleSubmit">
        <el-form-item prop="fullName">
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <el-input 
            v-model="signupForm.fullName" 
            placeholder="Enter your full name"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <el-input 
            v-model="signupForm.email" 
            type="email" 
            placeholder="Enter your email address"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="jobTitle">
          <label class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
          <el-input 
            v-model="signupForm.jobTitle" 
            placeholder="Enter your job title"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="affiliation">
          <label class="block text-sm font-medium text-gray-700 mb-2">Affiliation *</label>
          <el-input 
            v-model="signupForm.affiliation" 
            placeholder="Enter your organization/institution"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="country">
          <label class="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <el-select 
            v-model="signupForm.country" 
            placeholder="Select your country"
            size="large"
            class="w-full"
          >
            <el-option label="🇺🇸 United States" value="United States" />
            <el-option label="🇬🇧 United Kingdom" value="United Kingdom" />
            <el-option label="🇨🇦 Canada" value="Canada" />
            <el-option label="🇦🇺 Australia" value="Australia" />
            <el-option label="🇩🇪 Germany" value="Germany" />
            <el-option label="🇫🇷 France" value="France" />
            <el-option label="🇯🇵 Japan" value="Japan" />
            <el-option label="🇨🇳 China" value="China" />
            <el-option label="🇸🇬 Singapore" value="Singapore" />
            <el-option label="🇨🇭 Switzerland" value="Switzerland" />
            <el-option label="🇳🇱 Netherlands" value="Netherlands" />
            <el-option label="🇸🇪 Sweden" value="Sweden" />
            <el-option label="🇰🇷 South Korea" value="South Korea" />
            <el-option label="🇮🇳 India" value="India" />
            <el-option label="🇮🇱 Israel" value="Israel" />
            <el-option label="🌍 Other Country" value="Other" />
          </el-select>
        </el-form-item>
        
        <el-button 
          type="primary" 
          size="large"
          class="w-full mb-4"
          :loading="loading"
          @click="handleSubmit"
        >
          <i class="fas fa-paper-plane mr-2"></i>
          Request Access
        </el-button>
        
        <div class="text-center space-y-2">
          <p class="text-xs text-gray-600">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
          <div>
            <span class="text-sm text-gray-600">Already have an account? </span>
            <router-link to="/login" class="text-sm text-primary hover:underline">Sign in</router-link>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const signupFormRef = ref()
const loading = ref(false)

const signupForm = reactive({
  fullName: '',
  email: '',
  jobTitle: '',
  affiliation: '',
  country: ''
})

const rules = reactive({
  fullName: [
    { required: true, message: 'Please enter your full name', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  jobTitle: [
    { required: true, message: 'Please enter your job title', trigger: 'blur' }
  ],
  affiliation: [
    { required: true, message: 'Please enter your affiliation', trigger: 'blur' }
  ],
  country: [
    { required: true, message: 'Please select your country', trigger: 'change' }
  ]
})

const handleSubmit = async () => {
  try {
    await signupFormRef.value.validate()
    loading.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('Application submitted successfully! Please check your email within 1-3 business days.')
    
    // 重置表单
    signupFormRef.value.resetFields()
    
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

.text-primary {
  color: #83a594;
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
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 8px;
}
</style> 