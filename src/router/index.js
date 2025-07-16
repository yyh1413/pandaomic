import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 导入布局组件
const Layout = () => import('@/components/layout/Layout.vue')

// 页面组件
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/auth/Login.vue')
const ForgotPassword = () => import('@/views/auth/ForgotPassword.vue')
const SignUp = () => import('@/views/auth/SignUp.vue')
const Upload = () => import('@/views/home/Upload.vue')
const DataManager = () => import('@/views/home/DataManager.vue')
const Summary = () => import('@/views/home/Summary.vue')
const TargetId = () => import('@/views/home/TargetId.vue')
const Datasets = () => import('@/views/home/Datasets.vue')
const Knowledge = () => import('@/views/home/Knowledge.vue')
const Leaders = () => import('@/views/home/Leaders.vue')
const Grants = () => import('@/views/home/Grants.vue')
const Plan = () => import('@/views/home/Plan.vue')
const Subscription = () => import('@/views/home/Subscription.vue')
const Manual = () => import('@/views/home/Manual.vue')
const PDFReport = () => import('@/views/home/PDFReport.vue')

// 疾病分析页面
const DiseaseAnalysis = () => import('@/views/disease/index.vue')

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
      hideLayout: true
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: '忘记密码',
      requiresAuth: false,
      hideLayout: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: '注册',
      requiresAuth: false,
      hideLayout: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          requiresAuth: false
        }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: Upload,
        meta: {
          title: '数据上传',
          requiresAuth: true
        }
      },
      {
        path: 'manager',
        name: 'DataManager',
        component: DataManager,
        meta: {
          title: '数据管理',
          requiresAuth: true
        }
      },
      {
        path: 'summary',
        name: 'Summary',
        component: Summary,
        meta: {
          title: '总览',
          requiresAuth: true
        }
      },
      {
        path: 'target-id',
        name: 'TargetId',
        component: TargetId,
        meta: {
          title: '靶点识别',
          requiresAuth: true
        }
      },
      {
        path: 'datasets',
        name: 'Datasets',
        component: Datasets,
        meta: {
          title: '数据集',
          requiresAuth: true
        }
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: Knowledge,
        meta: {
          title: '知识图谱',
          requiresAuth: true
        }
      },
      {
        path: 'leaders',
        name: 'Leaders',
        component: Leaders,
        meta: {
          title: '意见领袖',
          requiresAuth: true
        }
      },
      {
        path: 'grants',
        name: 'Grants',
        component: Grants,
        meta: {
          title: '研究资助',
          requiresAuth: true
        }
      },
      {
        path: 'plan',
        name: 'Plan',
        component: Plan,
        meta: {
          title: '当前计划',
          requiresAuth: true
        }
      },
      {
        path: 'subscription',
        name: 'Subscription',
        component: Subscription,
        meta: {
          title: '订阅管理',
          requiresAuth: true
        }
      },
      {
        path: 'manual',
        name: 'Manual',
        component: Manual,
        meta: {
          title: '用户手册',
          requiresAuth: false
        }
      },
      {
        path: 'pdf-report/:reportId',
        name: 'PDFReport',
        component: PDFReport,
        meta: {
          title: 'PDF报告',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/disease',
    name: 'DiseaseAnalysis',
    component: DiseaseAnalysis,
    meta: {
      title: '疾病分析',
      requiresAuth: false,
      hideLayout: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Y150` : 'Y150'
  
  return next()
  // 检查是否需要认证
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router 