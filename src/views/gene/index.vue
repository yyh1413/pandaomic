<template>
  <div class="container">
    <!-- 左侧容器：展示基因相关信息，包括基本信息、研究动态和药物试验数据 -->
    <div class="left-container">
      <!-- 基因基本信息卡片：展示基因名称、别名和描述等信息 -->
      <div class="module gene-info">
        <div class="gene-title">
          <a href="/gene/TP53/summary" class="gene-name">TP53</a>
          <span class="gene-subtitle">Cellular tumor antigen p53</span>
        </div>
        <div class="gene-synonyms">BCC7, BMFS5, LFS1, P53, TRP53</div>
        <div class="gene-description">
          Acts as a tumor suppressor in many tumor types; induces growth arrest...
          <span class="more-link">more</span>
        </div>

        <div class="link-buttons">
          <a href="http://www.genecards.org/..." class="link-button" target="_blank">
            <span>GeneCards</span>
            <svg class="external-icon" viewBox="0 0 24 24">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </a>
          <!-- 其他外链按钮 -->
        </div>
      </div>

      <!-- 研究动态图表区域：展示研究资助、资金、试验和发表论文的趋势 -->
      <div class="module research-dynamics">
        <h2>Research Dynamics</h2>
        <div class="chart-grid">
          <div class="chart-row">
            <div class="chart-label">Grants</div>
            <div class="chart-area" id="grants-chart"></div>
          </div>
          <div class="chart-row">
            <div class="chart-label">Total Funding</div>
            <div class="chart-area" id="funding-chart"></div>
          </div>
          <div class="chart-row">
            <div class="chart-label">Trials</div>
            <div class="chart-area" id="trials-chart"></div>
          </div>
          <div class="chart-row">
            <div class="chart-label">Publications</div>
            <div class="chart-area" id="publications-chart"></div>
          </div>
        </div>
        <div class="stats">
          <div>Total Grants: <span data-stat="grants">0</span></div>
          <div>Total Funding: <span data-stat="funding">$0</span></div>
          <div>Trials: <span data-stat="trials">0</span></div>
          <div>Publications: <span data-stat="publications">0</span></div>
        </div>
      </div>

      <!-- 药物和临床试验信息区域：展示药物开发阶段和化合物信息 -->
      <div class="module drugs-trials">
        <h2>Drugs and Clinical Trials <span style="color: #ff4444">No data</span></h2>
        <div class="phase-grid">
          <div class="phase-item">Phase I: —</div>
          <div class="phase-item">Phase II: —</div>
          <div class="phase-item">Phase III: —</div>
          <div class="phase-item">Phase IV: —</div>
          <div class="phase-item">No Data: —</div>
        </div>
        <div class="compounds-grid">
          <div>
            <h3>—</h3>
            <p>Unique Compounds</p>
          </div>
          <div>
            <h3>—</h3>
            <p>Small Molecules</p>
          </div>
          <div>
            <h3>—</h3>
            <p>Biologics</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧容器：展示疾病相关信息，包括基本信息、报告生成和指标数据 -->
    <div class="right-container">
      <!-- 疾病基本信息卡片：展示疾病名称、别名和描述 -->
      <div class="module disease-info">
        <h1 class="disease-name">Lung Cancer</h1>
        <div class="disease-synonyms">
          lung neoplasm, alveolar cell carcinoma, nonsmall cell lung cancer...
        </div>
        <div class="disease-description">
          A malignant neoplasm involving the lung.
        </div>
      </div>

      <!-- 生成报告按钮区域：提供生成AI分析报告的功能 -->
      <div class="module generate-report">
        <h2>Generate a Large Language Model-powered Gene-Disease Report relying on the high-quality data from PandaOmics</h2>
        <button class="generate-button">GENERATE</button>
      </div>

      <!-- 注意力分数和趋势指标区域：展示基因在疾病研究中的关注度和发展趋势 -->
      <section class="metrics">
        <div class="attention-score">
          <h3>Attention Score <span>100%</span></h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 100%"></div>
          </div>
          <p>Attention Score is based on the total mentions of a gene in the text data (disease-specific).</p>
        </div>

        <div class="trend">
          <h3>Trend <span>9%</span></h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 9%"></div>
          </div>
          <p>Estimates the growth of attention to the gene given during the last 5-year period (disease-specific).</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {

  mounted() {
    const geneData = {
      gene: {
        id: "TP53",
        fullName: "Cellular tumor antigen p53",
        aliases: ["BCC7", "BMFS5", "LFS1", "P53", "TRP53"],
        description: "Acts as a tumor suppressor in many tumor types; induces growth arrest or apoptosis depending on the physiological circumstances and cell type.",
        externalLinks: [
          { name: "GeneCards", url: "#" },
          { name: "NCBI", url: "#" },
          { name: "Ensembl", url: "#" },
          { name: "UniProt", url: "#" },
          { name: "HUGO", url: "#" }
        ]
      },

      disease: {
        name: "Lung Cancer",
        subtypes: "Lung neoplasm, alveolar cell carcinoma, nonsmall cell lung cancer",
        description: "A malignant neoplasm involving the lung.",
        externalLinks: [
          { name: "EFO", url: "#" }
        ]
      },

      researchDynamics: {
        timePoints: ["2019", "2020", "2021", "2022", "2023"],
        grants: {
          data: [120, 150, 180, 210, 240],
          total: 1796
        },
        funding: {
          data: [50000000, 75000000, 100000000, 150000000, 200000000],
          total: 733559236
        },
        trials: {
          data: [0, 0, 0, 0, 0],
          total: 0
        },
        publications: {
          data: [500, 550, 600, 650, 700],
          total: 2783
        }
      },

      drugsAndTrials: {
        phases: {
          "Phase I": 0,
          "Phase II": 0,
          "Phase III": 0,
          "Phase IV": 0,
          "No Data": 0
        },
        compounds: {
          unique: 0,
          smallMolecules: 0,
          biologics: 0
        }
      },

      metrics: {
        attentionScore: {
          value: 100,
          description: "Attention Score is based on the total mentions of a gene in the text data (disease-specific)."
        },
        trend: {
          value: 9,
          direction: "up",
          description: "Estimates the growth of attention to the gene given during the last 5-year period (disease-specific)."
        }
      },

      tags: [
        { name: "Small molecules", icon: "molecule" },
        { name: "Biologics", icon: "biologics" },
        { name: "Safety", icon: "safety" }
      ]
    };

    // 图表配置
    const chartConfig = {
      type: 'area',
      options: {
        chart: {
          height: 60,
          sparkline: {
            enabled: true
          },
          type: 'area'
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        colors: ['#27ae60']
      }
    };
    // 页面加载完成后初始化图表和数据
    document.addEventListener('DOMContentLoaded', function () {
      // 初始化研究动态相关图表：包括资助、资金、试验和发表论文四个指标
      const metrics = ['grants', 'funding', 'trials', 'publications'];
      metrics.forEach(metric => {
        // 配置图表选项
        const chartOptions = {
          ...chartConfig.options,
          series: [{
            name: metric,
            data: geneData.researchDynamics[metric].data
          }]
        };

        // 为每个指标创建并渲染图表
        new ApexCharts(
          document.querySelector(`#${metric}-chart`),
          chartOptions
        ).render();
      });

      // 更新统计数据：将数据格式化后显示在页面上
      document.querySelectorAll('[data-stat]').forEach(el => {
        const metric = el.dataset.stat;
        el.textContent = geneData.researchDynamics[metric].total.toLocaleString();
      });

      // 更新注意力分数和趋势指标：设置进度条的宽度
      document.querySelector('.attention-score .progress-fill').style.width =
        `${geneData.metrics.attentionScore.value}%`;
      document.querySelector('.trend .progress-fill').style.width =
        `${geneData.metrics.trend.value}%`;
    });
  }
}
</script>

<style scoped>
/* 基础样式设置：设置页面整体字体、边距和背景色 */
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  /* 使用系统默认字体 */
  margin: 0;
  /* 移除默认外边距 */
  padding: 20px;
  /* 设置内边距，使内容不贴边 */
  background: #f5f5f5;
  /* 设置浅灰色背景 */
}

