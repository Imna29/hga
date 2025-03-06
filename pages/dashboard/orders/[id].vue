<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import type Piece from "~/models/Piece";
import { formatPieceStatus } from "~/utils/orderUtils";

definePageMeta({
  layout: "dashboard-layout",
  title: "Order Details",
  name: "Order Details",
});

const ordersStore = useOrdersStore();
const route = useRoute();
const orderId = route.params.id as string;

const {
  isPending,
  data: order,
  error,
} = useQuery({
  queryKey: ["order", orderId],
  queryFn: () => ordersStore.ordersRepo.getOrder(orderId),
});

// Get status updates for timeline
const {
  data: statusUpdates
} = useQuery({
  queryKey: ["orderStatus", orderId],
  queryFn: () => ordersStore.ordersRepo.getStatusUpdates(orderId),
});

const {
  data: orderPieces,
  isPending: piecesPending
} = useQuery({
  queryKey: ["pieces", orderId],
  queryFn: () => ordersStore.ordersRepo.getPieces(orderId),
});

async function createCheckoutSession(orderId: string) {
  const stripe_url =
    await ordersStore.ordersRepo.createCheckoutSession(orderId);
  window.open(stripe_url, "_blank");
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- Loading and error states -->
    <div v-if="isPending">Loading order details...</div>
    <div v-else-if="error">Error loading order: {{ error }}</div>

    <div v-else-if="order" class="flex flex-col gap-6">
      <!-- Order Header -->
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <h1 class="text-2xl font-bold">Order #{{ order.public_id }}</h1>
          <span class="text-sm text-surface-500">
            Created {{
              new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <Tag :severity="formatStatus(order.status).severity">
            {{ formatStatus(order.status).label }}
          </Tag>
          <Button v-if="order.status === 'PENDING_PAYMENT'" @click="createCheckoutSession(order.id)">
            Pay Now
          </Button>
        </div>
      </div>

      <!-- Order Details -->
      <Card>
        <template #title>Order Details</template>
        <template #content>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <span class="font-semibold">Service Type</span>
              <span>{{
                order.serviceType.charAt(0).toUpperCase() +
                order.serviceType.slice(1).toLowerCase()
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-semibold">Number of Pieces</span>
              <span>{{ order._count?.pieces || 0 }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-semibold">Payment Status</span>
              <span>{{ order.payment?.status || 'Not Paid' }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-semibold">Total Amount</span>
              <span>{{
                order.payment ?
                  (order.payment.amount / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }) : '-'
              }}</span>
            </div>
          </div>
        </template>
      </Card>

      <!-- Status Timeline -->
      <Card v-if="statusUpdates?.length">
        <template #title>Order Timeline</template>
        <template #content>
          <Timeline :value="statusUpdates">
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
                <div v-if="slotProps.item.trackingCode">Tracking Code: {{ slotProps.item.trackingCode }}</div>
                <div>{{ slotProps.item.description }}</div>
              </div>
            </template>
          </Timeline>
        </template>
      </Card>

      <!-- Order Pieces -->
      <Card v-if="orderPieces?.length">
        <template #title>Order Pieces</template>
        <template #content>
          <DataView :value="orderPieces as Piece[]" v-if="orderPieces !== undefined && orderPieces?.length > 0">
            <template #list="slotProps">
              <div class="flex flex-col">
                <div v-for="(item, index) in slotProps.items" :key="index">
                  <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                    :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                    <div class="md:w-40 relative">
                      <img class="block xl:block mx-auto rounded w-full" :src="item.images[0]" :alt="item.name" />
                      <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                        <Tag :value="item.inventoryStatus" :severity="formatPieceStatus(item.grade).severity">
                          {{ formatPieceStatus(item.grade).label }}
                        </Tag>
                      </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                        <div>
                          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">#{{
                            item.serialNumber
                          }}</span>
                          <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                        </div>
                        <div>
                          {{ item.description }}
                        </div>
                      </div>
                      <div class="flex flex-col md:items-end gap-8">
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                          <Button label="Details" class="flex-auto md:flex-initial whitespace-nowrap"
                            @click="navigateTo('/dashboard/figures/' + item.id)"></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </template>
      </Card>
    </div>
    <div v-else>Order not found</div>
  </div>
</template>