<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  height: 100vh;
}

/* 引入Font Awesome图标 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* 全局Tailwind CSS主题色调 */
:root {
  --primary: #83a594;
  --secondary: #519294;
  --accent: #becbd3;
  --neutral: #7f9eb0;
  --dark: #58798c;
  --light: #5da3af;
}

/* 全局动画 */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 定制滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Element Plus 主题定制 */
:root {
  --el-color-primary: #83a594;
  --el-color-primary-light-3: #a3bba8;
  --el-color-primary-light-5: #b8c8bb;
  --el-color-primary-light-7: #cdd5ce;
  --el-color-primary-light-8: #d9ddd9;
  --el-color-primary-light-9: #e6e8e6;
  --el-color-primary-dark-2: #6c8976;
}
</style> 