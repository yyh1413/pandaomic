<template>
  <div style="display: flex;justify-content: center;">
    <div class="container">
      <h1 class="mb-20">Discover Genes, Diseases, and their associations</h1>
      <div class="search-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input v-model="input_value" @keydown.enter="handleSearchData" type="search" placeholder="Disease, Gene, Dataset, Gene-Disease Association" aria-label="Search biomedical data"
          :disabled="loading">
        <span class="search-clear">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>

        <!-- 搜索结果外框 -->
        <div class="search-results-wrapper" v-loading="loading">
          <div class="results-container">
            <div class="result-column">
              <h2 class="column-title">{{ searchData.diseases.title }}</h2>
              <div class="result-item" v-for="item in searchData.diseases.items" :key="item.name" @click="$router.push('/targeting?id=' + item.id)">
                <div class="result-item-title">{{ item.name }}</div>
                <div class="result-item-description">{{ item.description }}</div>
                <div class="dataset-count">{{ item.datasetCount }}</div>
              </div>
            </div>

            <div class="result-column">
              <h2 class="column-title">{{ searchData.genes.title }}</h2>
              <div class="result-item" v-for="item in searchData.genes.items" :key="item.name">
                <div class="result-item-title">{{ item.name }}</div>
                <div class="result-item-description">{{ item.description }}</div>
              </div>
            </div>

            <div class="result-column">
              <h2 class="column-title">{{ searchData.datasets.title }}</h2>
              <div class="result-item" v-for="item in searchData.datasets.items" :key="item.name">
                <div class="result-item-title">{{ item.name }}</div>
                <div class="dataset-info">
                  <span> {{ item.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    input_value: "lung cancer",
    loading: false,
    searchData: {
      "diseases": {
        "title": "DISEASES",
        "items": [
          // {
          //   "name": "lung cancer",
          //   "description": "lung cancer",
          //   "datasetCount": "1519 Datasets"
          // },
          // {
          //   "name": "non-small cell lung carcinoma",
          //   "description": "non small cell lung cancer nos",
          //   "datasetCount": "927 Datasets"
          // },
          // {
          //   "name": "small cell lung carcinoma",
          //   "description": "small-cell lung cancer",
          //   "datasetCount": "230 Datasets"
          // },
          // {
          //   "name": "squamous cell lung carcinoma",
          //   "description": "squamous cell lung cancer",
          //   "datasetCount": "121 Datasets"
          // },
          // {
          //   "name": "large cell lung carcinoma",
          //   "description": "large cell lung cancer",
          //   "datasetCount": "87 Datasets"
          // },
          // {
          //   "name": "non-small cell squamous lung carcinoma",
          //   "description": "non-small cell squamous lung cancer",
          //   "datasetCount": "32 Datasets"
          // }
        ]
      },
      "genes": {
        "title": "GENES",
        "items": [

        ]
      },
      "datasets": {
        "title": "DATASETS",
        "items": [
          // {
          //   "name": "GSE203024",
          //   "sampleCount": "2845",
          //   "type": "microarray",
          //   "date": "31 Aug 2024"
          // },
          // {
          //   "name": "CCLE-GeneExpression",
          //   "sampleCount": "1406",
          //   "type": "RNA-seq"
          // },
          // {
          //   "name": "GDC-TCGA-LUNG",
          //   "sampleCount": "1129",
          //   "type": "RNA-seq"
          // },
          // {
          //   "name": "GSE111894",
          //   "sampleCount": "1008",
          //   "type": "RNA-seq",
          //   "date": "13 Jun 2019"
          // },
          // {
          //   "name": "GSE85534",
          //   "sampleCount": "906",
          //   "type": "RNA-seq",
          //   "date": "13 Feb 2017"
          // },
          // {
          //   "name": "GSE68950",
          //   "sampleCount": "798",
          //   "type": "microarray",
          //   "date": "16 May 2015"
          // },
          // {
          //   "name": "GSE66499",
          //   "sampleCount": "680",
          //   "type": "microarray",
          //   "date": "17 May 2015"
          // },
          // {
          //   "name": "GDC-TCGA-LUAD",
          //   "sampleCount": "574",
          //   "type": "RNA-seq"
          // }
        ]
      }
    }
  }),
  created() {
    this.handleSearchData()
  },
  methods: {
    handleSearchData() {
      this.loading = true
      console.log(this.input_value);
      const params = {
        "input_value": this.input_value,
        "output_type": "chat",
        "input_type": "text"

      }
      Promise.all([
        this.http.post('http://192.168.0.12:7860/api/v1/run/58009527-df67-44d3-bc3e-a5e743d87930', params),
        this.http.post('http://192.168.0.12:7860/api/v1/run/e4600b8a-fcf3-4313-b16d-f6d0e5873389', params),
        this.http.post('http://192.168.0.12:7860/api/v1/run/d8b0206c-3be7-41a7-87e2-30898b839f56', params),
      ]).then(res => {
        if (res[0]) {
          const result = this.parseApiResponse(res[0])
          // console.log('result', result);

          const item = []
          Object.keys(result).forEach(key => {
            item.push(
              {
                name: key,
                id: result[key][0],
                description: result[key][1]

              }
            )
          })
          this.searchData.diseases.items = item
        }
        if (res[1]) {
          const result = this.parseApiResponse(res[1])
          const item = []
          Object.keys(result).forEach(key => {
            item.push(
              {
                name: key,
                id: result[key][0],
                description: result[key][1]

              }
            )
          })
          this.searchData.genes.items = item
        }
        if (res[2]) {
          const result = this.parseApiResponse(res[2])
          console.log('result', result);

          const item = []
          result.forEach(v => {
            item.push(
              {
                name: v.accession,
                id: v.accession,
                description: v.published

              }
            )
          })
          this.searchData.datasets.items = item
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 244, 247, 0.95) 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰元素 */
body::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(82, 156, 248, 0.05) 0%, rgba(82, 156, 248, 0.02) 50%, transparent 70%);
  transform: rotate(-45deg);
  z-index: -1;
}

body::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(82, 156, 248, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(82, 156, 248, 0.03) 0%, transparent 20%),
    linear-gradient(45deg, rgba(82, 156, 248, 0.01) 0%, transparent 70%);
  z-index: -1;
}

.container {
  width: 100%;
  max-width: 1440px;
  padding: 0 20px;
  text-align: center;
  margin-top: 30px;
  /* 调整到页面上方 */
}

h1 {
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.search-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  color: #529cf8;
}

input[type="search"] {
  width: 100%;
  padding: 22px 22px 22px 55px;
  font-size: 1.1rem;
  border: 2px solid rgba(82, 156, 248, 0.2);
  border-radius: 100px;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(82, 156, 248, 0.1);
}

input[type="search"]::placeholder {
  color: #94a3b8;
}

input[type="search"]:focus {
  border-color: #529cf8;
  box-shadow: 0 4px 25px rgba(82, 156, 248, 0.15);
  background: #ffffff;
}

/* 移除搜索框默认样式 */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}


