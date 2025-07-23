<script lang="ts" setup>
import { useQueries, useQuery } from "@tanstack/vue-query";
import type StatusTracking from "~/models/StatusTracking";

definePageMeta({
    layout: "dashboard-layout",
    title: "Orders",
    name: "Orders",
});

const ordersStore = useOrdersStore();
const expandedRows = ref({});
const {
    isLoading: isOrdersPending,
    data: orders,
    error,
    refetch: refetchOrders,
} = useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersStore.ordersRepo.getOrders(),
});

const expandedOrderQueries = computed(() => {
    return Object.keys(expandedRows.value).map((id) => {
        return {
            queryKey: ["orderStatus", id],
            queryFn: () => ordersStore.ordersRepo.getStatusUpdates(id),
        };
    });
});

const expandedOrderResults = useQueries({
    queries: expandedOrderQueries,
});

// map the expandedOrderResults so that it's an object where the key is the orderId of the data field
const expandedOrderResultsMap = computed(() => {
    return expandedOrderResults.value.reduce(
        (
            acc: {
                [key: string]: StatusTracking[];
            },
            query,
        ) => {
            if (query.data) {
                acc[query.data[0].orderId] = query.data;
            }
            return acc;
        },
        {},
    );
});

const confirm = useConfirm();

async function createCheckoutSession(orderId: string) {
    const stripe_url =
        await ordersStore.ordersRepo.createCheckoutSession(orderId);
    window.open(stripe_url, "_blank");
}

const confirmDeleteOrder = (event: any, orderId: string) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to delete this order? This action cannot be undone.',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger',
        },
        accept: async () => {
            try {
                await ordersStore.ordersRepo.deleteOrder(orderId);
                // Refresh the orders list by invalidating the query
                await refetchOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
                // You might want to show a toast notification here
            }
        },
    });
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <DataTable v-model:expandedRows="expandedRows" :value="orders" dataKey="id" removableSort
            v-if="orders !== undefined && orders.length > 0" sortField="createdAt" :sortOrder="-1">
            <Column expander />
            <Column field="public_id" header="ID" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/dashboard/orders/${slotProps.data.id}`" class="hover:underline">
                        {{ slotProps.data.public_id }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="status" header="Status" sortable>
                <template #body="slotProps">
                    <div class="flex items-center gap-2">
                        <Tag :severity="formatStatus(slotProps.data.status).severity">
                            {{ formatStatus(slotProps.data.status).label }}
                        </Tag>
                        <Button v-if="slotProps.data.status === 'PENDING_PAYMENT'"
                            @click="createCheckoutSession(slotProps.data.id)" class="ml-2">
                            Pay
                        </Button>
                        <Button 
                            v-if="slotProps.data.status === 'PENDING_PAYMENT' && (!slotProps.data.payment || slotProps.data.payment.status === 'UNPAID')"
                            severity="danger" 
                            @click="confirmDeleteOrder($event, slotProps.data.id)"
                            class="ml-2"
                            size="small"
                        >
                            Delete
                        </Button>
                    </div>
                </template>
            </Column>
            <Column field="serviceType" header="Cards" sortable>
                <template #body="slotProps">
                    {{
                        slotProps.data.serviceType.charAt(0).toUpperCase() +
                        slotProps.data.serviceType.slice(1).toLowerCase()
                    }}
                </template>
            </Column>
            <Column field="_count.pieces" header="Pieces" sortable />
            <Column field="payment.amount" header="Total" sortable>
                <template #body="slotProps">
                    {{
                    ((slotProps.data.payment ? slotProps.data.payment.amount : 0) / 100).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        },
                    )
                  }}
                </template>
            </Column>
            <Column field="createdAt" header="Created At" sortable>
                <template #body="slotProps">
                    {{
                        new Date(slotProps.data.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            },
                        )
                    }}
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-4">
                    <Timeline :value="expandedOrderResultsMap[slotProps.data.id]">
                        <template #opposite="slotProps">
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
                        </template>
                        <template #content="slotProps">
                            <div class="flex flex-col">
                                <div class="font-bold">
                                    {{ slotProps.item.status }}
                                </div>
                                <div>
                                    {{ slotProps.item.description }}
                                </div>
                            </div>
                        </template>
                    </Timeline>
                </div>
            </template>
        </DataTable>
        <div v-else-if="isOrdersPending">Loading...</div>
        <div v-else>No orders found.</div>
    </div>
</template>
