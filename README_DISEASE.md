# 疾病分析页面重构说明

## 概述

已将原HTML文件 `disease_result.html` 重构为Vue3组件架构，完全保持原有的UI设计和交互功能。

## 文件结构

```
src/
  views/
    disease/
      index.vue                           # 主页面入口
  components/
    disease/
      DiseaseNavBar.vue                   # 导航栏组件
      DiseaseSidebar.vue                  # 左侧菜单组件
      DiseaseSummary.vue                  # 疾病概要页面
      TargetId.vue                        # 靶点识别页面
      Datasets.vue                        # 数据集页面
      KnowledgeGraph.vue                  # 知识图谱页面
      Leaders.vue                         # 专家领袖页面
      Grants.vue                          # 资助机会页面
      components/                         # 子组件
        MetricCard.vue                    # 指标卡片
        DatasetsTable.vue                 # 数据集表格
        TargetIdControls.vue              # 靶点页面控制器
        TargetFilters.vue                 # 靶点筛选器
        ToggleSwitch.vue                  # 切换开关
        CheckboxItem.vue                  # 复选框项目
        FilterSection.vue                 # 筛选区域
        DatasetCard.vue                   # 数据集卡片
        LeaderCard.vue                    # 专家卡片
        GrantCard.vue                     # 资助卡片
```

## 主要功能模块

### 1. 疾病概要 (Disease Summary)
- 注意力分数和趋势显示
- 研究动态图表 (Chart.js)
- 临床试验分布图
- 相关数据集表格

### 2. 靶点识别 (Target ID)
- 热图可视化 (ECharts)
- 多维度筛选器
- 搜索和下载功能
- 分页控制

### 3. 数据集 (Datasets)
- 数据集卡片展示
- 统计数据概览
- 标签分类

### 4. 知识图谱 (Knowledge Graph)
- 基因关系图 (ECharts)
- AI聊天助手
- 交互式问答

### 5. 专家领袖 (Leaders)
- 专家信息卡片
- 专业领域标签
- 引用统计

### 6. 资助机会 (Grants)
- 资助项目卡片
- 状态管理
- 截止日期提醒

## 技术特点

### Vue3 Composition API
- 使用 `<script setup>` 语法
- 响应式数据管理
- 组件间通信

### 样式保持
- 完全保持原HTML的CSS样式
- 使用 `:deep()` 处理深层样式
- 中国风配色方案保持不变

### 图表集成
- Chart.js 用于统计图表
- ECharts 用于热图和知识图谱
- 动态导入减少包体积

### 组件复用
- 高度模块化设计
- 可复用的UI组件
- Props驱动的数据展示

## 路由配置

访问路径: `/disease`

```javascript
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
```

## 安装依赖

```bash
npm install chart.js echarts
```

## 使用方法

1. 启动开发服务器
```bash
npm run dev
```

2. 访问疾病分析页面
```
http://localhost:5173/disease
```

## 组件API

### DiseaseSummary
展示疾病的基本统计信息和研究动态。

### TargetId
靶点识别和筛选功能，包含复杂的多维度过滤器。

### KnowledgeGraph
知识图谱可视化和AI聊天功能。

## 样式系统

### CSS变量
```css
:root {
  --primary: #519294;
}
```

### 主要样式类
- `.bg-primary` - 主色背景
- `.text-primary` - 主色文字
- `.card` - 卡片容器
- `.expertise-tag` - 专业标签
- `.status-badge` - 状态徽章

## 交互功能

1. **侧边栏导航** - 模块间切换
2. **图表交互** - 悬停显示详情
3. **筛选器** - 多条件筛选
4. **搜索功能** - 基因名搜索
5. **下载功能** - 多格式导出
6. **AI聊天** - 智能问答

## 注意事项

1. 确保安装了所需的图表库
2. 某些高级筛选功能可能需要后端API支持
3. 热图数据为模拟数据，实际使用需要连接真实API
4. AI聊天功能使用的是预设响应，可扩展为真实AI服务

## 扩展建议

1. 添加数据API集成
2. 实现真实的AI聊天服务
3. 增加更多图表类型
4. 添加用户偏好设置
5. 实现数据导出功能 