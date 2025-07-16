<template>
  <div class="overflow-y-auto filter-scroll" style="height: calc(120vh - 88px); padding-right: 8px;">
    <div class="space-y-4">
      <!-- Filter by Tissue -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900">FILTER BY TISSUE</h3>
          <i class="fas fa-chevron-up text-gray-400"></i>
        </div>
        
        <div class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Expression type</label>
            <select class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>RNA expression</option>
            </select>
          </div>
          
          <div>
            <div class="relative">
              <input type="text" placeholder="Search by tissue" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pl-8">
              <i class="fas fa-search absolute left-3 top-3 text-gray-400 text-xs"></i>
            </div>
            <a href="#" class="text-xs text-primary hover:underline mt-1 inline-block">View All</a>
          </div>
          
          <div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700">Specificity ≥</span>
              <div class="flex items-center space-x-2">
                <input type="number" value="0.1" step="0.1" min="0" max="1" 
                       class="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <i class="fas fa-info-circle text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Target Families -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900">TARGET FAMILIES</h3>
          <i class="fas fa-chevron-up text-gray-400"></i>
        </div>
        
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-700">Show druggable classes only</span>
          <ToggleSwitch v-model="druggableOnly" />
        </div>
        
        <div class="space-y-2 mb-4">
          <CheckboxItem 
            v-for="family in targetFamilies" 
            :key="family.key"
            :label="family.label"
            :count="family.count"
            v-model="family.checked"
          />
        </div>
      </div>

      <!-- Development Level -->
      <FilterSection
        title="DEVELOPMENT LEVEL"
        :items="developmentLevels"
        v-model="developmentLevels"
      />

      <!-- Omics Scores -->
      <FilterSection
        title="OMICS SCORES"
        :items="omicsScores"
        :activated-count="omicsActivatedCount"
        v-model="omicsScores"
      />

      <!-- Apply Button -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <button @click="applyFilters" class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
          <i class="fas fa-star mr-2"></i>APPLY
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ToggleSwitch from './ToggleSwitch.vue'
import CheckboxItem from './CheckboxItem.vue'
import FilterSection from './FilterSection.vue'

// Reactive state
const druggableOnly = ref(true)

const targetFamilies = ref([
  { key: 'all', label: 'All', count: null, checked: true },
  { key: 'enzyme', label: 'Enzyme', count: 3761, checked: false },
  { key: 'kinase', label: 'Kinase', count: 604, checked: false },
  { key: 'receptor', label: 'Receptor', count: 1210, checked: false },
  { key: 'transporter', label: 'Transporter', count: 487, checked: false }
])

const developmentLevels = ref([
  { key: 'tclin', label: 'Tclin', checked: true },
  { key: 'tbio', label: 'Tbio', checked: true },
  { key: 'tchem', label: 'Tchem', checked: true },
  { key: 'tdark', label: 'Tdark', checked: true }
])

const omicsScores = ref([
  { key: 'network', label: 'Network neighbors', checked: true },
  { key: 'mutated', label: 'Mutated sub-modules', checked: true },
  { key: 'disease', label: 'Disease sub-modules', checked: true },
  { key: 'causal', label: 'Causal inference', checked: true },
  { key: 'overexpression', label: 'Overexpression', checked: true },
  { key: 'knockout', label: 'Knockout', checked: true },
  { key: 'mutations', label: 'Mutations', checked: true },
  { key: 'pathways', label: 'Pathways', checked: true },
  { key: 'interactome', label: 'Interactome community', checked: true },
  { key: 'relevance', label: 'Relevance', checked: true },
  { key: 'expression', label: 'Expression', checked: true },
  { key: 'graph', label: 'Heterogeneous graph walk', checked: true },
  { key: 'matrix', label: 'Matrix factorization', checked: true }
])

// Computed
const omicsActivatedCount = computed(() => {
  return omicsScores.value.filter(score => score.checked).length
})

// Methods
const applyFilters = () => {
  console.log('Applying filters...')
  // Implement filter application logic
}
</script>

<style scoped>
.text-primary {
  color: #519294;
}

.bg-primary {
  background-color: #519294;
}

.hover\:bg-primary\/90:hover {
  background-color: rgba(81, 146, 148, 0.9);
}

.focus\:ring-primary\/20:focus {
  --tw-ring-color: rgba(81, 146, 148, 0.2);
}

.focus\:border-primary:focus {
  border-color: #519294;
}

/* 自定义滚动条样式 */
.filter-scroll::-webkit-scrollbar {
  width: 6px;
}

.filter-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.filter-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.filter-scroll::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style> 