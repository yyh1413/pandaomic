<template>
  <div id="nab_box">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div style="display: flex;align-items: center;">
        <div class="logo" @click="$router.push('/')">
          <img src="~@/assets/logo.png" class="logo_img" />
        </div>
        <!-- <Menu /> -->
        <!-- <div class="logo">
        <img src="~@/assets/logo.png" class="logo_img"  @click="$router.push('/')"/>
      </div> -->
      </div>
      <Avatar />



    </div>
  </div>
</template>

<script>
import Avatar from './avatar/Avatar.vue'
import Menu from './Menu.vue'
export default {
  name: 'Navbar',
  components: {
    Menu,
    Avatar
  },
  data() {
    return {
    }
  },
  methods: {
  }
}

</script>

<style scoped lang="scss">
#nab_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100vh; */
  font-family: Arial, sans-serif;
  background-color: #FFFFFF;
}

/* 顶部导航栏 */
.navbar {
  width: 1200px;
  margin: auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  margin-right: 25px;
  display: flex;
  align-items: center;

  .logo_img {
    cursor: pointer;
    width: 124px;
    height: 30px;
  }
}
</style>
