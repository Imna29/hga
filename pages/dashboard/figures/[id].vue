<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

definePageMeta({
    layout: 'dashboard-layout',
    name: 'Figure Details'
});

const route = useRoute()
const figuresStore = useFiguresStore()


const { data: figureData, isLoading: isFigureDataLoading } = useQuery({
    queryKey: ["figure", route.params.id as string],
    queryFn: () => figuresStore.figuresRepo.getFigure(route.params.id as string)
})
</script>

<template>
    <div v-if="figureData" class="p-6 ">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Figure Images Section -->
            <Card class="h-fit">
                <template #content>
                    <div class="grid grid-cols-1 gap-4 ">
                        <Carousel :value="figureData.images" :numVisible="2" :numScroll="1" class="mt-2 w-full">
                            <template #item="slotProps">
                                <div class="aspect-square max-h-96 p-2">
                                    <Image :src="slotProps.data" :alt="`Figure image ${slotProps.index + 1}`"
                                        imageClass="w-full h-full object-cover rounded-lg" preview />
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </template>
            </Card>

            <!-- Figure Details Section -->
            <div class="space-y-6">
                <Card>
                    <template #title> {{ figureData.name }} </template>
                    <template #subtitle> Serial #{{ figureData.serialNumber }} </template>
                    <template #content>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <p class="font-semibold">Grade:
                                    <Tag :value="figureData.grade || 'N/A'" severity="info" />
                                </p>
                                <p class="font-semibold">Created:
                                    <span class="font-normal">{{ new Date(figureData.createdAt).toLocaleDateString()
                                        }}</span>
                                </p>
                            </div>
                            <div class="space-y-2">
                                <p class="font-semibold">Order Status:
                                    <Badge :value="formatStatus(figureData.order!.status).label"
                                        :severity="formatStatus(figureData.order!.status).severity" />
                                </p>
                                <p class="font-semibold">Service Type:
                                    <Tag :value="figureData.order?.serviceType" severity="success" />
                                </p>
                            </div>
                        </div>

                        <Divider />

                        <p class="text-gray-600" v-if="figureData.description">
                            {{ figureData.description }}
                        </p>
                        <p v-else class="text-gray-400">No description available</p>
                    </template>
                </Card>

                <!-- Order Status Timeline -->
                <Card>
                    <template #title>Order Status History</template>
                    <template #content>
                        <Timeline :value="figureData.order!.statusTracking">
                            <template #opposite="slotProps">
                                <div class="flex flex-col">
                                    <div class="flex flex-col">
                                        <small class="text-surface-700 dark:text-surface-200">{{
                                            new Date(
                                                slotProps.item.createdAt,
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                        }}
                                        </small>
                                        <small class="text-surface-500 dark:text-surface-400">
                                            {{
                                                new Date(
                                                    slotProps.item.createdAt,
                                                ).toLocaleTimeString()
                                            }}
                                        </small>
                                    </div>
                                </div>
                            </template>
                            <template #content="slotProps">
                                <div class="flex flex-col">
                                    <div class="font-bold">{{ slotProps.item.status }}</div>
                                    <div>{{ slotProps.item.description }}</div>
                                </div>
                            </template>
                        </Timeline>
                    </template>
                </Card>
            </div>
        </div>
    </div>

    <div v-else class="p-6 text-center text-gray-500">
        <ProgressSpinner v-if="isFigureDataLoading" />
        <p v-else>Figure not found</p>
    </div>
</template>
