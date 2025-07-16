<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Data Manager</h1>
    
    <!-- 标签页导航 -->
    <div class="mb-6 border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-1 py-4 font-medium text-sm border-b-2',
            activeTab === tab.key
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- LLM Reports 内容 -->
    <div v-if="activeTab === 'llm'" class="tab-content">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <el-table :data="llmReports" style="width: 100%">
            <el-table-column prop="name" label="Report Name" width="200" />
            <el-table-column prop="gene" label="Gene" width="120" />
            <el-table-column prop="disease" label="Disease" width="150" />
            <el-table-column prop="date" label="Date" width="120" />
            <el-table-column prop="status" label="Status" width="120">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.status === 'Completed' ? 'success' : 'warning'"
                  size="small"
                >
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Actions" width="200">
              <template #default="scope">
                <div class="flex space-x-2">
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="viewReport(scope.row)"
                    :icon="View"
                  />
                  <el-button 
                    type="warning" 
                    size="small" 
                    @click="editReport(scope.row)"
                    :icon="Edit"
                  />
                  <el-button 
                    type="danger" 
                    size="small" 
                    @click="deleteReport(scope.row)"
                    :icon="Delete"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Datasets 内容 -->
    <div v-if="activeTab === 'datasets'" class="tab-content">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <el-table :data="datasets" style="width: 100%">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="technology" label="Technology" width="150">
              <template #default="scope">
                <el-tag 
                  :type="getTechnologyType(scope.row.technology)"
                  size="small"
                >
                  {{ scope.row.technology }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="genes" label="Genes" width="100" />
            <el-table-column prop="platform" label="Platform" width="150" />
            <el-table-column prop="species" label="Species" width="100" />
            <el-table-column prop="date" label="Upload Date" width="120" />
            <el-table-column label="Actions" width="200">
              <template #default="scope">
                <div class="flex space-x-2">
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="viewDataset(scope.row)"
                    :icon="View"
                  />
                  <el-button 
                    type="warning" 
                    size="small" 
                    @click="editDataset(scope.row)"
                    :icon="Edit"
                  />
                  <el-button 
                    type="danger" 
                    size="small" 
                    @click="deleteDataset(scope.row)"
                    :icon="Delete"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Genes 内容 -->
    <div v-if="activeTab === 'genes'" class="tab-content">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <el-table :data="geneSets" style="width: 100%">
            <el-table-column prop="name" label="Gene Set Name" width="200" />
            <el-table-column prop="genes" label="Gene List" width="300">
              <template #default="scope">
                <el-tooltip :content="scope.row.genes" placement="top">
                  <div class="truncate">{{ scope.row.genes }}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="Genes Count" width="120" />
            <el-table-column prop="date" label="Created Date" width="120" />
            <el-table-column label="Actions" width="200">
              <template #default="scope">
                <div class="flex space-x-2">
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="viewGeneSet(scope.row)"
                    :icon="View"
                  />
                  <el-button 
                    type="warning" 
                    size="small" 
                    @click="editGeneSet(scope.row)"
                    :icon="Edit"
                  />
                  <el-button 
                    type="danger" 
                    size="small" 
                    @click="deleteGeneSet(scope.row)"
                    :icon="Delete"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 查看详情弹窗 -->
    <el-dialog v-model="viewDialogVisible" :title="viewDialogTitle" width="800px">
      <div v-if="viewingItem" class="space-y-4">
        <div v-if="activeTab === 'genes'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium">Name:</label>
              <p>{{ viewingItem.name }}</p>
            </div>
            <div>
              <label class="font-medium">Count:</label>
              <p>{{ viewingItem.count }} genes</p>
            </div>
          </div>
          <div>
            <label class="font-medium">Gene List:</label>
            <div class="mt-2 p-4 bg-gray-50 rounded-lg">
              <div class="flex flex-wrap gap-2">
                <el-tag 
                  v-for="gene in viewingItem.genes.split(', ')" 
                  :key="gene"
                  size="small"
                  class="mb-1"
                >
                  {{ gene }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <el-descriptions :column="2" border>
            <el-descriptions-item v-for="(value, key) in viewingItem" :key="key" :label="key">
              {{ value }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" :title="editDialogTitle" width="600px">
      <el-form v-if="editingItem" ref="editFormRef" :model="editingItem" label-width="120px">
        <el-form-item label="Name" prop="name">
          <el-input v-model="editingItem.name" />
        </el-form-item>
        <el-form-item v-if="activeTab === 'genes'" label="Description" prop="description">
          <el-input v-model="editingItem.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveChanges">Save</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, Edit, Delete } from '@element-plus/icons-vue'

const activeTab = ref('llm')
const viewDialogVisible = ref(false)
const editDialogVisible = ref(false)
const viewingItem = ref(null)
const editingItem = ref(null)
const editFormRef = ref()

const tabs = [
  { key: 'llm', label: 'LLM Reports' },
  { key: 'datasets', label: 'Datasets' },
  { key: 'genes', label: 'Genes' }
]

// 模拟数据
const llmReports = reactive([
  {
    name: 'EGFR-Lung Cancer-20240315',
    gene: 'EGFR',
    disease: 'Lung Cancer',
    date: '2024-03-15',
    status: 'Completed'
  },
  {
    name: 'TP53-Breast Cancer-20240314',
    gene: 'TP53',
    disease: 'Breast Cancer',
    date: '2024-03-14',
    status: 'Running'
  }
])

const datasets = reactive([
  {
    name: 'LUAD_RNA_seq_2024',
    technology: 'Bulk RNA-seq',
    genes: '21,538',
    platform: 'Illumina NovaSeq',
    species: 'Human',
    date: '2024-03-10'
  },
  {
    name: 'NSCLC_scRNA_2024',
    technology: 'Single-cell RNA-seq',
    genes: '18,472',
    platform: '10x Genomics',
    species: 'Human',
    date: '2024-03-05'
  }
])

const geneSets = reactive([
  {
    name: 'Lung Cancer Markers',
    genes: 'EGFR, KRAS, ALK, ROS1, BRAF, PIK3CA, STK11, KEAP1, NF1, MET, ERBB2, CDKN2A, TP53, SMARCA4, ARID1A',
    count: '15',
    date: '2024-03-12',
    description: 'Key diagnostic markers for lung cancer research including oncogenes and tumor suppressor genes commonly mutated in lung adenocarcinoma.'
  },
  {
    name: 'Immune Response',
    genes: 'PDCD1, CD274, CTLA4, LAG3, TIGIT, HAVCR2, BTLA, CD276',
    count: '8',
    date: '2024-03-08',
    description: 'Immune checkpoint genes for therapy response prediction including PD-1, PD-L1, CTLA-4 and other co-inhibitory receptors.'
  }
])

const viewDialogTitle = computed(() => {
  const titleMap = {
    llm: 'LLM Report Details',
    datasets: 'Dataset Details',
    genes: 'Gene Set Details'
  }
  return titleMap[activeTab.value]
})

const editDialogTitle = computed(() => {
  const titleMap = {
    llm: 'Edit LLM Report',
    datasets: 'Edit Dataset',
    genes: 'Edit Gene Set'
  }
  return titleMap[activeTab.value]
})

const getTechnologyType = (technology) => {
  if (technology.includes('Bulk')) return 'primary'
  if (technology.includes('Single-cell')) return 'success'
  return 'info'
}

const viewReport = (item) => {
  viewingItem.value = item
  viewDialogVisible.value = true
}

const viewDataset = (item) => {
  viewingItem.value = item
  viewDialogVisible.value = true
}

const viewGeneSet = (item) => {
  viewingItem.value = item
  viewDialogVisible.value = true
}

const editReport = (item) => {
  editingItem.value = { ...item }
  editDialogVisible.value = true
}

const editDataset = (item) => {
  editingItem.value = { ...item }
  editDialogVisible.value = true
}

const editGeneSet = (item) => {
  editingItem.value = { ...item }
  editDialogVisible.value = true
}

const deleteReport = (item) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete report "${item.name}"?`,
    'Confirm Delete',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    const index = llmReports.findIndex(r => r.name === item.name)
    if (index > -1) {
      llmReports.splice(index, 1)
      ElMessage.success('Report deleted successfully')
    }
  }).catch(() => {
    // 用户取消
  })
}

const deleteDataset = (item) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete dataset "${item.name}"?`,
    'Confirm Delete',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    const index = datasets.findIndex(d => d.name === item.name)
    if (index > -1) {
      datasets.splice(index, 1)
      ElMessage.success('Dataset deleted successfully')
    }
  }).catch(() => {
    // 用户取消
  })
}

