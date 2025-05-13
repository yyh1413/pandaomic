<template>
  <div class="container">
    <!-- 疾病标题和描述 -->
    <div class="card full-width">
      <h1 class="disease-title">Lung Cancer</h1>
      <p class="disease-description">A malignant neoplasm involving the lung.</p>
    </div>

    <div class="content-wrapper">
      <div class="left-container">
        <!-- 研究动态区域 -->
        <div class="card research-dynamics">
          <div class="research-dynamics-header">
            <h2>Research Dynamics</h2>
            <a href="#" class="view-all">VIEW ALL ›</a>
          </div>

          <div class="charts-container">
            <div class="chart-row">
              <div class="chart-label">Grants</div>
              <div class="chart-container" id="grants-chart"></div>
            </div>
            <div class="chart-row">
              <div class="chart-label">Total Funding</div>
              <div class="chart-container" id="funding-chart"></div>
            </div>
            <div class="chart-row">
              <div class="chart-label">Trials</div>
              <div class="chart-container" id="trials-chart"></div>
            </div>
            <div class="chart-row">
              <div class="chart-label">Publications</div>
              <div class="chart-container" id="publications-chart"></div>
            </div>
          </div>

          <div class="stats-summary">
            <div class="stat-item">
              <span class="stat-label">Grants:</span>
              <span class="stat-value">33,237</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Funding:</span>
              <span class="stat-value">$14,028,879,097</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Trials:</span>
              <span class="stat-value">5,609</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Publications:</span>
              <span class="stat-value">118,566</span>
            </div>
          </div>
        </div>

        <!-- 新增注意力分数卡片 -->
        <div class="card">
          <section class="metrics">
            <div class="attention-score">
              <h3>Attention Score <span>100%</span></h3>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 100%"></div>
              </div>
              <p>Attention Score is based on the total mentions of a disease in the text data.</p>
            </div>

            <div class="trend">
              <h3>Trend <span>5%</span></h3>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 5%"></div>
              </div>
              <p>Estimates the growth of attention to the disease given during the last 5-year period.</p>
            </div>
          </section>
        </div>

        <!-- 新增药物和临床试验卡片 -->
        <div class="card drugs-trials">
          <div class="drugs-trials-header">
            <h2>Drugs and Clinical Trials</h2>
            <a href="#" class="view-all">VIEW ALL ›</a>
          </div>

          <div class="phase-bar">
            <div class="phase phase-1" style="width: 15%" title="Phase I: 2578"></div>
            <div class="phase phase-2" style="width: 45%" title="Phase II: 7872"></div>
            <div class="phase phase-3" style="width: 30%" title="Phase III: 3366"></div>
            <div class="phase phase-4" style="width: 10%" title="Phase IV: 856"></div>
            <div class="phase phase-no-data" style="width: 0%" title="No Data: 0"></div>
          </div>

          <div class="phase-legend">
            <div class="legend-item" data-phase="1">
              <div class="legend-dot phase-1"></div>
              Phase I: 2578
            </div>
            <div class="legend-item" data-phase="2">
              <div class="legend-dot phase-2"></div>
              Phase II: 7872
            </div>
            <div class="legend-item" data-phase="3">
              <div class="legend-dot phase-3"></div>
              Phase III: 3366
            </div>
            <div class="legend-item" data-phase="4">
              <div class="legend-dot phase-4"></div>
              Phase IV: 856
            </div>
            <div class="legend-item" data-phase="no-data">
              <div class="legend-dot phase-no-data"></div>
              No Data: 0
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-number unique-compounds">692</div>
              <div class="stat-label">Unique Compounds</div>
            </div>
            <div class="stat-box">
              <div class="stat-number small-molecules">508</div>
              <div class="stat-label">Small Molecules</div>
            </div>
            <div class="stat-box">
              <div class="stat-number biologics">184</div>
              <div class="stat-label">Biologics</div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-container">
        <!-- LLM生成的基因-疾病报告 -->
        <div class="llm-report">
          <h2>LLM-generated Gene-Disease Report</h2>
          <div class="report-items">
            <div class="report-item">
              <a href="#">TP53 in lung cancer</a>
              <span>21 Apr 2025</span>
            </div>
            <div class="report-item">
              <a href="#">STAT1 in lung cancer (1)</a>
              <span>16 Apr 2025</span>
            </div>
            <div class="report-item">
              <a href="#">STAT1 in lung cancer</a>
              <span>16 Apr 2025</span>
            </div>
          </div>
        </div>

        <!-- 元分析数据 -->
        <div class="card meta-analysis">
          <h2>Meta-Analysis for lung cancer</h2>
          <p>This meta-analysis includes manually selected and curated omics datasets.</p>
          <p>It is supplied as a part of PandaOmics software</p>

          <div class="dataset-stats">
            <div class="dataset-type">
              <div class="dataset-number">30</div>
              <div class="dataset-label">Datasets</div>
            </div>
            <div class="dataset-type">
              <div class="dataset-number">31</div>
              <div class="dataset-label">Comparisons</div>
            </div>
            <div class="dataset-type">
              <div class="dataset-number">4361</div>
              <div class="dataset-label">Samples</div>
            </div>
          </div>

          <div class="data-types-grid">
            <div class="data-type-item">
              <div class="data-type-icon">📊</div>
              <h4>RNA-seq</h4>
              <div>6</div>
            </div>
            <div class="data-type-item">
              <div class="data-type-icon">🧬</div>
              <h4>Methylation</h4>
              <div>2</div>
            </div>
            <div class="data-type-item">
              <div class="data-type-icon">📈</div>
              <h4>Microarray</h4>
              <div>22</div>
            </div>
            <div class="data-type-item">
              <div class="data-type-icon">🔬</div>
              <h4>Proteomics</h4>
              <div>0</div>
            </div>
            <div class="data-type-item">
              <div class="data-type-icon">🧪</div>
              <h4>Genetics</h4>
              <div>✓</div>
            </div>
          </div>

          <div class="target-section">
            <div>
              <h3>Target ID ✓</h3>
              <p>Targets and associated Genes</p>
            </div>
            <a href="#" class="find-button">FIND TARGETS ›</a>
          </div>

          <div class="target-section">
            <div>
              <h3>Compound ID ✓</h3>
              <p>Associated Compounds</p>
            </div>
            <a href="#" class="find-button">FIND COMPOUNDS ›</a>
          </div>
        </div>

        <!-- 相关数据集列表 -->
        <div class="card datasets-card">
          <div class="datasets-header">
            <h2>1615 other related Datasets</h2>
            <a href="#">VIEW ALL ›</a>
          </div>

          <table class="datasets-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>MANUAL QA</th>
                <th>SAMPLES</th>
                <th>CASE</th>
                <th>CONTROL</th>
                <th>PUBLISHED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GSE85534</td>
                <td><span class="manual-qa-check">✓</span></td>
                <td class="number-cell">906</td>
                <td class="number-cell">0</td>
                <td class="number-cell">328</td>
                <td class="date-cell">2017-02-13</td>
              </tr>
              <tr>
                <td>GSE66499</td>
                <td><span class="manual-qa-check">✓</span></td>
                <td class="number-cell">680</td>
                <td class="number-cell">490</td>
                <td class="number-cell">190</td>
                <td class="date-cell">2015-05-17</td>
              </tr>
              <tr>
                <td>GDC-TCGA-LUAD</td>
                <td></td>
                <td class="number-cell">1129</td>
                <td class="number-cell">1019</td>
                <td class="number-cell">110</td>
                <td class="date-cell"></td>
              </tr>
              <tr>
                <td>GDC-TCGA-LUSC</td>
                <td></td>
                <td class="number-cell">574</td>
                <td class="number-cell">515</td>
                <td class="number-cell">59</td>
                <td class="date-cell"></td>
              </tr>
              <tr>
                <td>GDC-TCGA-LUAD-M</td>
                <td></td>
                <td class="number-cell">550</td>
                <td class="number-cell">501</td>
                <td class="number-cell">49</td>
                <td class="date-cell"></td>
              </tr>
              <tr>
                <td>GSE203024</td>
                <td></td>
                <td class="number-cell">2845</td>
                <td class="number-cell">1045</td>
                <td class="number-cell">0</td>
                <td class="date-cell">2024-08-31</td>
              </tr>
              <tr>
                <td>CCLE-GeneExp</td>
                <td></td>
                <td class="number-cell">1406</td>
                <td class="number-cell">0</td>
                <td class="number-cell">0</td>
                <td class="date-cell"></td>
              </tr>
              <tr>
                <td>GSE111894</td>
                <td><span class="manual-qa-check">✓</span></td>
                <td class="number-cell">1008</td>
                <td class="number-cell">1008</td>
                <td class="number-cell">0</td>
                <td class="date-cell">2019-06-13</td>
              </tr>
              <tr>
                <td>GSE68950</td>
                <td><span class="manual-qa-check">✓</span></td>
                <td class="number-cell">798</td>
                <td class="number-cell">758</td>
                <td class="number-cell">0</td>
                <td class="date-cell">2015-05-16</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  mounted() {
    document.addEventListener('DOMContentLoaded', function () {
      const chartOptions = {
        chart: {
          type: 'area',
          height: 40,
          sparkline: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        colors: ['#21965f'],
        tooltip: {
          enabled: false
        }
      };

      ['grants', 'funding', 'trials', 'publications'].forEach(chartId => {
        new ApexCharts(
          document.querySelector(`#${chartId}-chart`),
          {
            ...chartOptions,
            series: [{
              name: chartId,
              data: generateData()
            }]
          }
        ).render();
      });
    });

    // 生成示例数据
    function generateData() {
      const data = [];
      let date = new Date('2020-01-01');
      for (let i = 0; i < 100; i++) {
        data.push([date.getTime(), Math.floor(Math.random() * 100)]);
        date.setDate(date.getDate() + 1);
      }
      return data;
    }

    // 添加交互效果
    document.addEventListener('DOMContentLoaded', function () {
      // 图例项悬停效果
      const legendItems = document.querySelectorAll('.legend-item');
      const phaseBar = document.querySelector('.phase-bar');

      legendItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
          const phase = this.dataset.phase;
          const phaseElement = phaseBar.querySelector(`.phase-${phase}`);

          // 降低其他阶段的不透明度
          phaseBar.querySelectorAll('.phase').forEach(p => {
            p.style.opacity = '0.3';
          });

          // 突出显示当前阶段
          if (phaseElement) {
            phaseElement.style.opacity = '1';
          }
        });

        item.addEventListener('mouseleave', function () {
          // 恢复所有阶段的不透明度
          phaseBar.querySelectorAll('.phase').forEach(p => {
            p.style.opacity = '1';
          });
        });
      });

      // 统计框的动画效果
      const statBoxes = document.querySelectorAll('.stat-box');

      statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function () {
          const number = this.querySelector('.stat-number');
          number.style.transform = 'scale(1.1)';
        });

        box.addEventListener('mouseleave', function () {
          const number = this.querySelector('.stat-number');
          number.style.transform = 'scale(1)';
        });
      });

      // 图表交互效果
      const chartRows = document.querySelectorAll('.chart-row');
      chartRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
          const label = this.querySelector('.chart-label');
          label.style.color = '#21965f';
        });

        row.addEventListener('mouseleave', function () {
          const label = this.querySelector('.chart-label');
          label.style.color = '#666';
        });
      });

      // 数据统计数字动画
      const statValues = document.querySelectorAll('.stat-value');
      statValues.forEach(stat => {
        stat.addEventListener('mouseenter', function () {
          this.style.transform = 'scale(1.1)';
          this.style.color = '#21965f';
        });

        stat.addEventListener('mouseleave', function () {
          this.style.transform = 'scale(1)';
          this.style.color = '#212121';
        });
      });

      // 进度条动画
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach(bar => {
        bar.addEventListener('mouseenter', function () {
          this.style.filter = 'brightness(1.1)';
        });

        bar.addEventListener('mouseleave', function () {
          this.style.filter = 'brightness(1)';
        });
      });

      // 数据集表格行点击效果
      const tableRows = document.querySelectorAll('.datasets-table tbody tr');
      tableRows.forEach(row => {
        row.addEventListener('click', function () {
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 200);
        });
      });

      // 添加工具提示动画
      const tooltipElements = document.querySelectorAll('[title]');
      tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function (e) {
          const tooltip = document.createElement('div');
          tooltip.className = 'custom-tooltip';
          tooltip.textContent = this.getAttribute('title');
          tooltip.style.position = 'absolute';
          tooltip.style.top = `${e.pageY - 30}px`;
          tooltip.style.left = `${e.pageX + 10}px`;
          document.body.appendChild(tooltip);

          setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
          }, 50);
        });

        element.addEventListener('mouseleave', function () {
          const tooltip = document.querySelector('.custom-tooltip');
          if (tooltip) {
            tooltip.remove();
          }
        });
      });

      // 添加数字增长动画
      function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const current = Math.floor(progress * (end - start) + start);
          element.textContent = current.toLocaleString();
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

      // 当元素进入视口时触发动画
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseInt(element.textContent.replace(/,/g, ''));
            animateValue(element, 0, finalValue, 1500);
            observer.unobserve(element);
          }
        });
      });

      document.querySelectorAll('.stat-value').forEach(el => {
        observer.observe(el);
      });
    });
  }
}
</script>

