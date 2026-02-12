<template>
  <div class="w-14 border-l border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm z-20 flex flex-col items-center py-6 shrink-0 hidden md:flex h-full transition-colors duration-300">
    <div class="flex flex-col items-center gap-1 mb-4">
      <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider writing-mode-vertical">Navigator</span>
    </div>
    
    <div class="flex-1 w-full relative flex justify-center py-2">
      <div class="h-full w-1 bg-slate-200 dark:bg-slate-700 rounded-full relative group">
        <!-- Ticks -->
        <div class="absolute top-[0%] -left-2 w-5 h-px bg-slate-300 dark:bg-slate-600"></div>
        <div class="absolute top-[25%] -left-1 w-3 h-px bg-slate-300 dark:bg-slate-600"></div>
        <div class="absolute top-[50%] -left-2 w-5 h-px bg-slate-300 dark:bg-slate-600"></div>
        <div class="absolute top-[75%] -left-1 w-3 h-px bg-slate-300 dark:bg-slate-600"></div>
        <div class="absolute bottom-[0%] -left-2 w-5 h-px bg-slate-300 dark:bg-slate-600"></div>
        
        <!-- Scrubber -->
        <div 
          class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-deep-green dark:bg-primary rounded-full shadow-md cursor-grab active:cursor-grabbing border-2 border-white dark:border-slate-800 z-10 hover:scale-125 transition-transform"
          :style="{ top: progress + '%' }"
          title="Scroll Progress"
        ></div>
      </div>
    </div>
    
    <div class="mt-4 flex flex-col gap-2">
      <button 
        class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
        title="Previous Chunk"
        @click="$emit('prev-chunk')"
      >
        <span class="material-icons-round text-sm">keyboard_arrow_up</span>
      </button>
      <button 
        class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
        title="Next Chunk"
        @click="$emit('next-chunk')"
      >
        <span class="material-icons-round text-sm">keyboard_arrow_down</span>
      </button>

      <div class="h-px w-6 bg-slate-200 dark:bg-slate-700 my-1"></div>

      <button 
        class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
        title="Scroll Top"
        @click="$emit('scroll-top')"
      >
        <span class="material-icons-round text-sm">vertical_align_top</span>
      </button>
      <button 
        class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
        title="Scroll Bottom"
        @click="$emit('scroll-bottom')"
      >
        <span class="material-icons-round text-sm">vertical_align_bottom</span>
      </button>
    </div>

    <!-- Jump To Floating Component -->
    <div class="absolute bottom-8 right-16 z-30 transform translate-x-0" v-if="showJump">
        <div class="bg-white/90 dark:bg-paper-dark/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl rounded-full px-4 py-2 flex items-center gap-3 whitespace-nowrap transition-colors duration-300">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Jump to:</span>
            <div class="relative flex items-center">
                <span class="absolute left-3 text-slate-400 dark:text-slate-500 text-xs font-mono">#</span>
                <input class="w-24 pl-6 pr-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-md focus:ring-2 focus:ring-deep-green dark:focus:ring-primary text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-mono" placeholder="Chunk ID" type="text" @keyup.enter="$emit('jump', $event.target.value)" />
            </div>
            <div class="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
            <button class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-deep-green dark:text-primary transition-colors" title="Go">
                <span class="material-icons-round text-sm">arrow_forward</span>
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0
  },
  showJump: {
    type: Boolean,
    default: true
  }
})

defineEmits(['scroll-top', 'scroll-bottom', 'jump', 'prev-chunk', 'next-chunk'])
</script>

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
