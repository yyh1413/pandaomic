<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Knowledge Graph & Chat</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Knowledge Graph</h2>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <i class="fas fa-project-diagram text-4xl mb-4"></i>
            <p>Interactive Knowledge Graph Visualization</p>
            <p class="text-sm mt-2">Gene-Disease-Drug Relationships</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">AI Chat Assistant</h2>
        <div class="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
          <div class="mb-4">
            <div class="bg-primary text-white p-3 rounded-lg inline-block">
              Hello! How can I help you with target discovery today?
            </div>
          </div>
          <div v-for="message in chatMessages" :key="message.id" class="mb-4">
            <div :class="message.isUser ? 'text-right' : 'text-left'">
              <div :class="[
                'inline-block p-3 rounded-lg max-w-xs',
                message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              ]">
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <el-input
            v-model="newMessage"
            placeholder="Ask about targets, diseases, or pathways..."
            @keyup.enter="sendMessage"
          />
          <el-button type="primary" @click="sendMessage" class="ml-2">
            <i class="fas fa-paper-plane"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const newMessage = ref('')
const chatMessages = ref([])
let messageId = 0

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  // 添加用户消息
  chatMessages.value.push({
    id: ++messageId,
    text: newMessage.value,
    isUser: true
  })
  
  const userMessage = newMessage.value
  newMessage.value = ''
  
  // 模拟AI回复
  setTimeout(() => {
    let reply = "I'm analyzing your question about " + userMessage + ". Let me provide some insights..."
    
    chatMessages.value.push({
      id: ++messageId,
      text: reply,
      isUser: false
    })
  }, 1000)
}
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.bg-primary {
  background-color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}
</style> 