<template>
  <div class="layout">
    <!-- 顶部Header -->
    <div class="layout-header">
      <AppHeader />
    </div>

    <!-- 中间内容区域 -->
    <div class="layout-main">
      <div class="main-container">
        <router-view />
      </div>
    </div>

    <!-- 底部Footer -->
    <div class="layout-footer">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部Header */
.layout-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* 中间内容区域 */
.layout-main {
  flex: 1;
  background-color: #f5f7fa;
  padding-top: 80px; /* 为固定header留出空间 */
  overflow-y: auto;
}

.main-container {
  width: 100%;
  height: 100%;
}

/* 底部Footer */
.layout-footer {
  flex-shrink: 0;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-main {
    padding-top: 70px;
  }
}
</style> 