<style scoped>
/* 基础样式设置 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: #fafafa;
  color: #212121;
}

/* 主容器布局 */
.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px 0 82px 24px;
}

/* 左右两栏布局 */
.content-wrapper {
  display: flex;
  gap: 24px;
}

.left-container,
.right-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}

/* 卡片基础样式 */
.card {
  background: white;
  border-radius: 8px;
  padding: 16px 24px;
  margin-bottom: 24px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
.disease-title {
  font-size: 32px;
  font-weight: 500;
  line-height: 37px;
  letter-spacing: -0.5px;
  margin: 0;
  text-transform: capitalize;
}

.disease-description {
  color: #666666;
  margin-top: 8px;
}

/* 研究动态图表网格 */
.research-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

/* 统计数据样式 */
.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.stat-item {
  text-align: center;
}

/* LLM报告区域样式 */
.llm-report {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
}

.llm-report h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 24px 0;
  font-size: 20px;
  color: #212121;
}

.llm-report h2::before {
  content: "🤖";
  font-size: 24px;
}

.report-items {
  display: flex;
  flex-direction: column;
}

.report-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.report-item:last-child {
  border-bottom: none;
}

.report-item a {
  color: #21965f;
  text-decoration: none;
  font-size: 16px;
}

.report-item a:hover {
  text-decoration: underline;
}

