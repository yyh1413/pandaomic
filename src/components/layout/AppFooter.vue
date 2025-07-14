<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 公司信息 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <div class="bg-[#519294] text-white px-3 py-1 rounded-lg font-bold text-xl mr-3">Y150</div>
            <span class="text-lg font-semibold">Multi-Omics Platform</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            Empowering researchers with advanced multi-omics data analysis and target discovery capabilities for precision medicine.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/home" class="text-gray-300 hover:text-white transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/upload" class="text-gray-300 hover:text-white transition-colors">
                Data Upload
              </router-link>
            </li>
            <li>
              <router-link to="/manager" class="text-gray-300 hover:text-white transition-colors">
                Data Manager
              </router-link>
            </li>
            <li>
              <router-link to="/knowledge" class="text-gray-300 hover:text-white transition-colors">
                Knowledge Graph
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 支持 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/manual" class="text-gray-300 hover:text-white transition-colors">
                User Manual
              </router-link>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center">
              <i class="fas fa-envelope text-[#519294] mr-2"></i>
              <span class="text-sm">support@y150.com</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone text-[#519294] mr-2"></i>
              <span class="text-sm">+1 (555) 123-4567</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt text-[#519294] mr-2"></i>
              <span class="text-sm">San Francisco, CA</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 text-sm">
          © {{ currentYear }} Y150 Platform. All rights reserved.
        </div>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
            Terms of Service
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* 确保链接样式正确 */
.router-link-active {
  color: #83a594;
}

/* 自定义样式 */
a:hover {
  transition: color 0.2s ease-in-out;
}
</style> 