<script lang="ts" setup>
import { useIsFetching, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type Piece from '~/models/Piece';

definePageMeta({
    layout: 'dashboard-layout',
    name: 'Manage Order',
    middleware: 'admin'
});
const adminStore = useAdminStore();
const queryClient = useQueryClient()
const confirm = useConfirm();
const toast = useToast();
const isFetching = useIsFetching();

watch(isFetching, (newVal) => {
    if (newVal !== 0) {
        toast.add({
            severity: 'info',
            summary: 'Loading Order Details',
            life: 1000
        });
    }
})

const route = useRoute();
const { id } = route.params;

const { data: order, isLoading: isPending, isFetching: isOrderUpdating, error } = useQuery({
    queryKey: ['orders', 'admin', id],
    queryFn: () => adminStore.adminRepo.getOrder(id as string),

});

const orderStatuses = ref([
    { value: 'PENDING_PAYMENT', label: 'Pending Payment' },
    { value: 'AWAITING_SHIPMENT', label: 'Awaiting Shipment' },
    { value: 'IN_GRADING', label: 'In Grading' },
    { value: 'GRADING_COMPLETE', label: 'Grading Complete' },
    { value: 'SHIPPED_BACK', label: 'Shipped Back' },
]);
const chosenStatus = ref('');
const { error: statusError, mutate: mutateOrderStatus, reset, isPending: isStatusUpdating } = useMutation({
    mutationFn: (newStatus: string) => adminStore.adminRepo.updateOrderStatus(id as string, newStatus),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders', 'admin', id] });
    },
})

const statusUpdateTitle = ref('');
const statusUpdateBody = ref('');
const { error: statusUpdateError, mutate: mutateStatusUpdate, reset: resetStatusUpdate, isPending: isStatusUpdateAdding } = useMutation({
    mutationFn: ({ title, body }: { title: string, body: string }) => adminStore.adminRepo.addStatusUpdate(id as string, title, body),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders', 'admin', id] });
        statusUpdateTitle.value = '';
        statusUpdateBody.value = '';
    },
})

const confirmStatusUpdateAdd = (event: any) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to add the update?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            mutateStatusUpdate({ title: statusUpdateTitle.value, body: statusUpdateBody.value });
        },
    });
}

const pristines = ref<number[]>([]);
const selectedGrades = ref<number[]>([]);
const { error: gradeUpdateError, mutate: mutateGradeUpdate, reset: resetGradeUpdate, isPending: isGradeUpdating } = useMutation({
    mutationFn: (index:number) =>{
        const isPristine = pristines.value.includes(index);
        return adminStore.adminRepo.updatePieceGrade(order.value?.pieces![index].id!, selectedGrades.value[index], isPristine)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders', 'admin', id] });
    }
})

const confirmGradeUpdate = (event: any, index:number) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to update the grade?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            mutateGradeUpdate(index);
        },
    });
}




watch(
    () => order.value?.pieces,
    (pieces) => {
        if (pieces) {
            for (let i = 0; i < pieces.length; i++) {
                selectedGrades.value[i] = pieces[i].grade || 1;
                if (pieces[i].isPristine) {
                    pristines.value.push(i);
                }
            }
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <!-- Loading and error states -->
        <div>
            <Button label="Back to Orders" icon="pi pi-arrow-left" @click="navigateTo('/dashboard/admin')" />
        </div>

        <div v-if="isPending">Loading order details...</div>
        <div v-else-if="error">Error loading order: {{ error }}</div>

        <div v-else-if="order" class="flex flex-col gap-6">

            <!-- Order Header -->
            <div class="flex justify-between items-center">
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold">Order #{{ order.public_id }} <span v-if="isOrderUpdating"><i
                                class="pi pi-spin pi-spinner text-xl"></i></span></h1>
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
                </div>
            </div>
            <div class="flex flex-col items-end">
                <div class="flex gap-4">
                    <div>
                        <Select :options="orderStatuses" v-model="chosenStatus" option-label="label"
                            option-value="value" placeholder="Select status" :default-value="order.status" />
                    </div>
                    <div>
                        <Button label="Update Status" @click="mutateOrderStatus(chosenStatus)"></Button>
                    </div>
                    <div v-if="isStatusUpdating" class="flex items-center gap-2">
                        Updating...
                    </div>
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
            <Card v-if="order.statusTracking?.length">
                <template #title>Order Timeline</template>
                <template #content>
                    <Timeline :value="order.statusTracking">
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
                    <div class="flex flex-col gap-2">
                        <div class="text-xl font-semibold mt-4">
                            Add Status Update
                        </div>
                        <div>
                            <InputText type="text" v-model="statusUpdateTitle" placeholder="Title" />
                        </div>
                        <div>
                            <Textarea v-model="statusUpdateBody" placeholder="Description" />
                        </div>
                        <div class="flex gap-2">
                            <div>
                                <Button label="Add Update" @click="confirmStatusUpdateAdd($event)"></Button>
                            </div>
                            <div class="flex items-center" v-if="isStatusUpdateAdding">
                                Adding Status Update...
                            </div>
                            <div class="flex items-center">
                                {{ statusUpdateError }}
                            </div>
                        </div>
                    </div>
                </template>
            </Card>

            <!-- Order Pieces -->
            <Card v-if="order.pieces?.length">
                <template #title>Order Pieces</template>
                <template #content>
                    <DataView :value="order.pieces as Piece[]"
                        v-if="order.pieces !== undefined && order.pieces?.length > 0">
                        <template #list="slotProps">
                            <div class="flex flex-col">
                                <div v-for="(item, index) in slotProps.items" :key="index">
                                    <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                                        :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                                        <div class="md:w-48 relative">
                                            <Carousel :value="item.images" :numVisible="1" :numScroll="1" class="mt-2">
                                                <template #item="slotProps">
                                                    <img :src="slotProps.data" alt="piece image"
                                                        class="w-full mx-auto" />
                                                </template>
                                            </Carousel>
                                            <div class="absolute bg-black/70 rounded-border"
                                                style="left: 4px; top: 4px">
                                                <Tag :value="item.inventoryStatus"
                                                    :severity="formatPieceStatus(item.grade).severity">
                                                    {{ formatPieceStatus(item.grade).label }}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div
                                            class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                                <div>
                                                    <span
                                                        class="font-medium text-surface-500 dark:text-surface-400 text-md">Serial:
                                                        #{{
                                                            item.serialNumber
                                                        }}</span>
                                                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                                </div>
                                                <div>
                                                    {{ item.description }}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="flex flex-row gap-4 mb-4">
                                        <div>
                                            <Select :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                                                v-model="selectedGrades[index]" :default-value="item.grade"></Select>
                                        </div>
                                        <div>
                                            Pristine?
                                            <Checkbox label="isPristine" v-model="pristines" :value="index">
                                            </Checkbox>
                                        </div>
                                        <div>
                                            <Button label="Update Grade" @click="confirmGradeUpdate($event, index)"></Button>
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