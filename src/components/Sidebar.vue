<template>
  <aside class="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-sidebar-light dark:bg-sidebar-dark h-full shadow-sm z-10 shrink-0 transition-colors duration-300">
    <div class="p-4 border-b border-slate-200 dark:border-slate-800 bg-sidebar-light/95 dark:bg-sidebar-dark/95 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
      <h1 class="text-sm font-bold text-deep-green dark:text-primary mb-4 uppercase tracking-wider">Document Explorer</h1>
      
      <!-- Tab Switcher -->
      <div class="flex mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
        <button 
          @click="activeTab = 'sections'" 
          class="flex-1 text-xs font-semibold py-1.5 rounded-md transition-all"
          :class="activeTab === 'sections' 
            ? 'bg-white dark:bg-paper-dark text-deep-green dark:text-primary shadow-sm' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'"
        >
          الفهرس
        </button>
        <button 
          @click="activeTab = 'pages'" 
          class="flex-1 text-xs font-semibold py-1.5 rounded-md transition-all"
          :class="activeTab === 'pages' 
            ? 'bg-white dark:bg-paper-dark text-deep-green dark:text-primary shadow-sm' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'"
        >
          Pages
        </button>
      </div>

      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 dark:text-slate-400">
          <span class="material-icons-round text-lg">search</span>
        </span>
        <input 
          type="text" 
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          class="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-paper-dark border border-slate-300 dark:border-slate-700 focus:border-deep-green focus:ring-1 focus:ring-deep-green rounded-lg transition-all placeholder-slate-400 text-slate-700 dark:text-slate-200 shadow-sm" 
          :placeholder="activeTab === 'sections' ? 'بحث في الفهرس...' : 'Filter by doc_id...'" 
        />
      </div>
    </div>
    
    <!-- Sections Tab -->
    <div v-if="activeTab === 'sections'" class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5">
      <div v-if="filteredSections.length === 0" class="text-center p-4 text-slate-500 text-sm">
        No sections found
      </div>
      
      <button 
        v-for="section in filteredSections" 
        :key="section.page"
        @click="$emit('select', pageToDocId(section.page))"
        class="w-full text-right px-4 py-3 rounded-lg flex items-center gap-3 group transition-all"
        :class="[
          isSectionActive(section) 
            ? 'bg-white dark:bg-paper-dark border-r-4 border-deep-green text-deep-green dark:text-primary font-medium shadow-sm' 
            : 'hover:bg-white dark:hover:bg-paper-dark hover:shadow-sm text-slate-600 dark:text-slate-400 border-r-4 border-transparent',
          section.title.startsWith('باب') ? '' : 'pr-6'
        ]"
      >
        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0 tabular-nums w-6 text-center">{{ section.page }}</span>
        <span 
          class="font-arabic text-sm flex-1" 
          :class="[
            section.title.startsWith('باب') ? 'font-bold' : '',
            isSectionActive(section) ? '' : 'group-hover:text-slate-900 dark:group-hover:text-slate-200'
          ]"
          dir="rtl"
        >{{ section.title }}</span>
      </button>
    </div>

    <!-- Pages Tab -->
    <div v-else class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
      <div v-if="items.length === 0" class="text-center p-4 text-slate-500 text-sm">
        No results found
      </div>
      
      <button 
        v-for="item in items" 
        :key="item.doc_id"
        @click="$emit('select', item.doc_id)"
        class="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition-all"
        :class="[
          activeId === item.doc_id 
            ? 'bg-white dark:bg-paper-dark border-l-4 border-deep-green text-deep-green dark:text-primary font-medium shadow-sm' 
            : 'hover:bg-white dark:hover:bg-paper-dark hover:shadow-sm text-slate-600 dark:text-slate-400 font-medium border-l-4 border-transparent'
        ]"
      >
        <span class="font-mono text-sm" :class="activeId !== item.doc_id ? 'group-hover:text-slate-900 dark:group-hover:text-slate-200' : ''">{{ item.doc_id }}</span>
        <span v-if="activeId === item.doc_id" class="material-icons-round text-deep-green dark:text-primary text-sm opacity-100">article</span>
      </button>
    </div>
    
    <div class="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center bg-sidebar-light dark:bg-sidebar-dark transition-colors duration-300">
      v1.0.4 • Fathul Mu'in Reader
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  sections: {
    type: Array,
    default: () => []
  },
  searchQuery: {
    type: String,
    default: ''
  },
  activeId: {
    type: String,
    default: ''
  }
})

defineEmits(['update:searchQuery', 'select'])

const activeTab = ref('sections')

const filteredSections = computed(() => {
  if (!props.searchQuery) return props.sections
  return props.sections.filter(s => s.title.includes(props.searchQuery))
})

const pageToDocId = (page) => {
  return `FM_01_${String(page).padStart(3, '0')}`
}

const isSectionActive = (section) => {
  if (!props.activeId) return false
  // Extract page number from activeId  
  const match = props.activeId.match(/(\d+)$/)
  if (!match) return false
  const currentPage = parseInt(match[1])
  
  // Find the index of this section
  const idx = props.sections.indexOf(section)
  const nextSection = props.sections[idx + 1]
  
  // Active if current page is >= this section's page and < next section's page
  return currentPage >= section.page && (!nextSection || currentPage < nextSection.page)
}
</script>
