<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

definePageMeta({
  layout: 'dashboard-layout',
  name: 'Figures'
});

const figuresStore = useFiguresStore();

const { data: figuresData, isLoading: isFiguresLoading } = useQuery({
  queryKey: ["figures"],
  queryFn: () => figuresStore.figuresRepo.getFigures(),
});
</script>

<template>
  <div class="p-6">
    <div class="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" v-if="!isFiguresLoading">
      <div v-for="figure in figuresData" :key="figure.id"
        class="group bg-surface-100 dark:bg-surface-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden cursor-pointer"
        @click="navigateTo(`/dashboard/figures/${figure.id}`)">
        <div class="relative aspect-square">
          <img :src="figure.images[0]" :alt="figure.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
          <span class="absolute top-2 left-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full font-mono">
            #{{ figure.serialNumber }}
          </span>
        </div>

        <div class="p-3">
          <h3 class="font-medium dark:text-white text-md truncate">{{ figure.name }}</h3>
          <div class="mt-1 flex items-center justify-between text-xs dark:text-gray-200 text-gray-700">
            <span class="truncate">{{ figure.grade ?? 'Not Yet Graded' }}</span>
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <div class="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="animate-pulse bg-surface-100 dark:bg-surface-700 rounded-xl shadow-sm w-full" v-for="n in 8"
          :key="n">
          <div class="aspect-square"></div>
          <div class="p-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div class="mt-1 flex items-center justify-between text-xs dark:text-gray-200 text-gray-700">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>