.report-item span {
  color: #666;
  font-size: 14px;
}

/* 元分析数据区域 */
.meta-analysis {
  margin-top: 24px;
}

.meta-analysis h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #212121;
}

.meta-analysis h2::before {
  content: "🧬";
  font-size: 24px;
}

.meta-analysis>p {
  color: #666;
  margin: 8px 0;
  font-size: 14px;
}

.dataset-stats {
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.dataset-type {
  text-align: center;
}

.dataset-number {
  font-size: 32px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 4px;
}

.dataset-label {
  color: #666;
  font-size: 14px;
}

.data-types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.data-type-item {
  text-align: center;
}

.data-type-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 8px;
  background: #e7f6ee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.target-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.target-section h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 16px;
  color: #212121;
}

.target-section p {
  margin: 4px 0 0 0;
  color: #666;
  font-size: 14px;
}

.find-button {
  color: #21965f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 数据集列表样式 */
.dataset-list {
  margin-top: 24px;
}

.dataset-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

/* 图表容器样式 */
.chart-container {
  width: 100%;
  height: 200px;
  margin-top: 16px;
  transition: transform 0.3s ease;
}

/* 按钮样式 */
.button {
  background: #21965f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.button:hover {
  background: #1b7a4d;
}

/* 标签样式 */
.tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}

