<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">Choose what kind of data you want to upload</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 普通转录组 -->
      <div 
        class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-primary"
        @click="selectDataType('bulk-transcriptomics')"
      >
        <div class="text-primary mb-4">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-13l3 3H9l3-3zm-7.5 5l3 3-3 3v-6zm15 0v6l-3-3 3-3zm-7.5 5l3 3H9l3-3z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-dark">Bulk Transcriptomics</h3>
        <p class="text-gray-600">Study of RNA transcripts to analyze gene expression patterns across populations of cells</p>
      </div>

      <!-- 单细胞转录组 -->
      <div 
        class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-secondary"
        @click="selectDataType('single-cell-transcriptomics')"
      >
        <div class="text-secondary mb-4">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-13l4 4H8l4-4zm-4 5v6l-3-3 3-3zm8 0l3 3-3 3v-6zm-4 5l4 4H8l4-4z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-dark">Single-cell Transcriptomics</h3>
        <p class="text-gray-600">Analysis of gene expression at individual cell resolution to reveal cellular heterogeneity</p>
      </div>

      <!-- 蛋白组学 -->
      <div 
        class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-neutral"
        @click="selectDataType('proteomics')"
      >
        <div class="text-neutral mb-4">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 3a1 1 0 011 1v2h4a1 1 0 110 2h-4v2a1 1 0 11-2 0V8h-4V6h4V4a1 1 0 011-1zm-9 9a1 1 0 011 1v2h4v2H7v2a1 1 0 11-2 0v-2H1a1 1 0 110-2h4v-2a1 1 0 011-1zm12 0a1 1 0 011 1v2h4a1 1 0 110 2h-4v2a1 1 0 11-2 0v-2h-4v-2h4v-2a1 1 0 011-1z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-dark">Proteomics</h3>
        <p class="text-gray-600">Analysis of proteins to understand cellular functions and biological processes</p>
      </div>

      <!-- 甲基化 -->
      <div 
        class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-light"
        @click="selectDataType('methylation')"
      >
        <div class="text-light mb-4">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM6 7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm12 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-6 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5.5-3l3 3-3 3v-6zm11 0v6l-3-3 3-3z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-dark">Methylation</h3>
        <p class="text-gray-600">Analysis of DNA methylation to study gene regulation and epigenetic modifications</p>
      </div>
    </div>

    <!-- 上传表单弹窗 -->
    <el-dialog 
      v-model="showUploadDialog" 
      :title="uploadDialogTitle"
      width="600px"
      @close="resetUploadForm"
    >
      <el-form ref="uploadFormRef" :model="uploadForm" :rules="uploadRules" label-width="120px">
        <el-form-item label="Dataset Name" prop="name">
          <el-input v-model="uploadForm.name" placeholder="Enter dataset name" />
        </el-form-item>
        
        <el-form-item label="Description" prop="description">
          <el-input 
            v-model="uploadForm.description" 
            type="textarea" 
            :rows="3"
            placeholder="Enter dataset description"
          />
        </el-form-item>
        
        <el-form-item label="Platform" prop="platform">
          <el-select v-model="uploadForm.platform" placeholder="Select platform" class="w-full">
            <el-option 
              v-for="platform in availablePlatforms" 
              :key="platform.value" 
              :label="platform.label" 
              :value="platform.value"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Species" prop="species">
          <el-select v-model="uploadForm.species" placeholder="Select species" class="w-full">
            <el-option label="Human" value="human" />
            <el-option label="Mouse" value="mouse" />
            <el-option label="Rat" value="rat" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Files" prop="files">
          <el-upload
            ref="uploadRef"
            class="w-full"
            drag
            :auto-upload="false"
            multiple
            :file-list="uploadForm.files"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop files here or <em>click to upload</em>
            </div>
            <div class="el-upload__tip">
              Supported formats: FASTQ, BAM, CSV, TSV, Excel
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showUploadDialog = false">Cancel</el-button>
          <el-button type="primary" :loading="uploading" @click="handleUpload">
            Upload
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const showUploadDialog = ref(false)
const selectedDataType = ref('')
const uploadFormRef = ref()
const uploading = ref(false)

