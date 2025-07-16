<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-dark mb-8">User Manual</h1>
    
    <!-- Quick Navigation -->
    <div class="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
      <h2 class="text-xl font-semibold text-primary mb-4">Quick Navigation</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="#getting-started" class="text-primary hover:text-primary/80 font-medium">Getting Started</a>
        <a href="#data-upload" class="text-primary hover:text-primary/80 font-medium">Data Upload</a>
        <a href="#data-management" class="text-primary hover:text-primary/80 font-medium">Data Management</a>
        <a href="#analysis" class="text-primary hover:text-primary/80 font-medium">Analysis Tools</a>
      </div>
    </div>

    <!-- Getting Started -->
    <div id="getting-started" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-dark mb-6">1. Getting Started</h2>
      <div class="prose max-w-none">
        <p class="text-gray-700 mb-4">
          Welcome to Y150, a comprehensive multi-omics data analysis platform. This guide will help you navigate through the key features and functionalities.
        </p>
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h4 class="font-semibold text-blue-900">Core Features</h4>
          <ul class="text-blue-800 mt-2">
            <li>• Multi-omics data upload and management</li>
            <li>• AI-powered gene analysis reports</li>
            <li>• Interactive knowledge graph visualization</li>
            <li>• Target identification and discovery</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Data Upload -->
    <div id="data-upload" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-dark mb-6">2. Data Upload</h2>
      <h3 class="text-lg font-semibold mb-3">Supported Data Types</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="border border-blue-200 rounded-lg p-4">
          <h4 class="font-semibold mb-2">Bulk Transcriptomics</h4>
          <p class="text-sm text-gray-600">RNA-seq data for population-level gene expression analysis</p>
        </div>
        <div class="border border-green-200 rounded-lg p-4">
          <h4 class="font-semibold mb-2">Single-cell Transcriptomics</h4>
          <p class="text-sm text-gray-600">Single-cell RNA-seq for cellular heterogeneity studies</p>
        </div>
        <div class="border border-purple-200 rounded-lg p-4">
          <h4 class="font-semibold mb-2">Proteomics</h4>
          <p class="text-sm text-gray-600">Mass spectrometry data for protein analysis</p>
        </div>
        <div class="border border-orange-200 rounded-lg p-4">
          <h4 class="font-semibold mb-2">Methylation</h4>
          <p class="text-sm text-gray-600">DNA methylation data for epigenetic analysis</p>
        </div>
      </div>
    </div>

    <!-- Data Management -->
    <div id="data-management" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-dark mb-6">3. Data Management</h2>
      <p class="text-gray-700 mb-6">The data management interface provides comprehensive tools for organizing and analyzing your datasets.</p>
      
      <div class="space-y-4">
        <div class="border-l-4 border-blue-400 pl-4">
          <h4 class="font-semibold text-blue-900">LLM Reports</h4>
          <p class="text-blue-800 mt-1">Manage AI-generated analysis reports with viewing, editing, and deletion capabilities.</p>
        </div>
        <div class="border-l-4 border-green-400 pl-4">
          <h4 class="font-semibold text-green-900">Datasets</h4>
          <p class="text-green-800 mt-1">Browse and manage uploaded datasets with metadata and quality metrics.</p>
        </div>
        <div class="border-l-4 border-purple-400 pl-4">
          <h4 class="font-semibold text-purple-900">Gene Sets</h4>
          <p class="text-purple-800 mt-1">Create and manage custom gene sets for targeted analysis workflows.</p>
        </div>
      </div>
    </div>

    <!-- Analysis Tools -->
    <div id="analysis" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-dark mb-6">4. Analysis Tools</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Target Identification</h3>
          <p class="text-sm text-gray-600 mb-3">AI-powered algorithms to identify potential therapeutic targets from multi-omics data.</p>
          <ul class="text-sm space-y-1">
            <li>• Disease-specific target discovery</li>
            <li>• Pathway-based analysis</li>
            <li>• Druggability assessment</li>
          </ul>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Knowledge Graph</h3>
          <p class="text-sm text-gray-600 mb-3">Interactive visualization of gene-disease-drug relationships with AI chat assistance.</p>
          <ul class="text-sm space-y-1">
            <li>• Network visualization</li>
            <li>• Relationship exploration</li>
            <li>• AI-powered insights</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Support -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h3 class="font-semibold mb-2">Need Help?</h3>
      <p class="text-gray-700">
        If you encounter any issues or have questions, please contact our support team at 
        <a href="mailto:support@y150.com" class="text-primary hover:underline">support@y150.com</a>
      </p>
    </div>
  </div>
</template>

<script setup>
// 基础页面，无需特殊逻辑
</script>

<style scoped>
.text-dark {
  color: #58798c;
}

.text-primary {
  color: #83a594;
}

.bg-primary\/10 {
  background-color: rgba(131, 165, 148, 0.1);
}

.border-primary\/20 {
  border-color: rgba(131, 165, 148, 0.2);
}

/* 确保链接样式正确 */
a {
  transition: color 0.2s ease-in-out;
}
</style> 