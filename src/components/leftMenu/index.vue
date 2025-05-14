<template>
  <div class="left-menu">
    <el-menu :default-active="active" class="el-menu-vertical-demo" router :collapse="isCollapse">
      <el-menu-item index="/illness">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">疾病</span>
      </el-menu-item>
      <el-menu-item index="/targeting">
        <i class="el-icon-s-grid"></i>
        <span slot="title">靶点热图</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      active: '/illness'
    };
  },
  created() {
    this.active = window.location.pathname
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  position: fixed;
  top: 60px;
  left: 0;
  background: #fff;
  border-right: 1px solid #e6e6e6;
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>