.tag-success {
  background: #e7f6ee;
  color: #14653e;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

th {
  font-weight: 500;
  color: #666666;
}

/* 添加新的样式到 style 标签中 */
.metrics {
  margin-top: 16px;
}

.attention-score,
.trend {
  margin-bottom: 24px;
}

.attention-score h3,
.trend h3 {
  display: flex;
  justify-content: space-between;
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #21965f;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.metrics p {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
}

/* 添加到 style 标签中 */
.research-dynamics {
  padding: 24px;
}

.research-dynamics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.research-dynamics-header h2 {
  margin: 0;
  font-size: 20px;
  color: #212121;
}

.view-all {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  position: relative;
  transition: color 0.3s ease;
}

.view-all:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #21965f;
  transition: width 0.3s ease;
}

.view-all:hover {
  color: #21965f;
}

.view-all:hover:after {
  width: 100%;
}

.chart-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.chart-row:hover .chart-container {
  transform: scale(1.02);
}

.chart-label {
  width: 100px;
  color: #666;
  font-size: 14px;
}

.chart-container {
  flex: 1;
  height: 40px;
}

.stats-summary {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.stat-label {
  color: #666;
  margin-right: 4px;
}

.stat-value {
  color: #212121;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* 添加到 style 标签中 */
.datasets-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

.datasets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.datasets-header h2 {
  margin: 0;
  font-size: 20px;
  color: #212121;
}

.datasets-header a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.datasets-table {
  width: 100%;
  border-collapse: collapse;
}

.datasets-table th {
  text-align: left;
  padding: 12px 16px;
  color: #666;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.datasets-table td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 14px;
}

.datasets-table tr:last-child td {
  border-bottom: none;
}

.datasets-table tr {
  transition: background-color 0.3s ease;
}

.datasets-table tr:hover {
  background-color: rgba(33, 150, 95, 0.05);
}

.manual-qa-check {
  color: #21965f;
  font-size: 18px;
}

.number-cell {
  color: #212121;
}

.date-cell {
  color: #666;
}

/* 添加到 style 标签中 */
.drugs-trials {
  padding: 24px;
}

.drugs-trials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.drugs-trials-header h2 {
  margin: 0;
  font-size: 20px;
  color: #212121;
}

.view-all {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #21965f;
}

.phase-bar {
  height: 24px;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.phase-bar:hover {
  transform: scale(1.01);
}

.phase {
  height: 100%;
  transition: width 0.3s ease;
}

.phase-1 {
  background: #21965f;
}

.phase-2 {
  background: #ffd700;
}

.phase-3 {
  background: #4169e1;
}

.phase-4 {
  background: #deb887;
}

.phase-no-data {
  background: #808080;
}

.phase-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
  color: #666;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.legend-item:hover {
  color: #212121;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;
}

.stat-box {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.unique-compounds {
  color: #212121;
}

.small-molecules {
  color: #21965f;
}

.biologics {
  color: #4169e1;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

/* 添加工具提示样式 */
.custom-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

/* 添加动画过渡效果 */
.progress-fill {
  transition: all 0.3s ease;
}

.datasets-table tr {
  transition: all 0.2s ease;
}
</style>