const deleteGeneSet = (item) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete gene set "${item.name}"?`,
    'Confirm Delete',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    const index = geneSets.findIndex(g => g.name === item.name)
    if (index > -1) {
      geneSets.splice(index, 1)
      ElMessage.success('Gene set deleted successfully')
    }
  }).catch(() => {
    // 用户取消
  })
}

const saveChanges = () => {
  // 根据当前标签保存对应的数据
  if (activeTab.value === 'llm') {
    const index = llmReports.findIndex(r => r.name === editingItem.value.name)
    if (index > -1) {
      Object.assign(llmReports[index], editingItem.value)
    }
  } else if (activeTab.value === 'datasets') {
    const index = datasets.findIndex(d => d.name === editingItem.value.name)
    if (index > -1) {
      Object.assign(datasets[index], editingItem.value)
    }
  } else if (activeTab.value === 'genes') {
    const index = geneSets.findIndex(g => g.name === editingItem.value.name)
    if (index > -1) {
      Object.assign(geneSets[index], editingItem.value)
    }
  }
  
  ElMessage.success('Changes saved successfully')
  editDialogVisible.value = false
}
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-primary {
  color: #83a594;
}

.border-primary {
  border-color: #83a594;
}

:deep(.el-button--primary) {
  background-color: #83a594;
  border-color: #83a594;
}

:deep(.el-button--primary:hover) {
  background-color: #519294;
  border-color: #519294;
}

:deep(.el-tag--success) {
  background-color: #f0f9ff;
  color: #0369a1;
  border-color: #bae6fd;
}

:deep(.el-tag--warning) {
  background-color: #fffbeb;
  color: #d97706;
  border-color: #fed7aa;
}
</style> 