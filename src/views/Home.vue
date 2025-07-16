<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-accent/20">
    <div class="container mx-auto px-4 py-20 pb-6">
      <div class="text-center mb-32">
        <h1 class="text-3xl font-bold text-dark mb-12">Multi-Omics Powered Target Discovery</h1>

        <div class="max-w-2xl mx-auto mb-8 relative">
          <div class="relative">
            <input type="text" v-model="searchQuery" @keydown.enter="handleSearch" placeholder="Search Disease, Gene, Dataset, Gene-Disease Association..."
              class="w-full px-6 py-4 pr-12 rounded-full border-2 border-secondary/60 focus:border-secondary focus:bg-[#e8f0fe] outline-none text-lg transition-all duration-200">
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i class="fas fa-search text-lg"></i>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="loading" class="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl mt-2 z-50">
            <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 mx-4 text-center">
              <i class="fas fa-spinner fa-spin text-2xl text-primary"></i>
              <p class="mt-2 text-gray-600">Searching...</p>
            </div>
          </div>

          <!-- Search Results -->
          <div v-if="showSearchResults && !loading" class="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl mt-2 z-50 search-results-container">
            <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 mx-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <!-- Diseases -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-primary text-left pl-3">Diseases</h3>
                  <ul class="space-y-1">
                    <li v-for="disease in searchData.diseases.items" :key="disease.name" @click="navigateToPage('disease', disease.name)"
                      class="text-left p-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors group">
                      <div class="font-medium text-gray-800 group-hover:text-primary">{{ disease.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ disease.description }}</div>
                    </li>
                  </ul>
                </div>

                <!-- Genes -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-secondary text-left pl-3">Genes</h3>
                  <ul class="space-y-1">
                    <li v-for="gene in searchData.genes.items" :key="gene.name" @click="navigateToPage('gene', gene.name)"
                      class="text-left p-3 rounded-lg hover:bg-secondary/5 cursor-pointer transition-colors group">
                      <div class="font-medium text-gray-800 group-hover:text-secondary">{{ gene.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ gene.description }}</div>
                    </li>
                  </ul>
                </div>

                <!-- Datasets -->
                <div>
                  <h3 class="font-bold text-lg mb-4 text-dark text-left pl-3">Datasets</h3>
                  <ul class="space-y-1">
                    <li v-for="dataset in searchData.datasets.items" :key="dataset.name" @click="navigateToPage('dataset', dataset.name)"
                      class="text-left p-3 rounded-lg hover:bg-dark/5 cursor-pointer transition-colors group">
                      <div class="font-medium text-gray-800 text-sm group-hover:text-dark">{{ dataset.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ dataset.description }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-primary mb-4">
            <i class="fas fa-layer-group text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Multi-Omics Integration</h3>
          <p class="text-gray-600">Integrate transcriptomics, proteomics, metabolomics data for comprehensive analysis</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-secondary mb-4">
            <i class="fas fa-microscope text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Omics Analysis</h3>
          <p class="text-gray-600">Multi-dimensional analysis revealing biological mechanisms and pathways</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-neutral mb-4">
            <i class="fas fa-bullseye text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Target Discovery</h3>
          <p class="text-gray-600">AI-powered algorithms to screen and identify potential drug targets</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div class="text-light mb-4">
            <i class="fas fa-chart-bar text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-dark">Visual Reports</h3>
          <p class="text-gray-600">Generate intuitive analysis reports with multi-perspective results</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/utils/http'
import { parseApiResponse } from '@/utils'
const router = useRouter()

// 响应式变量
const searchQuery = ref('')
const showSearchResults = ref(false)
const loading = ref(false)

// 搜索数据结构
const searchData = reactive({
  diseases: {
    items: [
      { name: 'Lung Cancer', description: 'Malignant lung neoplasm' },
      { name: 'Non-small Cell Lung Cancer', description: 'NSCLC, most common type (85%)' },
      { name: 'Small Cell Lung Cancer', description: 'SCLC, aggressive subtype (15%)' }
    ]
  },
  genes: {
    items: [
      { name: 'EGFR', description: 'Epidermal growth factor receptor (15% mutations)' },
      { name: 'KRAS', description: 'Kirsten rat sarcoma viral oncogene (25% mutations)' },
      { name: 'TP53', description: 'Tumor protein p53 (50% mutations)' }
    ]
  },
  datasets: {
    items: [
      { name: 'TCGA-LUAD', description: '515 samples, RNA-seq' },
      { name: 'TCGA-LUSC', description: '501 samples, RNA-seq' },
      { name: 'GSE203024', description: '2845 samples, microarray' }
    ]
  }
})


// 搜索处理函数
const handleSearch = async () => {
  const query = searchQuery.value.trim()

  if (query.length > 0) {
    showSearchResults.value = true
    await fetchData(query)
  } else {
    showSearchResults.value = false
  }
}

// 导航到页面
const navigateToPage = (type, name) => {
  showSearchResults.value = false
  searchQuery.value = ''
  // 根据实际需求添加路由跳转
  // router.push(`/${type}/${encodeURIComponent(name)}`)
}

// 点击外部关闭搜索结果
const handleClickOutside = (e) => {
  const searchContainer = e.target.closest('.relative')
  if (!searchContainer) {
    showSearchResults.value = false
  }
}

// 获取数据的函数 - 改为Vue3写法
const fetchData = async (inputValue = searchQuery.value) => {
  if (!inputValue) return

  loading.value = true

  const params = {
    input_value: inputValue,
    output_type: "chat",
    input_type: "text"
  }

  try {
    // const [diseasesRes, genesRes, datasetsRes] = await Promise.all([
    //   http.post('http://192.168.0.12:7860/api/v1/run/58009527-df67-44d3-bc3e-a5e743d87930', params),
    //   http.post('http://192.168.0.12:7860/api/v1/run/e4600b8a-fcf3-4313-b16d-f6d0e5873389', params),
    //   http.post('http://192.168.0.12:7860/api/v1/run/d8b0206c-3be7-41a7-87e2-30898b839f56', params),
    // ])
    const [diseasesRes, genesRes, datasetsRes] = await Promise.all([
      Promise.resolve({
        "session_id": "58009527-df67-44d3-bc3e-a5e743d87930",
        "outputs": [
          {
            "inputs": {
              "input_value": "lung cancer"
            },
            "outputs": [
              {
                "results": {
                  "message": {
                    "text_key": "text",
                    "data": {
                      "timestamp": "2025-07-14T07:18:45+00:00",
                      "sender": "Machine",
                      "sender_name": "AI",
                      "session_id": "58009527-df67-44d3-bc3e-a5e743d87930",
                      "text": "{\"EGFR-related lung cancer\": [\"EFO_0022194\", \"Lung cancer associated with a mutation in the EGFR gene. Patients with lung cancers with EGFR mutations tend to have minimal to no smoking history.\", [\"epidermal growth factor receptor related lung cancer\", \"EGFR-positive lung cancer\"]], \"Neoplasm of the lung\": [\"HP_0100526\", \"Tumor of the lung.\", [\"Lung cancer\"]], \"adenosquamous lung carcinoma\": [\"EFO_0000233\", \"An aggressive carcinoma with a poor prognosis characterized by a presence of both malignant squamous cells and glandular cells.\", [\"adenosquamous lung cancer\", \"adenosquamous cell lung carcinoma\", \"lung adenosquamous carcinoma\", \"adenosquamous lung carcinoma\"]], \"asbestos-related lung carcinoma\": [\"MONDO_0004295\", \"A carcinoma arising in the lung due to exposure to asbestos.\", [\"asbestos-related lung cancer\", \"asbestos-related lung carcinoma\"]], \"family history of lung cancer\": [\"EFO_0006953\", \"A reported family history of lung cancer in one or more family members.\", [\"family history of lung carcinoma\", \"lung cancer family history\"]], \"lung cancer\": [\"MONDO_0008903\", \"A malignant neoplasm involving the lung.\", [\"lung cancer, protection against\", \"alveolar cell carcinoma\", \"lung neoplasm\", \"Nonsmall cell lung cancer\"]], \"lung cancer cell\": [\"BTO_0000551\", \"Cancer cell of the major organ of respiration the lung.\", [\"lung carcinoma cell\"]], \"lung carcinoma\": [\"EFO_0001071\", \"A carcinoma that arises from epithelial cells of the lung\", [\"lung cancer\", \"cancer of lung\", \"lung cancer, NOS\", \"cancer of the lung\"]], \"lung carcinoma in situ\": [\"MONDO_0004660\", \"A carcinoma in situ involving a lung.\", [\"stage 0 lung cancer aJCC v6 and v7\", \"stage 0 lung cancer\", \"stage 0 lung carcinoma\", \"stage 0 lung cancer aJCC v6\", \"stage 0 lung cancer aJCC v7\", \"carcinoma in situ of lung\", \"lung in situ carcinoma\", \"bronchial carcinoma in situ\"]], \"lung mixed small cell and squamous cell carcinoma\": [\"MONDO_0056806\", \"A squamous cell carcinoma that arises from the lung. It is characterized by the presence of large malignant cells. It includes the clear cell and papillary variants of squamous cell carcinoma.\", [\"squamous non-small cell lung carcinoma\", \"non-small cell squamous lung carcinoma\", \"non-small cell squamous lung cancer\"]], \"lung non-small cell carcinoma\": [\"EFO_0003060\", \"A group of at least three distinct histological types of lung cancer, including non-small cell squamous cell carcinoma, adenocarcinoma, and large cell carcinoma. Non-small cell lung carcinomas have a poor response to conventional chemotherapy.\", [\"non-small cell cancer of the lung\", \"non-small cell lung carcinoma\", \"non-small cell cancer of lung\", \"non-small cell lung cancer\", \"non-small cell carcinoma of lung\", \"non-small cell carcinoma of the lung\", \"non-small cell lung carcinoma (disease)\", \"NSCLC - non-small cell lung cancer\", \"NSCLC\"]]}",
                      "files": [],
                      "error": false,
                      "edit": false,
                      "properties": {
                        "text_color": "",
                        "background_color": "",
                        "edited": false,
                        "source": {
                          "id": "disease_mapping-J4raa",
                          "display_name": "Disease Mapping",
                          "source": "Disease Mapping"
                        },
                        "icon": "code",
                        "allow_markdown": false,
                        "positive_feedback": null,
                        "state": "complete",
                        "targets": []
                      },
                      "category": "message",
                      "content_blocks": [],
                      "id": "f6ef5e10-97f0-4d4d-8a19-62ab9a7ac591",
                      "flow_id": "58009527-df67-44d3-bc3e-a5e743d87930"
                    },
                    "default_value": "",
                    "text": "{\"EGFR-related lung cancer\": [\"EFO_0022194\", \"Lung cancer associated with a mutation in the EGFR gene. Patients with lung cancers with EGFR mutations tend to have minimal to no smoking history.\", [\"epidermal growth factor receptor related lung cancer\", \"EGFR-positive lung cancer\"]], \"Neoplasm of the lung\": [\"HP_0100526\", \"Tumor of the lung.\", [\"Lung cancer\"]], \"adenosquamous lung carcinoma\": [\"EFO_0000233\", \"An aggressive carcinoma with a poor prognosis characterized by a presence of both malignant squamous cells and glandular cells.\", [\"adenosquamous lung cancer\", \"adenosquamous cell lung carcinoma\", \"lung adenosquamous carcinoma\", \"adenosquamous lung carcinoma\"]], \"asbestos-related lung carcinoma\": [\"MONDO_0004295\", \"A carcinoma arising in the lung due to exposure to asbestos.\", [\"asbestos-related lung cancer\", \"asbestos-related lung carcinoma\"]], \"family history of lung cancer\": [\"EFO_0006953\", \"A reported family history of lung cancer in one or more family members.\", [\"family history of lung carcinoma\", \"lung cancer family history\"]], \"lung cancer\": [\"MONDO_0008903\", \"A malignant neoplasm involving the lung.\", [\"lung cancer, protection against\", \"alveolar cell carcinoma\", \"lung neoplasm\", \"Nonsmall cell lung cancer\"]], \"lung cancer cell\": [\"BTO_0000551\", \"Cancer cell of the major organ of respiration the lung.\", [\"lung carcinoma cell\"]], \"lung carcinoma\": [\"EFO_0001071\", \"A carcinoma that arises from epithelial cells of the lung\", [\"lung cancer\", \"cancer of lung\", \"lung cancer, NOS\", \"cancer of the lung\"]], \"lung carcinoma in situ\": [\"MONDO_0004660\", \"A carcinoma in situ involving a lung.\", [\"stage 0 lung cancer aJCC v6 and v7\", \"stage 0 lung cancer\", \"stage 0 lung carcinoma\", \"stage 0 lung cancer aJCC v6\", \"stage 0 lung cancer aJCC v7\", \"carcinoma in situ of lung\", \"lung in situ carcinoma\", \"bronchial carcinoma in situ\"]], \"lung mixed small cell and squamous cell carcinoma\": [\"MONDO_0056806\", \"A squamous cell carcinoma that arises from the lung. It is characterized by the presence of large malignant cells. It includes the clear cell and papillary variants of squamous cell carcinoma.\", [\"squamous non-small cell lung carcinoma\", \"non-small cell squamous lung carcinoma\", \"non-small cell squamous lung cancer\"]], \"lung non-small cell carcinoma\": [\"EFO_0003060\", \"A group of at least three distinct histological types of lung cancer, including non-small cell squamous cell carcinoma, adenocarcinoma, and large cell carcinoma. Non-small cell lung carcinomas have a poor response to conventional chemotherapy.\", [\"non-small cell cancer of the lung\", \"non-small cell lung carcinoma\", \"non-small cell cancer of lung\", \"non-small cell lung cancer\", \"non-small cell carcinoma of lung\", \"non-small cell carcinoma of the lung\", \"non-small cell lung carcinoma (disease)\", \"NSCLC - non-small cell lung cancer\", \"NSCLC\"]]}",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "files": [],
                    "session_id": "58009527-df67-44d3-bc3e-a5e743d87930",
                    "timestamp": "2025-07-14T07:18:45+00:00",
                    "flow_id": "58009527-df67-44d3-bc3e-a5e743d87930",
                    "error": false,
                    "edit": false,
                    "properties": {
                      "text_color": "",
                      "background_color": "",
                      "edited": false,
                      "source": {
                        "id": "disease_mapping-J4raa",
                        "display_name": "Disease Mapping",
                        "source": "Disease Mapping"
                      },
                      "icon": "code",
                      "allow_markdown": false,
                      "positive_feedback": null,
                      "state": "complete",
                      "targets": []
                    },
                    "category": "message",
                    "content_blocks": []
                  }
                },
                "artifacts": {
                  "message": "{\"EGFR-related lung cancer\": [\"EFO_0022194\", \"Lung cancer associated with a mutation in the EGFR gene. Patients with lung cancers with EGFR mutations tend to have minimal to no smoking history.\", [\"epidermal growth factor receptor related lung cancer\", \"EGFR-positive lung cancer\"]], \"Neoplasm of the lung\": [\"HP_0100526\", \"Tumor of the lung.\", [\"Lung cancer\"]], \"adenosquamous lung carcinoma\": [\"EFO_0000233\", \"An aggressive carcinoma with a poor prognosis characterized by a presence of both malignant squamous cells and glandular cells.\", [\"adenosquamous lung cancer\", \"adenosquamous cell lung carcinoma\", \"lung adenosquamous carcinoma\", \"adenosquamous lung carcinoma\"]], \"asbestos-related lung carcinoma\": [\"MONDO_0004295\", \"A carcinoma arising in the lung due to exposure to asbestos.\", [\"asbestos-related lung cancer\", \"asbestos-related lung carcinoma\"]], \"family history of lung cancer\": [\"EFO_0006953\", \"A reported family history of lung cancer in one or more family members.\", [\"family history of lung carcinoma\", \"lung cancer family history\"]], \"lung cancer\": [\"MONDO_0008903\", \"A malignant neoplasm involving the lung.\", [\"lung cancer, protection against\", \"alveolar cell carcinoma\", \"lung neoplasm\", \"Nonsmall cell lung cancer\"]], \"lung cancer cell\": [\"BTO_0000551\", \"Cancer cell of the major organ of respiration the lung.\", [\"lung carcinoma cell\"]], \"lung carcinoma\": [\"EFO_0001071\", \"A carcinoma that arises from epithelial cells of the lung\", [\"lung cancer\", \"cancer of lung\", \"lung cancer, NOS\", \"cancer of the lung\"]], \"lung carcinoma in situ\": [\"MONDO_0004660\", \"A carcinoma in situ involving a lung.\", [\"stage 0 lung cancer aJCC v6 and v7\", \"stage 0 lung cancer\", \"stage 0 lung carcinoma\", \"stage 0 lung cancer aJCC v6\", \"stage 0 lung cancer aJCC v7\", \"carcinoma in situ of lung\", \"lung in situ carcinoma\", \"bronchial carcinoma in situ\"]], \"lung mixed small cell and squamous cell carcinoma\": [\"MONDO_0056806\", \"A squamous cell carcinoma that arises from the lung. It is characterized by the presence of large malignant cells. It includes the clear cell and papillary variants of squamous cell carcinoma.\", [\"squamous non-small cell lung carcinoma\", \"non-small cell squamous lung carcinoma\", \"non-small cell squamous lung cancer\"]], \"lung non-small cell carcinoma\": [\"EFO_0003060\", \"A group of at least three distinct histological types of lung cancer, including non-small cell squamous cell carcinoma, adenocarcinoma, and large cell carcinoma. Non-small cell lung carcinomas have a poor response to conventional chemotherapy.\", [\"non-small cell cancer of the lung\", \"non-small cell lung carcinoma\", \"non-small cell cancer of lung\", \"non-small cell lung cancer\", \"non-small cell carcinoma of lung\", \"non-small cell carcinoma of the lung\", \"non-small cell lung carcinoma (disease)\", \"NSCLC - non-small cell lung cancer\", \"NSCLC\"]]}",
                  "sender": "Machine",
                  "sender_name": "AI",
                  "files": [],
                  "type": "object"
                },
                "outputs": {
                  "message": {
                    "message": "{\"EGFR-related lung cancer\": [\"EFO_0022194\", \"Lung cancer associated with a mutation in the EGFR gene. Patients with lung cancers with EGFR mutations tend to have minimal to no smoking history.\", [\"epidermal growth factor receptor related lung cancer\", \"EGFR-positive lung cancer\"]], \"Neoplasm of the lung\": [\"HP_0100526\", \"Tumor of the lung.\", [\"Lung cancer\"]], \"adenosquamous lung carcinoma\": [\"EFO_0000233\", \"An aggressive carcinoma with a poor prognosis characterized by a presence of both malignant squamous cells and glandular cells.\", [\"adenosquamous lung cancer\", \"adenosquamous cell lung carcinoma\", \"lung adenosquamous carcinoma\", \"adenosquamous lung carcinoma\"]], \"asbestos-related lung carcinoma\": [\"MONDO_0004295\", \"A carcinoma arising in the lung due to exposure to asbestos.\", [\"asbestos-related lung cancer\", \"asbestos-related lung carcinoma\"]], \"family history of lung cancer\": [\"EFO_0006953\", \"A reported family history of lung cancer in one or more family members.\", [\"family history of lung carcinoma\", \"lung cancer family history\"]], \"lung cancer\": [\"MONDO_0008903\", \"A malignant neoplasm involving the lung.\", [\"lung cancer, protection against\", \"alveolar cell carcinoma\", \"lung neoplasm\", \"Nonsmall cell lung cancer\"]], \"lung cancer cell\": [\"BTO_0000551\", \"Cancer cell of the major organ of respiration the lung.\", [\"lung carcinoma cell\"]], \"lung carcinoma\": [\"EFO_0001071\", \"A carcinoma that arises from epithelial cells of the lung\", [\"lung cancer\", \"cancer of lung\", \"lung cancer, NOS\", \"cancer of the lung\"]], \"lung carcinoma in situ\": [\"MONDO_0004660\", \"A carcinoma in situ involving a lung.\", [\"stage 0 lung cancer aJCC v6 and v7\", \"stage 0 lung cancer\", \"stage 0 lung carcinoma\", \"stage 0 lung cancer aJCC v6\", \"stage 0 lung cancer aJCC v7\", \"carcinoma in situ of lung\", \"lung in situ carcinoma\", \"bronchial carcinoma in situ\"]], \"lung mixed small cell and squamous cell carcinoma\": [\"MONDO_0056806\", \"A squamous cell carcinoma that arises from the lung. It is characterized by the presence of large malignant cells. It includes the clear cell and papillary variants of squamous cell carcinoma.\", [\"squamous non-small cell lung carcinoma\", \"non-small cell squamous lung carcinoma\", \"non-small cell squamous lung cancer\"]], \"lung non-small cell carcinoma\": [\"EFO_0003060\", \"A group of at least three distinct histological types of lung cancer, including non-small cell squamous cell carcinoma, adenocarcinoma, and large cell carcinoma. Non-small cell lung carcinomas have a poor response to conventional chemotherapy.\", [\"non-small cell cancer of the lung\", \"non-small cell lung carcinoma\", \"non-small cell cancer of lung\", \"non-small cell lung cancer\", \"non-small cell carcinoma of lung\", \"non-small cell carcinoma of the lung\", \"non-small cell lung carcinoma (disease)\", \"NSCLC - non-small cell lung cancer\", \"NSCLC\"]]}",
                    "type": "text"
                  }
                },
                "logs": {
                  "message": []
                },
                "messages": [
                  {
                    "message": "{\"EGFR-related lung cancer\": [\"EFO_0022194\", \"Lung cancer associated with a mutation in the EGFR gene. Patients with lung cancers with EGFR mutations tend to have minimal to no smoking history.\", [\"epidermal growth factor receptor related lung cancer\", \"EGFR-positive lung cancer\"]], \"Neoplasm of the lung\": [\"HP_0100526\", \"Tumor of the lung.\", [\"Lung cancer\"]], \"adenosquamous lung carcinoma\": [\"EFO_0000233\", \"An aggressive carcinoma with a poor prognosis characterized by a presence of both malignant squamous cells and glandular cells.\", [\"adenosquamous lung cancer\", \"adenosquamous cell lung carcinoma\", \"lung adenosquamous carcinoma\", \"adenosquamous lung carcinoma\"]], \"asbestos-related lung carcinoma\": [\"MONDO_0004295\", \"A carcinoma arising in the lung due to exposure to asbestos.\", [\"asbestos-related lung cancer\", \"asbestos-related lung carcinoma\"]], \"family history of lung cancer\": [\"EFO_0006953\", \"A reported family history of lung cancer in one or more family members.\", [\"family history of lung carcinoma\", \"lung cancer family history\"]], \"lung cancer\": [\"MONDO_0008903\", \"A malignant neoplasm involving the lung.\", [\"lung cancer, protection against\", \"alveolar cell carcinoma\", \"lung neoplasm\", \"Nonsmall cell lung cancer\"]], \"lung cancer cell\": [\"BTO_0000551\", \"Cancer cell of the major organ of respiration the lung.\", [\"lung carcinoma cell\"]], \"lung carcinoma\": [\"EFO_0001071\", \"A carcinoma that arises from epithelial cells of the lung\", [\"lung cancer\", \"cancer of lung\", \"lung cancer, NOS\", \"cancer of the lung\"]], \"lung carcinoma in situ\": [\"MONDO_0004660\", \"A carcinoma in situ involving a lung.\", [\"stage 0 lung cancer aJCC v6 and v7\", \"stage 0 lung cancer\", \"stage 0 lung carcinoma\", \"stage 0 lung cancer aJCC v6\", \"stage 0 lung cancer aJCC v7\", \"carcinoma in situ of lung\", \"lung in situ carcinoma\", \"bronchial carcinoma in situ\"]], \"lung mixed small cell and squamous cell carcinoma\": [\"MONDO_0056806\", \"A squamous cell carcinoma that arises from the lung. It is characterized by the presence of large malignant cells. It includes the clear cell and papillary variants of squamous cell carcinoma.\", [\"squamous non-small cell lung carcinoma\", \"non-small cell squamous lung carcinoma\", \"non-small cell squamous lung cancer\"]], \"lung non-small cell carcinoma\": [\"EFO_0003060\", \"A group of at least three distinct histological types of lung cancer, including non-small cell squamous cell carcinoma, adenocarcinoma, and large cell carcinoma. Non-small cell lung carcinomas have a poor response to conventional chemotherapy.\", [\"non-small cell cancer of the lung\", \"non-small cell lung carcinoma\", \"non-small cell cancer of lung\", \"non-small cell lung cancer\", \"non-small cell carcinoma of lung\", \"non-small cell carcinoma of the lung\", \"non-small cell lung carcinoma (disease)\", \"NSCLC - non-small cell lung cancer\", \"NSCLC\"]]}",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "session_id": "58009527-df67-44d3-bc3e-a5e743d87930",
                    "stream_url": null,
                    "component_id": "ChatOutput-8quPa",
                    "files": [],
                    "type": "text"
                  }
                ],
                "timedelta": null,
                "duration": null,
                "component_display_name": "Chat Output",
                "component_id": "ChatOutput-8quPa",
                "used_frozen_result": false
              }
            ]
          }
        ]
      }),
      Promise.resolve({
        "session_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389",
        "outputs": [
          {
            "inputs": {
              "input_value": "lung cancer"
            },
            "outputs": [
              {
                "results": {
                  "message": {
                    "text_key": "text",
                    "data": {
                      "timestamp": "2025-07-14T07:18:53+00:00",
                      "sender": "Machine",
                      "sender_name": "AI",
                      "session_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389",
                      "text": "{\"CSNK1A1\": [\"1452\", \"down-regulated in lung cancer\"], \"MYCL\": [\"4610\", \"myc-related gene from lung cancer\"], \"RIMS2\": [\"9699\", \"non-small cell lung cancer RimL3a protein\"], \"RBM6\": [\"10180\", \"lung cancer antigen NY-LU-12\"], \"MAEA\": [\"10296\", \"human lung cancer oncogene 10 protein\"], \"SLC4A1AP\": [\"22950\", \"human lung cancer oncogene 3 protein\"], \"PHF20L1\": [\"51105\", \"up-regulated in lung cancer 1\"], \"C11orf71\": [\"54494\", \"up-regulated in lung cancer 7\"], \"LY6K\": [\"54742\", \"up-regulated in lung cancer 10\"], \"MTNAP1\": [\"55028\", \"human lung cancer oncogene 8 protein\"], \"HJURP\": [\"55355\", \"up-regulated in lung cancer 9\"], \"TRMU\": [\"55687\", \"lung cancer associated lncRNA 3\"], \"LCAL1\": [\"80078\", \"lung cancer associated lncRNA 1\"], \"HOPX\": [\"84525\", \"lung cancer-associated Y protein\"], \"CIMIP1\": [\"128602\", \"low in lung cancer 1\"], \"C1orf74\": [\"148304\", \"up-regulated in lung cancer 4\"], \"SLC38A9\": [\"153129\", \"up-regulated in lung cancer 11\"], \"CT83\": [\"203413\", \"kita-kyushu lung cancer antigen 1\"], \"UQCC4\": [\"283951\", \"up-regulated in lung cancer 5\"], \"TUSC2P1\": [\"359794\", \"lung cancer candidate FUS1 pseudogene\"], \"LINC00511\": [\"400619\", \"lung cancer associated lncRNA 5\"], \"LNCR1\": [\"450093\", \"Lung cancer 1\"], \"LCIIAR\": [\"100130111\", \"lung cancer immune cell infiltration associated lncRNA\"], \"CLUHP3\": [\"100132341\", \"up-regulated in lung cancer 3\"], \"LNCR3\": [\"100271687\", \"Lung cancer susceptibility 3\"], \"LNCR4\": [\"100271693\", \"Lung cancer susceptibility 4\"], \"LINC00673\": [\"100499467\", \"lung cancer intergenic RNA 1\"], \"LUCAT1\": [\"100505994\", \"lung cancer associated transcript 1\"], \"LNCR5\": [\"100682395\", \"Lung cancer susceptibility 5\"], \"IKBKB-DT\": [\"101929897\", \"amplified lncRNA associated with lung cancer-1\"], \"LINC01614\": [\"105373869\", \"lung cancer associated lncRNA 4\"], \"LOC112694756\": [\"112694756\", \"Lung cancer antigen NY-LU-1\"], \"RCC2-AS1\": [\"114515514\", \"lung cancer progression-association transcript 1\"], \"THBS1-IT1\": [\"118597829\", \"TGFbeta Upregulated lncRNA in Lung Cancer\"]}",
                      "files": [],
                      "error": false,
                      "edit": false,
                      "properties": {
                        "text_color": "",
                        "background_color": "",
                        "edited": false,
                        "source": {
                          "id": "GeneMappingComponent-0RssU",
                          "display_name": "Gene Mapping",
                          "source": "Gene Mapping"
                        },
                        "icon": "dna",
                        "allow_markdown": false,
                        "positive_feedback": null,
                        "state": "complete",
                        "targets": []
                      },
                      "category": "message",
                      "content_blocks": [],
                      "id": "953cb77a-5955-4266-b8b8-ce496c12e670",
                      "flow_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389"
                    },
                    "default_value": "",
                    "text": "{\"CSNK1A1\": [\"1452\", \"down-regulated in lung cancer\"], \"MYCL\": [\"4610\", \"myc-related gene from lung cancer\"], \"RIMS2\": [\"9699\", \"non-small cell lung cancer RimL3a protein\"], \"RBM6\": [\"10180\", \"lung cancer antigen NY-LU-12\"], \"MAEA\": [\"10296\", \"human lung cancer oncogene 10 protein\"], \"SLC4A1AP\": [\"22950\", \"human lung cancer oncogene 3 protein\"], \"PHF20L1\": [\"51105\", \"up-regulated in lung cancer 1\"], \"C11orf71\": [\"54494\", \"up-regulated in lung cancer 7\"], \"LY6K\": [\"54742\", \"up-regulated in lung cancer 10\"], \"MTNAP1\": [\"55028\", \"human lung cancer oncogene 8 protein\"], \"HJURP\": [\"55355\", \"up-regulated in lung cancer 9\"], \"TRMU\": [\"55687\", \"lung cancer associated lncRNA 3\"], \"LCAL1\": [\"80078\", \"lung cancer associated lncRNA 1\"], \"HOPX\": [\"84525\", \"lung cancer-associated Y protein\"], \"CIMIP1\": [\"128602\", \"low in lung cancer 1\"], \"C1orf74\": [\"148304\", \"up-regulated in lung cancer 4\"], \"SLC38A9\": [\"153129\", \"up-regulated in lung cancer 11\"], \"CT83\": [\"203413\", \"kita-kyushu lung cancer antigen 1\"], \"UQCC4\": [\"283951\", \"up-regulated in lung cancer 5\"], \"TUSC2P1\": [\"359794\", \"lung cancer candidate FUS1 pseudogene\"], \"LINC00511\": [\"400619\", \"lung cancer associated lncRNA 5\"], \"LNCR1\": [\"450093\", \"Lung cancer 1\"], \"LCIIAR\": [\"100130111\", \"lung cancer immune cell infiltration associated lncRNA\"], \"CLUHP3\": [\"100132341\", \"up-regulated in lung cancer 3\"], \"LNCR3\": [\"100271687\", \"Lung cancer susceptibility 3\"], \"LNCR4\": [\"100271693\", \"Lung cancer susceptibility 4\"], \"LINC00673\": [\"100499467\", \"lung cancer intergenic RNA 1\"], \"LUCAT1\": [\"100505994\", \"lung cancer associated transcript 1\"], \"LNCR5\": [\"100682395\", \"Lung cancer susceptibility 5\"], \"IKBKB-DT\": [\"101929897\", \"amplified lncRNA associated with lung cancer-1\"], \"LINC01614\": [\"105373869\", \"lung cancer associated lncRNA 4\"], \"LOC112694756\": [\"112694756\", \"Lung cancer antigen NY-LU-1\"], \"RCC2-AS1\": [\"114515514\", \"lung cancer progression-association transcript 1\"], \"THBS1-IT1\": [\"118597829\", \"TGFbeta Upregulated lncRNA in Lung Cancer\"]}",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "files": [],
                    "session_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389",
                    "timestamp": "2025-07-14T07:18:53+00:00",
                    "flow_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389",
                    "error": false,
                    "edit": false,
                    "properties": {
                      "text_color": "",
                      "background_color": "",
                      "edited": false,
                      "source": {
                        "id": "GeneMappingComponent-0RssU",
                        "display_name": "Gene Mapping",
                        "source": "Gene Mapping"
                      },
                      "icon": "dna",
                      "allow_markdown": false,
                      "positive_feedback": null,
                      "state": "complete",
                      "targets": []
                    },
                    "category": "message",
                    "content_blocks": []
                  }
                },
                "artifacts": {
                  "message": "{\"CSNK1A1\": [\"1452\", \"down-regulated in lung cancer\"], \"MYCL\": [\"4610\", \"myc-related gene from lung cancer\"], \"RIMS2\": [\"9699\", \"non-small cell lung cancer RimL3a protein\"], \"RBM6\": [\"10180\", \"lung cancer antigen NY-LU-12\"], \"MAEA\": [\"10296\", \"human lung cancer oncogene 10 protein\"], \"SLC4A1AP\": [\"22950\", \"human lung cancer oncogene 3 protein\"], \"PHF20L1\": [\"51105\", \"up-regulated in lung cancer 1\"], \"C11orf71\": [\"54494\", \"up-regulated in lung cancer 7\"], \"LY6K\": [\"54742\", \"up-regulated in lung cancer 10\"], \"MTNAP1\": [\"55028\", \"human lung cancer oncogene 8 protein\"], \"HJURP\": [\"55355\", \"up-regulated in lung cancer 9\"], \"TRMU\": [\"55687\", \"lung cancer associated lncRNA 3\"], \"LCAL1\": [\"80078\", \"lung cancer associated lncRNA 1\"], \"HOPX\": [\"84525\", \"lung cancer-associated Y protein\"], \"CIMIP1\": [\"128602\", \"low in lung cancer 1\"], \"C1orf74\": [\"148304\", \"up-regulated in lung cancer 4\"], \"SLC38A9\": [\"153129\", \"up-regulated in lung cancer 11\"], \"CT83\": [\"203413\", \"kita-kyushu lung cancer antigen 1\"], \"UQCC4\": [\"283951\", \"up-regulated in lung cancer 5\"], \"TUSC2P1\": [\"359794\", \"lung cancer candidate FUS1 pseudogene\"], \"LINC00511\": [\"400619\", \"lung cancer associated lncRNA 5\"], \"LNCR1\": [\"450093\", \"Lung cancer 1\"], \"LCIIAR\": [\"100130111\", \"lung cancer immune cell infiltration associated lncRNA\"], \"CLUHP3\": [\"100132341\", \"up-regulated in lung cancer 3\"], \"LNCR3\": [\"100271687\", \"Lung cancer susceptibility 3\"], \"LNCR4\": [\"100271693\", \"Lung cancer susceptibility 4\"], \"LINC00673\": [\"100499467\", \"lung cancer intergenic RNA 1\"], \"LUCAT1\": [\"100505994\", \"lung cancer associated transcript 1\"], \"LNCR5\": [\"100682395\", \"Lung cancer susceptibility 5\"], \"IKBKB-DT\": [\"101929897\", \"amplified lncRNA associated with lung cancer-1\"], \"LINC01614\": [\"105373869\", \"lung cancer associated lncRNA 4\"], \"LOC112694756\": [\"112694756\", \"Lung cancer antigen NY-LU-1\"], \"RCC2-AS1\": [\"114515514\", \"lung cancer progression-association transcript 1\"], \"THBS1-IT1\": [\"118597829\", \"TGFbeta Upregulated lncRNA in Lung Cancer\"]}",
                  "sender": "Machine",
                  "sender_name": "AI",
                  "files": [],
                  "type": "object"
                },
                "outputs": {
                  "message": {
                    "message": "{\"CSNK1A1\": [\"1452\", \"down-regulated in lung cancer\"], \"MYCL\": [\"4610\", \"myc-related gene from lung cancer\"], \"RIMS2\": [\"9699\", \"non-small cell lung cancer RimL3a protein\"], \"RBM6\": [\"10180\", \"lung cancer antigen NY-LU-12\"], \"MAEA\": [\"10296\", \"human lung cancer oncogene 10 protein\"], \"SLC4A1AP\": [\"22950\", \"human lung cancer oncogene 3 protein\"], \"PHF20L1\": [\"51105\", \"up-regulated in lung cancer 1\"], \"C11orf71\": [\"54494\", \"up-regulated in lung cancer 7\"], \"LY6K\": [\"54742\", \"up-regulated in lung cancer 10\"], \"MTNAP1\": [\"55028\", \"human lung cancer oncogene 8 protein\"], \"HJURP\": [\"55355\", \"up-regulated in lung cancer 9\"], \"TRMU\": [\"55687\", \"lung cancer associated lncRNA 3\"], \"LCAL1\": [\"80078\", \"lung cancer associated lncRNA 1\"], \"HOPX\": [\"84525\", \"lung cancer-associated Y protein\"], \"CIMIP1\": [\"128602\", \"low in lung cancer 1\"], \"C1orf74\": [\"148304\", \"up-regulated in lung cancer 4\"], \"SLC38A9\": [\"153129\", \"up-regulated in lung cancer 11\"], \"CT83\": [\"203413\", \"kita-kyushu lung cancer antigen 1\"], \"UQCC4\": [\"283951\", \"up-regulated in lung cancer 5\"], \"TUSC2P1\": [\"359794\", \"lung cancer candidate FUS1 pseudogene\"], \"LINC00511\": [\"400619\", \"lung cancer associated lncRNA 5\"], \"LNCR1\": [\"450093\", \"Lung cancer 1\"], \"LCIIAR\": [\"100130111\", \"lung cancer immune cell infiltration associated lncRNA\"], \"CLUHP3\": [\"100132341\", \"up-regulated in lung cancer 3\"], \"LNCR3\": [\"100271687\", \"Lung cancer susceptibility 3\"], \"LNCR4\": [\"100271693\", \"Lung cancer susceptibility 4\"], \"LINC00673\": [\"100499467\", \"lung cancer intergenic RNA 1\"], \"LUCAT1\": [\"100505994\", \"lung cancer associated transcript 1\"], \"LNCR5\": [\"100682395\", \"Lung cancer susceptibility 5\"], \"IKBKB-DT\": [\"101929897\", \"amplified lncRNA associated with lung cancer-1\"], \"LINC01614\": [\"105373869\", \"lung cancer associated lncRNA 4\"], \"LOC112694756\": [\"112694756\", \"Lung cancer antigen NY-LU-1\"], \"RCC2-AS1\": [\"114515514\", \"lung cancer progression-association transcript 1\"], \"THBS1-IT1\": [\"118597829\", \"TGFbeta Upregulated lncRNA in Lung Cancer\"]}",
                    "type": "text"
                  }
                },
                "logs": {
                  "message": []
                },
                "messages": [
                  {
                    "message": "{\"CSNK1A1\": [\"1452\", \"down-regulated in lung cancer\"], \"MYCL\": [\"4610\", \"myc-related gene from lung cancer\"], \"RIMS2\": [\"9699\", \"non-small cell lung cancer RimL3a protein\"], \"RBM6\": [\"10180\", \"lung cancer antigen NY-LU-12\"], \"MAEA\": [\"10296\", \"human lung cancer oncogene 10 protein\"], \"SLC4A1AP\": [\"22950\", \"human lung cancer oncogene 3 protein\"], \"PHF20L1\": [\"51105\", \"up-regulated in lung cancer 1\"], \"C11orf71\": [\"54494\", \"up-regulated in lung cancer 7\"], \"LY6K\": [\"54742\", \"up-regulated in lung cancer 10\"], \"MTNAP1\": [\"55028\", \"human lung cancer oncogene 8 protein\"], \"HJURP\": [\"55355\", \"up-regulated in lung cancer 9\"], \"TRMU\": [\"55687\", \"lung cancer associated lncRNA 3\"], \"LCAL1\": [\"80078\", \"lung cancer associated lncRNA 1\"], \"HOPX\": [\"84525\", \"lung cancer-associated Y protein\"], \"CIMIP1\": [\"128602\", \"low in lung cancer 1\"], \"C1orf74\": [\"148304\", \"up-regulated in lung cancer 4\"], \"SLC38A9\": [\"153129\", \"up-regulated in lung cancer 11\"], \"CT83\": [\"203413\", \"kita-kyushu lung cancer antigen 1\"], \"UQCC4\": [\"283951\", \"up-regulated in lung cancer 5\"], \"TUSC2P1\": [\"359794\", \"lung cancer candidate FUS1 pseudogene\"], \"LINC00511\": [\"400619\", \"lung cancer associated lncRNA 5\"], \"LNCR1\": [\"450093\", \"Lung cancer 1\"], \"LCIIAR\": [\"100130111\", \"lung cancer immune cell infiltration associated lncRNA\"], \"CLUHP3\": [\"100132341\", \"up-regulated in lung cancer 3\"], \"LNCR3\": [\"100271687\", \"Lung cancer susceptibility 3\"], \"LNCR4\": [\"100271693\", \"Lung cancer susceptibility 4\"], \"LINC00673\": [\"100499467\", \"lung cancer intergenic RNA 1\"], \"LUCAT1\": [\"100505994\", \"lung cancer associated transcript 1\"], \"LNCR5\": [\"100682395\", \"Lung cancer susceptibility 5\"], \"IKBKB-DT\": [\"101929897\", \"amplified lncRNA associated with lung cancer-1\"], \"LINC01614\": [\"105373869\", \"lung cancer associated lncRNA 4\"], \"LOC112694756\": [\"112694756\", \"Lung cancer antigen NY-LU-1\"], \"RCC2-AS1\": [\"114515514\", \"lung cancer progression-association transcript 1\"], \"THBS1-IT1\": [\"118597829\", \"TGFbeta Upregulated lncRNA in Lung Cancer\"]}",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "session_id": "e4600b8a-fcf3-4313-b16d-f6d0e5873389",
                    "stream_url": null,
                    "component_id": "ChatOutput-dlWCA",
                    "files": [],
                    "type": "text"
                  }
                ],
                "timedelta": null,
                "duration": null,
                "component_display_name": "Chat Output",
                "component_id": "ChatOutput-dlWCA",
                "used_frozen_result": false
              }
            ]
          }
        ]
      }),
      Promise.resolve({
        "session_id": "d8b0206c-3be7-41a7-87e2-30898b839f56",
        "outputs": [
          {
            "inputs": {
              "input_value": "lung cancer"
            },
            "outputs": [
              {
                "results": {
                  "message": {
                    "text_key": "text",
                    "data": {
                      "timestamp": "2025-07-14T07:18:18+00:00",
                      "sender": "Machine",
                      "sender_name": "AI",
                      "session_id": "d8b0206c-3be7-41a7-87e2-30898b839f56",
                      "text": "[{\"accession\": \"GSE282795\", \"samples\": 18, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE282794\", \"samples\": 6, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE302412\", \"samples\": 7, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/11\"}, {\"accession\": \"GSE302284\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297361\", \"samples\": 36, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297360\", \"samples\": 14, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297358\", \"samples\": 29, \"technology\": [\"Genome binding/occupancy profiling by high throughput sequencing\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE301822\", \"samples\": 72, \"technology\": [\"Other\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE295073\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE293018\", \"samples\": 7, \"technology\": [\"RNA-seq\", \" Other\"], \"published\": \"2025/07/09\"}]",
                      "files": [],
                      "error": false,
                      "edit": false,
                      "properties": {
                        "text_color": "",
                        "background_color": "",
                        "edited": false,
                        "source": {
                          "id": "CustomComponent-RXTBh",
                          "display_name": "Custom Component",
                          "source": "Custom Component"
                        },
                        "icon": "code",
                        "allow_markdown": false,
                        "positive_feedback": null,
                        "state": "complete",
                        "targets": []
                      },
                      "category": "message",
                      "content_blocks": [],
                      "id": "6898ce90-e7a9-4563-8627-463d8921ce5e",
                      "flow_id": "d8b0206c-3be7-41a7-87e2-30898b839f56"
                    },
                    "default_value": "",
                    "text": "[{\"accession\": \"GSE282795\", \"samples\": 18, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE282794\", \"samples\": 6, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE302412\", \"samples\": 7, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/11\"}, {\"accession\": \"GSE302284\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297361\", \"samples\": 36, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297360\", \"samples\": 14, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297358\", \"samples\": 29, \"technology\": [\"Genome binding/occupancy profiling by high throughput sequencing\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE301822\", \"samples\": 72, \"technology\": [\"Other\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE295073\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE293018\", \"samples\": 7, \"technology\": [\"RNA-seq\", \" Other\"], \"published\": \"2025/07/09\"}]",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "files": [],
                    "session_id": "d8b0206c-3be7-41a7-87e2-30898b839f56",
                    "timestamp": "2025-07-14T07:18:18+00:00",
                    "flow_id": "d8b0206c-3be7-41a7-87e2-30898b839f56",
                    "error": false,
                    "edit": false,
                    "properties": {
                      "text_color": "",
                      "background_color": "",
                      "edited": false,
                      "source": {
                        "id": "CustomComponent-RXTBh",
                        "display_name": "Custom Component",
                        "source": "Custom Component"
                      },
                      "icon": "code",
                      "allow_markdown": false,
                      "positive_feedback": null,
                      "state": "complete",
                      "targets": []
                    },
                    "category": "message",
                    "content_blocks": []
                  }
                },
                "artifacts": {
                  "message": "[{\"accession\": \"GSE282795\", \"samples\": 18, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE282794\", \"samples\": 6, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE302412\", \"samples\": 7, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/11\"}, {\"accession\": \"GSE302284\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297361\", \"samples\": 36, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297360\", \"samples\": 14, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297358\", \"samples\": 29, \"technology\": [\"Genome binding/occupancy profiling by high throughput sequencing\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE301822\", \"samples\": 72, \"technology\": [\"Other\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE295073\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE293018\", \"samples\": 7, \"technology\": [\"RNA-seq\", \" Other\"], \"published\": \"2025/07/09\"}]",
                  "sender": "Machine",
                  "sender_name": "AI",
                  "files": [],
                  "type": "object"
                },
                "outputs": {
                  "message": {
                    "message": "[{\"accession\": \"GSE282795\", \"samples\": 18, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE282794\", \"samples\": 6, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE302412\", \"samples\": 7, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/11\"}, {\"accession\": \"GSE302284\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297361\", \"samples\": 36, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297360\", \"samples\": 14, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297358\", \"samples\": 29, \"technology\": [\"Genome binding/occupancy profiling by high throughput sequencing\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE301822\", \"samples\": 72, \"technology\": [\"Other\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE295073\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE293018\", \"samples\": 7, \"technology\": [\"RNA-seq\", \" Other\"], \"published\": \"2025/07/09\"}]",
                    "type": "text"
                  }
                },
                "logs": {
                  "message": []
                },
                "messages": [
                  {
                    "message": "[{\"accession\": \"GSE282795\", \"samples\": 18, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE282794\", \"samples\": 6, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/13\"}, {\"accession\": \"GSE302412\", \"samples\": 7, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/11\"}, {\"accession\": \"GSE302284\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297361\", \"samples\": 36, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297360\", \"samples\": 14, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE297358\", \"samples\": 29, \"technology\": [\"Genome binding/occupancy profiling by high throughput sequencing\"], \"published\": \"2025/07/10\"}, {\"accession\": \"GSE301822\", \"samples\": 72, \"technology\": [\"Other\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE295073\", \"samples\": 2, \"technology\": [\"RNA-seq\"], \"published\": \"2025/07/09\"}, {\"accession\": \"GSE293018\", \"samples\": 7, \"technology\": [\"RNA-seq\", \" Other\"], \"published\": \"2025/07/09\"}]",
                    "sender": "Machine",
                    "sender_name": "AI",
                    "session_id": "d8b0206c-3be7-41a7-87e2-30898b839f56",
                    "stream_url": null,
                    "component_id": "ChatOutput-FNzGc",
                    "files": [],
                    "type": "text"
                  }
                ],
                "timedelta": null,
                "duration": null,
                "component_display_name": "Chat Output",
                "component_id": "ChatOutput-FNzGc",
                "used_frozen_result": false
              }
            ]
          }
        ]
      }),
    ])


    // 处理疾病数据
    if (diseasesRes.result) {
      const result = parseApiResponse(diseasesRes.result)
      const items = []
      Object.keys(result).forEach(key => {
        items.push({
          name: key,
          id: result[key][0],
          description: result[key][1]
        })
      })
      searchData.diseases.items = items
    }

    // 处理基因数据
    if (genesRes.result) {
      const result = parseApiResponse(genesRes.result)
      const items = []
      Object.keys(result).forEach(key => {
        items.push({
          name: key,
          id: result[key][0],
          description: result[key][1]
        })
      })
      searchData.genes.items = items
    }

    // 处理数据集数据
    if (datasetsRes.result) {
      const result = parseApiResponse(datasetsRes.result)
      const items = []
      if (Array.isArray(result)) {
        result.forEach(v => {
          items.push({
            name: v.accession,
            id: v.accession,
            description: v.published
          })
        })
      }
      searchData.datasets.items = items
    }

  } catch (error) {
    console.error('Error fetching search data:', error)
  } finally {
    loading.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 搜索结果面板响应式设计 */
.search-results-container {
  width: max(100vw - 2rem, 800px);
  max-width: 1200px;
}

@media (max-width: 768px) {
  .search-results-container {
    width: calc(100vw - 1rem);
    left: 0.5rem;
    transform: none;
  }
}

/* 动画效果 */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 搜索结果面板动画 */
.search-results-container {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>