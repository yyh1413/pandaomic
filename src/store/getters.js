const getters = {

  token: state => state.user.token,

  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,

}
export default getters