/* 搜索结果外框样式 */
.search-results-wrapper {
  position: absolute;
  top: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 1800px;
  min-width: 1200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(148, 163, 184, 0.08);
  padding: 32px;
  z-index: 1000;
}

/* 三列布局容器 */
.results-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

/* 确保每列有最小宽度 */
.result-column {
  min-width: 0;
  width: 100%;
}

/* 分类标题 */
.column-title {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
  text-align: left;
  padding-left: 16px;
}

/* 结果项目 */
.result-item {
  text-align: left;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
}

.result-item:hover {
  background: #f8fafc;
}

.result-item:last-child {
  border-bottom: none;
}

/* 主标题样式 */
.result-item-title {
  color: #1e293b;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: left;
  padding-left: 16px;
}

/* 描述文本样式 */
.result-item-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
  padding-left: 16px;
}

/* 数据集计数样式 */
.dataset-count {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-top: 4px;
  text-align: left;
  padding-left: 16px;
}

/* 数据集信息样式 */
.dataset-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  color: #64748b;
  font-size: 0.875rem;
  text-align: left;
  padding-left: 16px;
}

.dataset-info span:not(:first-child)::before {
  content: "•";
  margin: 0 8px;
  color: #cbd5e1;
}

/* 搜索框清除按钮 */
.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background: #f1f5f9;
  color: #64748b;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.search-clear:hover {
  background: #e2e8f0;
  color: #475569;
  opacity: 1;
}

/* 替换 × 符号为 SVG 图标 */
.search-clear svg {
  width: 16px;
  height: 16px;
}

/* 操作按钮样式 */
.action-button {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #529cf8;
  background-color: rgba(82, 156, 248, 0.1);
  margin-top: 8px;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: rgba(82, 156, 248, 0.15);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .search-results-wrapper {
    position: static;
    width: 100%;
    min-width: auto;
    transform: none;
    left: 0;
    margin-top: 16px;
  }

  .results-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .result-column {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 24px;
  }

  .result-column:last-child {
    border-bottom: none;
  }
}
</style>
