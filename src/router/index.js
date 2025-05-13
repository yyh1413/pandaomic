import Vue from "vue";
import Router from "vue-router";
/* Layout */
import Layout from "@/layout";

// 子页面路由组件

Vue.use(Router);


// 公共路由
export const constantRoutes = [
  {
    path: "",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: "/",
        component: () => import("@/views/index"),
        name: "Index",
        meta: { title: "首页", icon: "home" },
      },
      {
        path: "/illness",
        component: () => import("@/views/illness/index"),
        name: "illness",
        meta: { title: "疾病", icon: "home" },
      },
      {
        path: "/gene",
        component: () => import("@/views/gene/index"),
        name: "gene",
        meta: { title: "基因-疾病", icon: "home" },
      },
      {
        path: "/targeting",
        component: () => import("@/views/targeting/index"),
        name: "targeting",
        meta: { title: "靶点热图", icon: "home" },
      },
    ],
  },

  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/retrievePassword",
    component: () => import("@/views/register/retrievePassword"),
    hidden: true,
  },
  {
    path: "/bind/phone",
    component: () => import("@/views/register/bindPhone"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: '/agreement',
    name: 'AgreementList',
    component: () => import("@/views/agreement/agreement.vue"),
  },

];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
