<template>
  <div class="dataset-container">
    <!-- Steps navigation -->
    <div class="steps-container">
      <div class="step-item" :class="{ active: currentStep === 1 }">
        <span class="step-number">1</span>
        <div class="step-content">
          <div class="step-title">Build up</div>
          <div class="step-subtitle">Sample group</div>
        </div>
      </div>
      <div class="step-item" :class="{ active: currentStep === 2 }">
        <span class="step-number">2</span>
        <div class="step-content">
          <div class="step-title">Compare</div>
          <div class="step-subtitle">Sample groups</div>
        </div>
      </div>
      <div class="step-item" :class="{ active: currentStep === 3 }">
        <span class="step-number">3</span>
        <div class="step-content">
          <div class="step-title">Add Comparisons</div>
          <div class="step-subtitle">to Meta-Analysis</div>
        </div>
      </div>
      <div class="step-item" :class="{ active: currentStep === 4 }">
        <span class="step-number">4</span>
        <div class="step-content">
          <div class="step-title">Go to</div>
          <div class="step-subtitle">Data manager</div>
        </div>
      </div>
      <div class="step-item" :class="{ active: currentStep === 5 }">
        <span class="step-number">5</span>
        <div class="step-content">
          <div class="step-title">Run</div>
          <div class="step-subtitle">Target ID</div>
        </div>
      </div>
    </div>

    <!-- Dataset header with actions -->
    <div class="dataset-header">
      <div class="dataset-title">
        <h1>{{ datasetInfo.id }}</h1>
      </div>
      <div class="dataset-actions">
        <el-button type="text" icon="el-icon-download" @click="handleDownload">DOWNLOAD</el-button>
        <el-button type="text" icon="el-icon-delete" @click="handleRemove">REMOVE FROM DATA MANAGER</el-button>
      </div>
    </div>

    <!-- Dataset information -->
    <div class="dataset-info">
      <div class="dataset-date">{{ datasetInfo.date }}</div>
      <div class="dataset-id">ID: {{ datasetInfo.id }}</div>
      <div class="dataset-description">{{ datasetInfo.description }}</div>

      <div class="dataset-section">
        <div class="section-label">Summary:</div>
        <div class="section-content">
          {{ showFullSummary ? datasetInfo.summary : truncateSummary }}
          <span v-if="!showFullSummary && datasetInfo.summary.length > 100" class="more-link" @click="showFullSummary = true">more</span>
        </div>
      </div>

      <div class="dataset-section">
        <div class="section-label">Overall design:</div>
        <div class="section-content">
          {{ showFullDesign ? datasetInfo.overallDesign : truncateDesign }}
          <span v-if="!showFullDesign && datasetInfo.overallDesign.length > 100" class="more-link" @click="showFullDesign = true">more</span>
        </div>
      </div>

      <div class="dataset-section">
        <div class="section-label">Database:</div>
        <div class="section-content">{{ datasetInfo.database }}</div>
      </div>

      <div class="dataset-section">
        <div class="section-label">OMICS Technology:</div>
        <div class="section-content">
          {{ datasetInfo.omicsTechnology }}
          <i class="el-icon-tickets"></i>
        </div>
      </div>

      <div class="dataset-section">
        <div class="section-label">Platform:</div>
        <div class="section-content">{{ datasetInfo.platform }}</div>
      </div>

      <div class="dataset-section">
        <div class="section-label">Attributes:</div>
        <div class="section-content">{{ datasetInfo.attributes.join(', ') }}</div>
      </div>

      <!-- Dataset statistics -->
      <div class="dataset-stats">
        <div class="stats-item">
          <div class="stats-label">Samples</div>
          <div class="stats-value">{{ datasetStats.samples }}</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">Control</div>
          <div class="stats-value">{{ datasetStats.control }}</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">Genes</div>
          <div class="stats-value">{{ datasetStats.genes }}</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">Species</div>
          <div class="stats-value">{{ datasetStats.species }}</div>
        </div>
      </div>

      <!-- Diseases list -->
      <div class="disease-section">
        <div class="stats-label">Diseases</div>
        <div class="disease-list">{{ datasetStats.diseases.join(', ') }}</div>
      </div>

      <div class="annotation-note">
        <i class="el-icon-info"></i>
        <span>Please check sample annotation with the original dataset attributes.</span>
      </div>
    </div>

    <!-- Sample Groups -->
    <div class="sample-groups-section">
      <div class="section-title">
        <h2>Sample Groups</h2>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleAddSampleGroup"></el-button>
      </div>

      <div class="groups-list">
        <div v-for="(group, index) in sampleGroups" :key="index" class="group-item">
          <div class="group-checkbox">
            <el-checkbox v-model="group.selected"></el-checkbox>
          </div>
          <div class="group-info">
            <div class="group-name">{{ group.name }}</div>
            <div class="group-samples">{{ group.samples }} samples</div>
          </div>
          <div class="group-date">{{ group.date }}</div>
          <div class="group-actions">
            <el-dropdown trigger="click">
              <i class="el-icon-more"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Edit</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparisons -->
    <div class="comparisons-section">
      <div class="section-title">
        <h2>Comparisons</h2>
      </div>

      <div class="comparisons-list">
        <div v-for="(comparison, index) in comparisons" :key="index" class="comparison-item">
          <div class="comparison-container">
            <div class="comparison-header">
              <div class="comparison-title">
                case: {{ comparison.case }}, norm: {{ comparison.norm }}
              </div>
              <div class="comparison-date">Created {{ comparison.createdDate }}</div>
              <div class="comparison-actions-top">
                <el-dropdown trigger="click">
                  <i class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>View Details</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>

            <div class="comparison-content">
              <div class="comparison-groups">
                <div class="comparison-group">
                  <div class="group-type">CASE</div>
                  <div class="group-name">{{ comparison.case }}</div>
                  <div class="group-samples">{{ comparison.caseSamples }} samples</div>
                </div>
                <div class="comparison-group">
                  <div class="group-type">CONTROL</div>
                  <div class="group-name">{{ comparison.norm }}</div>
                  <div class="group-samples">{{ comparison.normSamples }} samples</div>
                </div>
              </div>

              <div class="comparison-status">
                <i class="el-icon-check success"></i>
                <span>Compared</span>
              </div>
            </div>

            <div class="comparison-footer">
              <el-button class="attachment-btn">MANAGE ATTACHMENT</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatasetInfo, getSampleGroups, getComparisons, downloadDataset, removeFromDataManager } from '@/api/dataset'

