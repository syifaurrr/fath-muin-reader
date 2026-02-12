<template>
  <aside class="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-sidebar-light dark:bg-sidebar-dark h-full shadow-sm z-10 shrink-0 transition-colors duration-300">
    <div class="p-4 border-b border-slate-200 dark:border-slate-800 bg-sidebar-light/95 dark:bg-sidebar-dark/95 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
      <h1 class="text-sm font-bold text-deep-green dark:text-primary mb-4 uppercase tracking-wider">Document Explorer</h1>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 dark:text-slate-400">
          <span class="material-icons-round text-lg">search</span>
        </span>
        <input 
          type="text" 
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          class="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-paper-dark border border-slate-300 dark:border-slate-700 focus:border-deep-green focus:ring-1 focus:ring-deep-green rounded-lg transition-all placeholder-slate-400 text-slate-700 dark:text-slate-200 shadow-sm" 
          placeholder="Filter by doc_id..." 
        />
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
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
defineProps({
  items: {
    type: Array,
    required: true
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
</script>
