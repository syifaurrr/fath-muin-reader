<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-display h-screen flex overflow-hidden transition-colors duration-300">
    <Sidebar 
      :items="filteredChunks"
      :sections="sections"
      :searchQuery="searchQuery"
      :activeId="activeId"
      @update:searchQuery="searchQuery = $event"
      @select="scrollToChunk"
    />

    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header 
        @increase-font="increaseFont"
        @decrease-font="decreaseFont"
      />
      
      <div class="flex-1 flex relative overflow-hidden">
        <div 
          ref="scrollContainer"
          class="flex-1 overflow-y-auto p-6 md:p-12 pb-32 flex justify-center bg-background-light dark:bg-background-dark custom-scrollbar scroll-smooth" 
          id="scroll-container"
          @scroll="handleScroll"
        >
          <div v-if="loading" class="text-center mt-20 text-slate-500 font-arabic text-xl">جار التحميل...</div>
          <div v-else-if="error" class="text-center mt-20 text-red-500">{{ error }}</div>
          
          <div v-else class="w-full max-w-3xl flex flex-col gap-12 pb-20">
             <div v-for="(chunk, index) in filteredChunks" :key="chunk.doc_id">
                <ChunkViewer :chunk="chunk" :fontSize="fontSize" />
                 <div v-if="index < filteredChunks.length - 1" class="flex items-center gap-4 opacity-40 py-2">
                    <div class="h-px bg-slate-300 flex-1"></div>
                    <span class="text-xs text-slate-400 font-mono">CONTINUED</span>
                    <div class="h-px bg-slate-300 flex-1"></div>
                </div>
             </div>
             
             <div v-if="filteredChunks.length === 0" class="text-center text-slate-500 mt-10">
                No results found for "{{ searchQuery }}"
             </div>
          </div>
        </div>
        
        <Navigator 
            :progress="scrollProgress"
            @scroll-top="scrollToTop"
            @scroll-bottom="scrollToBottom"
            @jump="scrollToChunk"
            @prev-chunk="goToPrevChunk"
            @next-chunk="goToNextChunk"
        />
      </div>
    </main>
    
    <!-- Mobile overlay placeholder if sidebar is toggled on mobile (not implemented yet) -->
    <div class="fixed inset-0 bg-black/50 z-50 hidden md:hidden"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import ChunkViewer from './components/ChunkViewer.vue'
import Navigator from './components/Navigator.vue'
import { useDarkMode } from './composables/useDarkMode'

// Initialize dark mode
useDarkMode()

const chunks = ref([])
const searchQuery = ref('')
const loading = ref(true)
const error = ref(null)
const activeId = ref('')
const fontSize = ref(32) // Default size matching text-3xl
const scrollContainer = ref(null)
const scrollProgress = ref(0)
const sections = ref([])

// Load data
onMounted(async () => {
  try {
    const [dataRes, sectionsRes] = await Promise.all([
      fetch('/data.json'),
      fetch('/sections.json')
    ])
    if (!dataRes.ok) throw new Error('Failed to load data')
    chunks.value = await dataRes.json()
    if (chunks.value.length > 0) {
        activeId.value = chunks.value[0].doc_id
    }
    if (sectionsRes.ok) {
      sections.value = await sectionsRes.json()
    }
  } catch (e) {
    error.value = 'Error loading data: ' + e.message
    console.error(e)
  } finally {
    loading.value = false
  }
})

// Search logic
const filteredChunks = computed(() => {
  if (!searchQuery.value) return chunks.value
  
  const query = searchQuery.value.toLowerCase()
  return chunks.value.filter(chunk => 
    chunk.matn.includes(query) || 
    chunk.syarh.includes(query) || 
    chunk.doc_id.toLowerCase().includes(query)
  )
})

const scrollToChunk = (id) => {
  let resolvedId = id

  // If input is purely numeric, resolve to full doc_id (e.g. "9" → "FM_01_009")
  if (/^\d+$/.test(id) && chunks.value.length > 0) {
    // Extract prefix from existing doc_ids (e.g. "FM_01_" from "FM_01_031")
    const sample = chunks.value[0].doc_id
    const prefixMatch = sample.match(/^(.+_)(\d+)$/)
    if (prefixMatch) {
      const prefix = prefixMatch[1]
      const padLen = prefixMatch[2].length
      resolvedId = prefix + id.padStart(padLen, '0')
    }
  }

  const element = document.getElementById(resolvedId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = resolvedId
  }
}

const scrollToTop = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const scrollToBottom = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: scrollContainer.value.scrollHeight, behavior: 'smooth' })
    }
}

const handleScroll = () => {
    if (!scrollContainer.value) return
    
    // Update progress
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
    const range = scrollHeight - clientHeight
    scrollProgress.value = range > 0 ? (scrollTop / range) * 100 : 0
}

const increaseFont = () => {
    if (fontSize.value < 60) fontSize.value += 2
}

const decreaseFont = () => {
    if (fontSize.value > 16) fontSize.value -= 2
}

const goToPrevChunk = () => {
    const currentIndex = filteredChunks.value.findIndex(c => c.doc_id === activeId.value)
    if (currentIndex > 0) {
        scrollToChunk(filteredChunks.value[currentIndex - 1].doc_id)
    }
}

const goToNextChunk = () => {
    const currentIndex = filteredChunks.value.findIndex(c => c.doc_id === activeId.value)
    if (currentIndex < filteredChunks.value.length - 1) {
        scrollToChunk(filteredChunks.value[currentIndex + 1].doc_id)
    }
}
</script>
