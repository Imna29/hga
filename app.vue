<script setup lang="ts">
import { ClerkLoaded } from 'vue-clerk';
</script>

<template>
    <NuxtLayout>
        <ClerkLoaded>
            <NuxtPage />
        </ClerkLoaded>
    </NuxtLayout>
</template>

<style>
</style>