const uploadForm = reactive({
  name: '',
  description: '',
  platform: '',
  species: '',
  files: []
})

const uploadRules = reactive({
  name: [
    { required: true, message: 'Please enter dataset name', trigger: 'blur' }
  ],
  description: [
    { required: true, message: 'Please enter description', trigger: 'blur' }
  ],
  platform: [
    { required: true, message: 'Please select platform', trigger: 'change' }
  ],
  species: [
    { required: true, message: 'Please select species', trigger: 'change' }
  ],
  files: [
    { 
      type: 'array', 
      required: true, 
      message: 'Please upload at least one file', 
      trigger: 'change' 
    }
  ]
})

const uploadDialogTitle = computed(() => {
  const titleMap = {
    'bulk-transcriptomics': 'Upload Bulk Transcriptomics Data',
    'single-cell-transcriptomics': 'Upload Single-cell Transcriptomics Data',
    'proteomics': 'Upload Proteomics Data',
    'methylation': 'Upload Methylation Data'
  }
  return titleMap[selectedDataType.value] || 'Upload Data'
})

const availablePlatforms = computed(() => {
  const platformMap = {
    'bulk-transcriptomics': [
      { label: 'Illumina NovaSeq', value: 'illumina-novaseq' },
      { label: 'Illumina HiSeq', value: 'illumina-hiseq' },
      { label: 'Oxford Nanopore', value: 'oxford-nanopore' }
    ],
    'single-cell-transcriptomics': [
      { label: '10x Genomics', value: '10x-genomics' },
      { label: 'Smart-seq2', value: 'smart-seq2' },
      { label: 'Drop-seq', value: 'drop-seq' }
    ],
    'proteomics': [
      { label: 'Thermo Q Exactive', value: 'thermo-q-exactive' },
      { label: 'Waters Synapt', value: 'waters-synapt' },
      { label: 'Agilent QTOF', value: 'agilent-qtof' }
    ],
    'methylation': [
      { label: 'Illumina MethylationEPIC', value: 'illumina-epic' },
      { label: 'Illumina 450K', value: 'illumina-450k' },
      { label: 'Bisulfite Sequencing', value: 'bisulfite-seq' }
    ]
  }
  return platformMap[selectedDataType.value] || []
})

const selectDataType = (type) => {
  selectedDataType.value = type
  showUploadDialog.value = true
}

const handleFileChange = (file, fileList) => {
  uploadForm.files = fileList
}

const handleFileRemove = (file, fileList) => {
  uploadForm.files = fileList
}

const resetUploadForm = () => {
  uploadFormRef.value?.resetFields()
  uploadForm.files = []
  selectedDataType.value = ''
}

const handleUpload = async () => {
  try {
    await uploadFormRef.value.validate()
    
    if (uploadForm.files.length === 0) {
      ElMessage.warning('Please select files to upload')
      return
    }
    
    uploading.value = true
    
    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('Upload completed successfully!')
    showUploadDialog.value = false
    resetUploadForm()
    
  } catch (error) {
    console.error('Upload failed:', error)
    ElMessage.error('Upload failed')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.primary {
  color: #83a594;
}

.secondary {
  color: #519294;
}

.neutral {
  color: #7f9eb0;
}

.light {
  color: #5da3af;
}

.text-dark {
  color: #58798c;
}

.border-primary {
  border-color: #83a594;
}

.border-secondary {
  border-color: #519294;
}

.border-neutral {
  border-color: #7f9eb0;
}

.border-light {
  border-color: #5da3af;
}

:deep(.el-upload-dragger) {
  border-radius: 8px;
}

:deep(.el-dialog__header) {
  background-color: #f8fafc;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.el-dialog__body) {
  padding: 24px;
}
</style> 