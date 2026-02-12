<template>
  <article class="flex flex-col gap-6 scroll-mt-24 transition-all duration-300" :id="chunk.doc_id">
    <div class="sticky-chunk-header flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-800 pb-2 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur transition-colors duration-300">
      <div class="flex items-center gap-2">
        <span class="bg-deep-green/10 dark:bg-primary/10 text-deep-green dark:text-primary border border-deep-green/20 dark:border-primary/20 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide">
          DOC_ID: {{ chunk.doc_id }}
        </span>
        <!-- Optional: Last edited, etc. can be added if data exists -->
      </div>
      <div class="flex gap-2">
        <button class="text-slate-500 dark:text-slate-400 hover:text-deep-green dark:hover:text-primary transition-colors text-xs flex items-center gap-1">
          <span class="material-icons-round text-sm">flag</span> Report Issue
        </button>
      </div>
    </div>
    
    <div class="bg-white dark:bg-paper-dark rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden ring-1 ring-slate-900/5 transition-colors duration-300">
      <!-- MATN SECTION -->
      <section class="relative bg-matn-light dark:bg-matn-dark p-8 md:p-10 border-r-[6px] border-r-deep-green border-b border-b-amber-200/50 dark:border-b-emerald-900/50 transition-colors duration-300">
        <div class="group h-full">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[11px] uppercase tracking-widest text-deep-green dark:text-primary font-bold font-display select-none flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-deep-green dark:bg-primary"></span>
              Matn (Original Text)
            </span>
          </div>
          <p 
            class="font-arabic font-bold leading-[2.4] text-slate-900 dark:text-slate-100 text-right transition-colors duration-300" 
            dir="rtl" 
            style="text-align: justify;"
            :style="{ fontSize: fontSize + 'px' }"
          >
            {{ chunk.matn }}
          </p>
          <div class="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
             <button class="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-paper-dark shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-deep-green dark:hover:text-deep-green transition-colors" title="Copy Matn">
              <span class="material-icons-round text-base">content_copy</span>
            </button>
          </div>
        </div>
      </section>

      <!-- SEPARATOR PATTERN -->
      <div class="h-2 bg-pattern w-full opacity-50 relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div class="h-px w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        <div class="absolute w-4 h-4 rotate-45 border border-slate-300 dark:border-slate-600 bg-matn-light dark:bg-matn-dark z-10 transform -translate-y-1/2 top-1/2 transition-colors duration-300"></div>
      </div>

      <!-- SYARH SECTION -->
      <section class="relative bg-white dark:bg-paper-dark p-8 md:p-10 transition-colors duration-300">
        <div class="group h-full">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[11px] uppercase tracking-widest text-slate-400 font-bold font-display select-none">Syarh (Commentary)</span>
          </div>
          <div 
            class="font-arabic font-normal leading-[2.2] text-slate-700 dark:text-slate-300 text-right space-y-8 transition-colors duration-300" 
            dir="rtl" 
            style="text-align: justify;"
            :style="{ fontSize: (fontSize - 8) + 'px' }"
          >
            <p>{{ chunk.syarh }}</p>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
defineProps({
  chunk: {
    type: Object,
    required: true
  },
  fontSize: {
    type: Number,
    default: 32 // matching text-3xl approx
  }
})
</script>

<style scoped>
/* Scoped styles if needed, but mostly using Tailwind */
</style>
