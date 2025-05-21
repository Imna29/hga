<template>
    <div>
      <div v-if="pending">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <VuePdfEmbed
          v-if="pdfUrl"
          :source="pdfUrl"
          annotation-layer
          text-layer
          width="1000"
          style="width: 100%; max-width: 1000px; margin: auto;"
        />
        <div v-else>No PDF available.</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useFetch } from '#imports' // Adjust if you import differently
  import VuePdfEmbed from 'vue-pdf-embed'
  import 'vue-pdf-embed/dist/styles/annotationLayer.css'
  import 'vue-pdf-embed/dist/styles/textLayer.css'
  
  const route = useRoute()
  const figureId = route.params.id as string
  
  const { data, pending, error } = await useFetch<any>(
    `/api/figures/certificate/${figureId}`
  )
  
  const pdfUrl = computed(() => {
    if (data.value?.certificate) {
      const baseUrl =
        'https://usc1.contabostorage.com/c0eee420ce094bc880826688435fd429:certificates/'
      return baseUrl + data.value.certificate
    }
    return null
  })
  </script>