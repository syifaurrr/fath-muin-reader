<template>
  <header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur flex items-center justify-between px-6 shrink-0 z-20 shadow-sm transition-colors duration-300">
    <div class="flex items-center gap-3">
      <span class="material-icons-round text-deep-green dark:text-primary text-xl">menu_book</span>
      <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Kitab al-Salah</span>
      <span class="text-slate-300 dark:text-slate-600">/</span>
      <span class="text-sm font-bold text-slate-900 dark:text-slate-100">Chapter 1: Conditions</span>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex items-center bg-white dark:bg-paper-dark rounded-lg p-1 border border-slate-300 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <button class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors" title="Decrease Font Size" @click="$emit('decrease-font')">
          <span class="material-icons-round text-sm">remove</span>
        </button>
        <span class="text-xs font-bold px-2 text-slate-700 dark:text-slate-200 select-none">A</span>
        <button class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors" title="Increase Font Size" @click="$emit('increase-font')">
          <span class="material-icons-round text-sm">add</span>
        </button>
      </div>
      
      <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors" @click="toggleDarkMode">
        <span class="material-icons-round">{{ isDark ? 'dark_mode' : 'light_mode' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()

defineEmits(['increase-font', 'decrease-font'])
</script>
