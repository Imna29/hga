<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';

definePageMeta({
    layout: "dashboard-layout",
    title: "Dashboard",
    name: "Dashboard",
});

const orderStore = useOrdersStore();

const {
    isPending: isOrdersPending,
    data: orders,
    error,
} = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderStore.ordersRepo.getOrders(),
});
const {
    isPending: activeOrdersPending,
    data: activeOrders,
    error: activeOrdersError,
} = useQuery({
    queryKey: ["activeOrders"],
    queryFn: () => orderStore.ordersRepo.getActiveOrdersCount(),
});
const {
    isPending: figuresPending,
    data: figures,
    error: figuresError,
} = useQuery({
    queryKey: ["figures"],
    queryFn: () => orderStore.ordersRepo.getFiguresCount(),
});
const {
    data: avgGrade,
    isPending: avgGradePending,
    error: avgGradeError,
} = useQuery({
    queryKey: ["avgGrade"],
    queryFn: () => orderStore.ordersRepo.getAverageGrade(),
});
const {
    data: completedOrders,
    isPending: completedOrdersPending,
    error: completedOrdersError,
} = useQuery({
    queryKey: ["completedOrders"],
    queryFn: () => orderStore.ordersRepo.getCompletedOrdersCount(),
});
const {
    data: latestStatusUpdates,
    isPending: latestStatusUpdatesPending,
    error: latestStatusUpdatesError,
} = useQuery({
    queryKey: ["latestStatusUpdates"],
    queryFn: () => orderStore.ordersRepo.getLatestStatusUpdates(),
});

//get the latest active order and if none available, get the latest completed order
const latestOrder = computed(() => {
    if (orders.value !== undefined) {
        let ordersToSort = [...orders.value];
        ordersToSort.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        const activeOrders = ordersToSort.filter((order) => order.status !== "PENDING_PAYMENT" && order.status !== "SHIPPED_BACK");
        const completedOrders = orders.value.filter((order) => order.status === "SHIPPED_BACK");
        return activeOrders.length > 0 ? activeOrders[0] : completedOrders[0];
    }
});

const enabled = computed(() => !!latestOrder.value?.id)
const {
    data: latestOrderPieces,
    isPending: latestOrderPiecesPending,
    error: latestOrderPiecesError,
} = useQuery({
    queryKey: ["pieces", latestOrder.value?.id],
    queryFn: () => orderStore.ordersRepo.getPieces(latestOrder.value?.id!),
    enabled,
});
const images = computed(() => {
    if (latestOrderPieces.value !== undefined) {
        return latestOrderPieces.value.flatMap((piece) => piece.images);
    }

});

</script>
<template>
    <div>
        <div class="grid lg:grid-cols-4 grid-cols-2 gap-8">
            <div class="col-span-1 dark:bg-primary bg-surface-100 text-center rounded-lg">
                <div class="p-4">
                    <div>
                        <i class="pi pi-shopping-cart text-2xl dark:bg-primary-600 bg-surface-200 p-3 rounded-3xl"></i>
                    </div>
                    <div class="text-4xl my-2 font-semibold">
                        {{ !activeOrdersPending ? activeOrders : "loading..." }}
                    </div>
                    Active Orders
                </div>
            </div>
            <div class="col-span-1 dark:bg-primary bg-surface-100 text-center rounded-lg">
                <div class="p-4">
                    <div>
                        <i class="pi pi-image text-2xl dark:bg-primary-600 bg-surface-200 p-3 rounded-3xl"></i>
                    </div>
                    <div class="text-4xl my-2 font-semibold">
                        {{ !figuresPending ? figures : "loading..." }}
                    </div>
                    Figures
                </div>
            </div>
            <div class="col-span-1 dark:bg-primary bg-surface-100 text-center rounded-lg">
                <div class="p-4">
                    <div>
                        <i class="pi pi-star text-2xldark:bg-primary-600 bg-surface-200 p-3 rounded-3xl"></i>
                    </div>
                    <div class="text-4xl my-2 font-semibold">
                        {{ !avgGradePending ? avgGrade : "loading..." }}
                    </div>
                    Avg. Grade
                </div>
            </div>
            <div class="col-span-1 dark:bg-primary bg-surface-100 text-center rounded-lg">
                <div class="p-4">
                    <div>
                        <i class="pi pi-check text-2xl dark:bg-primary-600 bg-surface-200 p-3 rounded-3xl"></i>
                    </div>
                    <div class="text-4xl my-2 font-semibold">
                        {{
                            !completedOrdersPending
                                ? completedOrders
                                : "loading..."
                        }}
                    </div>
                    Completed Orders
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            <div>
                <div>
                    <h2 class="text-2xl">Latest Order</h2>
                </div>
                <div v-if="latestOrder !== undefined" class="mt-2">
                    <Card>
                        <template #title>
                            Order #{{ latestOrder.public_id }}
                        </template>
                        <template #subtitle>
                            <Tag :severity="formatStatus(latestOrder.status).severity">
                                {{ formatStatus(latestOrder.status).label }}
                            </Tag>
                        </template>
                        <template #content>
                            <p class="text-md">
                                Service Type: {{ latestOrder.serviceType.charAt(0).toUpperCase() +
                                    latestOrder.serviceType.slice(1).toLowerCase() }}
                            </p>
                            <p class="text-md">
                                Total: {{
                                    (latestOrder.payment?.amount! / 100).toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        },
                                    )
                                }}
                            </p>
                            <Carousel :value="images" :numVisible="1" :numScroll="1" class="mt-2">
                                <template #item="slotProps">
                                    <img :src="slotProps.data" alt="piece image" class="w-3/4 mx-auto" />
                                </template>
                            </Carousel>
                        </template>
                        <template #footer>
                            <small>
                                {{
                                    new Date(latestOrder.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        },
                                    ) + " " + new Date(latestOrder.createdAt).toLocaleTimeString()
                                }}
                            </small>
                        </template>
                    </Card>
                </div>
            </div>
            <div>
                <div>
                    <h2 class="text-2xl">Latest Order Updates</h2>
                </div>
                <ScrollPanel class="h-[500px] dark:bg-surface-800 bg-surface-100 rounded-lg p-4 mt-2">
                    <div v-for="status in latestStatusUpdates" :key="status.id" class="mt-4"
                        v-if="!latestStatusUpdatesPending && latestStatusUpdates !== undefined && latestStatusUpdates?.length > 0">
                        <Card>
                            <template #title>
                                {{ status.status }}
                            </template>
                            <template #subtitle>
                                Order #{{ status.order?.public_id }}
                            </template>
                            <template #content>
                                <p class="text-md">{{ status.description }}</p>
                            </template>
                            <template #footer>
                                <small>
                                    {{
                                        new Date(status.createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            },
                                        ) + " " + new Date(status.createdAt).toLocaleTimeString()
                                    }}
                                </small>
                            </template>
                        </Card>
                    </div>
                    <div v-else-if="latestStatusUpdatesPending">Loading...</div>
                    <div v-else>No updates available</div>
                </ScrollPanel>
            </div>
        </div>
    </div>
</template>