export default {
  name: 'DatasetView',
  data() {
    return {
      currentStep: 1,
      loading: false,
      showFullSummary: false,
      showFullDesign: false,
      datasetInfo: {
        id: '',
        date: '',
        description: '',
        summary: '',
        overallDesign: '',
        database: '',
        omicsTechnology: '',
        platform: '',
        attributes: []
      },
      datasetStats: {
        samples: 0,
        control: 0,
        genes: 0,
        species: '',
        diseases: []
      },
      sampleGroups: [],
      comparisons: []
    }
  },
  computed: {
    datasetId() {
      return this.$route.query.id || 'GSE203024'
    },
    truncateSummary() {
      return this.datasetInfo.summary.length > 100
        ? this.datasetInfo.summary.substring(0, 100) + '...'
        : this.datasetInfo.summary
    },
    truncateDesign() {
      return this.datasetInfo.overallDesign.length > 100
        ? this.datasetInfo.overallDesign.substring(0, 100) + '...'
        : this.datasetInfo.overallDesign
    }
  },
  created() {
    this.fetchDatasetInfo()
    this.fetchSampleGroups()
    this.fetchComparisons()
  },
  methods: {
    fetchDatasetInfo() {
      this.loading = true
      getDatasetInfo({ datasetId: this.datasetId })
        .then(res => {
          if (res.code === 200) {
            const data = res.data
            this.datasetInfo = {
              id: data.id || 'GSE203024',
              date: data.date || '2024-08-31',
              description: data.description || 'Gene Expression Data from Human Peripheral Blood',
              summary: data.summary || 'Early diagnosis of cancer has been shown to substantially improve 5-year survival rates for many cancer types. With current methodologies early diagnosis has proven difficult for cancers of deep tissues...',
              overallDesign: data.overallDesign || 'A set of 1,013 unique patient blood samples spanning 11 types of cancer or pre-cancer (colorectal polyps) of interest and 1,832 unique control samples, including those with autoimmune and cardiovascul...',
              database: data.database || 'GEO',
              omicsTechnology: data.omicsTechnology || 'Microarray',
              platform: data.platform || 'GPL570',
              attributes: data.attributes || ['Age', 'Gender', 'Disease status', 'Vital status', 'Disease', 'Tissue']
            }

            this.datasetStats = {
              samples: data.stats?.samples || 2845,
              control: data.stats?.control || 0,
              genes: data.stats?.genes || 17856,
              species: data.stats?.species || 'Homo sapiens',
              diseases: data.stats?.diseases || [
                'Pancreatic neoplasm', 'Nasopharyngeal neoplasm', 'Colorectal cancer',
                'Gastric cancer', 'Urinary bladder cancer', 'Kidney cancer',
                'Liver cancer', 'Cervical cancer', 'Malignant testicular germ cell tumor',
                'Breast cancer', 'Ovarian cancer', 'Prostate cancer',
                'Lung cancer', 'Endometrial cancer', 'Polyp of colon'
              ]
            }
          }
        })
        .catch(err => {
          console.error('Failed to fetch dataset info:', err)
          this.$message.error('获取数据集信息失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchSampleGroups() {
      this.sampleGroups = [
        { name: 'Untitled (2)', samples: 2, date: '16 Apr', selected: false },
        { name: 'Untitled', samples: 2, date: '16 Apr', selected: false }
      ]
    },
    fetchComparisons() {
      // getComparisons({ datasetId: this.datasetId })
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.comparisons = res.data?.length ? res.data : [
      //         {
      //           case: 'Untitled (2)',
      //           norm: 'Untitled',
      //           caseSamples: 2,
      //           normSamples: 2,
      //           createdDate: '16 Apr'
      //         }
      //       ]
      //     }
      //   })
      //   .catch(err => {
      //     console.error('Failed to fetch comparisons:', err)
      //     this.$message.error('获取比较列表失败')
      //   })
      this.comparisons = [
        {
          case: 'Untitled (2)',
          norm: 'Untitled',
          caseSamples: 2,
          normSamples: 2,
          createdDate: '16 Apr'
        }
      ]
    },
    handleDownload() {
      this.$message.info('正在准备下载...')
      downloadDataset({ datasetId: this.datasetId })
        .then(res => {
          const blob = new Blob([res])
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${this.datasetInfo.id}.zip`
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch(err => {
          console.error('Failed to download dataset:', err)
          this.$message.error('下载数据集失败')
        })
    },
    handleRemove() {
      this.$confirm('确定从数据管理器中移除该数据集吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeFromDataManager({ datasetId: this.datasetId })
          .then(res => {
            if (res.code === 200) {
              this.$message.success('已成功从数据管理器中移除')
              this.$router.push('/data-manager')
            }
          })
          .catch(err => {
            console.error('Failed to remove from data manager:', err)
            this.$message.error('移除失败')
          })
      }).catch(() => {
        // 取消操作
      })
    },
    handleAddSampleGroup() {
      this.$message.info('添加样本组功能即将上线')
    }
  }
}
</script>

<style scoped>
.dataset-container {

  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
}

.steps-container {
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  margin-right: 50px;
  opacity: 0.5;
  cursor: pointer;
}

.step-item.active {
  opacity: 1;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #a0a0a0;
}

.step-item.active .step-number {
  background-color: #16a085;
  border-color: #16a085;
  color: white;
}

.step-content {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-weight: bold;
}

.dataset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dataset-title h1 {
  margin: 0;
  font-size: 28px;
}

.dataset-info {
  margin-bottom: 30px;
}

.dataset-date,
.dataset-id {
  margin-bottom: 10px;
  color: #666;
}

.dataset-description {
  font-size: 16px;
  margin-bottom: 20px;
}

.dataset-section {
  display: flex;
  margin-bottom: 15px;
}

.section-label {
  font-weight: bold;
  min-width: 140px;
}

.more-link {
  color: #16a085;
  cursor: pointer;
  margin-left: 5px;
}

.dataset-stats {
  display: flex;
  margin: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
}

.stats-item {
  margin-right: 50px;
}

.stats-label {
  color: #666;
  margin-bottom: 5px;
}

.stats-value {
  font-weight: bold;
  font-size: 16px;
}

.disease-section {
  margin-bottom: 20px;
}

.disease-list {
  margin-top: 5px;
}

.annotation-note {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  margin: 20px 0;
}

.annotation-note i {
  margin-right: 5px;
  color: #999;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title h2 {
  margin: 0;
  font-size: 20px;
}

.groups-list,
.comparisons-list {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.group-item,
.comparison-item {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.group-item:last-child,
.comparison-item:last-child {
  border-bottom: none;
}

.group-checkbox {
  margin-right: 20px;
}

.group-info {
  flex: 1;
}

.group-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.group-samples {
  color: #666;
  font-size: 14px;
}

.group-date {
  color: #666;
  margin-right: 20px;
}

.comparison-item {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}

.comparison-item:last-child {
  border-bottom: none;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.comparison-title {
  font-weight: bold;
  font-size: 16px;
}

.comparison-date {
  color: #666;
  font-size: 14px;
}

.comparison-actions-top {
  cursor: pointer;
}

.comparison-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.comparison-groups {
  display: flex;
}

.comparison-group {
  margin-right: 40px;
}

.group-type {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.comparison-status {
  display: flex;
  align-items: center;
}

.comparison-status i.success {
  color: #16a085;
  margin-right: 5px;
}

.comparison-footer {
  display: flex;
  justify-content: flex-end;
}

.attachment-btn {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;
  font-size: 12px;
  padding: 7px 15px;
}
</style>