/* 主容器布局：使用flex布局，左右分栏 */
.container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  padding: 20px;
}

/* 左侧容器：基因信息展示区域 */
.left-container {
  width: 50%;
  min-width: 500px;
}

/* 右侧容器：疾病信息展示区域 */
.right-container {
  width: 50%;
  min-width: 500px;
}

/* 每个模块的基础样式 */
.module {
  margin-bottom: 25px;
  width: 100%;
}

.header {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 65% 35%;
  gap: 20px;
}

.tag-section {
  grid-column: 1 / -1;
  margin: 20px 0;
}

.tag-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 20px;
  background: #f0f0f0;
}

.tag i {
  color: #ffd700;
  /* 标签图标颜色 */
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.side-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 基因信息卡片样式 */
.gene-info,
.disease-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 外部链接按钮样式 */
.link-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.link-button {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
}

/* 研究动态图表网格布局 */
.chart-grid {
  display: grid;
  grid-template-rows: repeat(4, 60px);
  gap: 10px;
  margin: 20px 0;
}

.chart-row {
  display: flex;
  align-items: center;
}

.chart-label {
  width: 100px;
  font-size: 14px;
  color: #666;
}

.chart-area {
  flex: 1;
  height: 40px;
  background: linear-gradient(180deg, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0.05) 100%);
  border-radius: 4px;
  overflow: hidden;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

/* 药物和临床试验信息展示区域 */
.drugs-trials {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

/* 临床试验阶段网格布局 */
.phase-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.phase-item {
  text-align: center;
  color: #666;
}

.compounds-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  text-align: center;
}

/* 生成报告按钮区域样式 */
.generate-report {
  background: #27ae60;
  color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
}

.generate-button {
  background: white;
  color: #27ae60;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
}

/* 注意力分数和趋势指标样式 */
.metrics {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.attention-score,
.trend {
  margin-bottom: 20px;
}

.attention-score h3,
.trend h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: #27ae60;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.metrics p {
  margin: 8px 0;
  font-size: 12px;
  color: #666;
}

/* 时间线样式 */
.timeline {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e0e0e0;
}

.timeline-point {
  position: relative;
  background: white;
  padding: 5px;
  z-index: 1;
}

/* 添加新的基因信息样式 */
.gene-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gene-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-decoration: none;
}

.gene-subtitle {
  font-size: 14px;
  color: #666;
}

.gene-synonyms {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.gene-description {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.more-link {
  color: #0066cc;
  cursor: pointer;
}

/* 添加外部链接卡片样式 */
.link-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.link-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  background: white;
}

.external-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* 添加标签组样式 */
.tag-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.tag.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.tag.warning {
  background: #fff3e0;
  color: #f57c00;
}

.check-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>