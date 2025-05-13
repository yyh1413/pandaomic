<template>
  <el-menu v-if="menuList.length > 0" class="top-menu" mode="horizontal" :default-active="activePath" @select="handleSelect">
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
      {{ item.meta.title }}
    </el-menu-item>
  </el-menu>
</template>

<script>
import { constantRoutes } from '@/router' // 根据你项目的实际路径调整

export default {

  name: 'TopMenu',
  data() {
    return {
      activePath: this.$route.path,
      menuList: []
    };
  },
  mounted() {
    this.menuList = constantRoutes[0].children
    console.log('constantRoutes', JSON.parse(JSON.stringify(constantRoutes[0].children)));

  },
  computed: {
  },
  watch: {
    '$route.path'(newPath) {
      this.activePath = newPath;
    },
  },
  methods: {
    handleSelect(path) {
      if (path !== this.activePath) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
.top-menu {
  line-height: 60px;
  height: 60px;
}
</style>
