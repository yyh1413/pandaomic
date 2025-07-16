<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navigation Bar -->
    <DiseaseNavBar
      @toggle-sidebar="handleSidebarToggle"
      @user-menu-toggle="handleUserMenuToggle"
    />

    <!-- Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <DiseaseSidebar
      :is-open="sidebarOpen"
      :active-section="activeSection"
      @section-change="handleSectionChange"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <div class="min-h-screen pt-16 ml-0 transition-all duration-300">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Disease Summary Section -->
        <DiseaseSummary v-if="activeSection === 'summary'" />
        
        <!-- Target ID Section -->
        <TargetId v-if="activeSection === 'targetid'" />
        
        <!-- Datasets Section -->
        <Datasets v-if="activeSection === 'datasets'" />
        
        <!-- Knowledge Graph Section -->
        <KnowledgeGraph v-if="activeSection === 'knowledge'" />
        
        <!-- Leaders Section -->
        <Leaders v-if="activeSection === 'leaders'" />
        
        <!-- Grants Section -->
        <Grants v-if="activeSection === 'grants'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DiseaseNavBar from '@/components/disease/DiseaseNavBar.vue'
import DiseaseSidebar from '@/components/disease/DiseaseSidebar.vue'
import DiseaseSummary from '@/components/disease/DiseaseSummary.vue'
import TargetId from '@/components/disease/TargetId.vue'
import Datasets from '@/components/disease/Datasets.vue'
import KnowledgeGraph from '@/components/disease/KnowledgeGraph.vue'
import Leaders from '@/components/disease/Leaders.vue'
import Grants from '@/components/disease/Grants.vue'

// Reactive state
const sidebarOpen = ref(false)
const activeSection = ref('summary')

// Event handlers
const handleSidebarToggle = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleUserMenuToggle = () => {
  // Handle user menu toggle logic
}

const handleSectionChange = (section) => {
  activeSection.value = section
  if (window.innerWidth < 1024) {
    closeSidebar()
  }
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

// Lifecycle
onMounted(() => {
  // Initialize any global scripts or libraries here
})
</script>

<style scoped>
:deep(:root) {
  --primary: #519294;
}

:deep(.primary) { 
  color: var(--primary); 
}

:deep(.bg-primary) { 
  background-color: var(--primary); 
}

:deep(.fade-in) { 
  animation: fadeIn 0.5s ease-in; 
}

@keyframes fadeIn { 
  from { opacity: 0; } 
  to { opacity: 1; } 
}

/* Chart styles */
:deep(.chart-area) {
  height: 200px;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-radius: 8px;
  position: relative;
}

:deep(.chart-line) {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Knowledge Graph styles */
:deep(.knowledge-node) {
  transition: all 0.3s ease;
}

:deep(.knowledge-node:hover) {
  transform: scale(1.05);
  filter: brightness(1.1);
}

:deep(.connection-line) {
  stroke: #519294;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 5,5;
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

/* Target and other card styles */
:deep(.card) {
  transition: all 0.3s ease;
}

:deep(.card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

:deep(.score-bar) {
  height: 6px;
  background: linear-gradient(90deg, #519294, #66a6a8);
  border-radius: 3px;
  transition: width 0.8s ease;
}

:deep(.status-badge) {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

:deep(.status-active) { 
  background: #dcfce7; 
  color: #16a34a; 
}

:deep(.status-closed) { 
  background: #fee2e2; 
  color: #dc2626; 
}

:deep(.status-upcoming) { 
  background: #dbeafe; 
  color: #2563eb; 
}

:deep(.expertise-tag) {
  background: linear-gradient(45deg, #519294, #66a6a8);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

/* 自定义滚动条样式 */
:deep(.filter-scroll::-webkit-scrollbar) {
  width: 6px;
}

:deep(.filter-scroll::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 3px;
}

:deep(.filter-scroll::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 3px;
}

:deep(.filter-scroll::-webkit-scrollbar-thumb:hover) {
  background: #a1a1a1;
}

/* 左侧边栏交互样式 */
:deep(.filter-section) {
  transition: all 0.3s ease;
}

:deep(.filter-section.collapsed .filter-content) {
  display: none;
}

:deep(.filter-section.collapsed .chevron-icon) {
  transform: rotate(-90deg);
}

:deep(.chevron-icon) {
  transition: transform 0.3s ease;
}

:deep(.toggle-switch) {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

:deep(.toggle-switch.active) {
  background: var(--primary);
}

:deep(.toggle-switch::after) {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.toggle-switch.active::after) {
  transform: translateX(20px);
}

:deep(.checkbox-item) {
  cursor: pointer;
  padding: 4px 0;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

:deep(.checkbox-item:hover) {
  background-color: rgba(81, 146, 148, 0.1);
}

:deep(.section-header) {
  cursor: pointer;
  user-select: none;
}

:deep(.section-header:hover) {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
