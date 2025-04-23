<template>
    <div>
        <h1>Certificate for Figure {{ figureId }}</h1>
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else>
            <object v-if="pdfUrl" :data="pdfUrl" width="100%" height="800px" frameborder="0"
                title="PDF Viewer: My Document" aria-label="Embedded PDF Document">
                <!-- Fallback content for browsers that don't support iframe or PDF embedding -->
                <p>
                    Your browser does not support embedded PDFs.
                    <a :href="pdfUrl" target="_blank" rel="noopener noreferrer">
                        Click here to download the PDF.
                    </a>
                </p>
            </object>

            <div v-else>
                No PDF available.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const figureId = route.params.id as string;

// Use useFetch to call your API endpoint
const { data, pending, error } = await useFetch<any>(
    `/api/figures/certificate/${figureId}`,

);

// Assume your API returns { url: "..." }
const pdfUrl = computed(() => data.value?.certificate ? ('https://usc1.contabostorage.com/c0eee420ce094bc880826688435fd429:certificates/' + data.value.certificate) : null);
</script>