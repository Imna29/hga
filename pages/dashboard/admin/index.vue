<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

definePageMeta({
    layout: 'dashboard-layout',
    name: 'Admin Dashboard',
    middleware: 'admin'
});

const adminStore = useAdminStore();

const { data: ordersData } = useQuery({
    queryKey: ['orders', 'admin'],
    queryFn: () => adminStore.adminRepo.getOrders(),
});

// Filter setup
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    public_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    serviceType: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    '_count.pieces': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'payment.amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
});

const statusOptions = ['PENDING_PAYMENT', 'AWAITING_SHIPMENT', 'IN_GRADING', 'GRADING_COMPLETE', 'SHIPPED_BACK'];

const serviceTypeOptions = ['ECONOMY', 'CORE', 'BULK'];

const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        public_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        serviceType: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        '_count.pieces': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'payment.amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
    };
};

</script>

<template>
    <div>
        <DataTable v-model:filters="filters" :value="ordersData" filterDisplay="menu"
            :globalFilterFields="['public_id', 'status', 'serviceType', '_count.pieces', 'payment.amount', 'createdAt']"
            class="w-full" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
            <template #header>
                <div class="flex justify-between items-center">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Global Search" />
                    </IconField>
                </div>
            </template>

            <Column field="public_id" header="Id" class="w-1/6">
                <template #body="slotProps">
                    <NuxtLink :to="`/dashboard/admin/${slotProps.data.id}`" class="text-blue-500">
                        {{ slotProps.data.public_id }}
                    </NuxtLink>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by ID" />
                </template>
            </Column>

            <Column field="status" header="Status" class="w-1/6" sortable>
                <template #body="slotProps">
                    <Tag :severity="formatStatus(slotProps.data.status).severity">
                        {{ formatStatus(slotProps.data.status).label }}
                    </Tag>
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statusOptions" placeholder="Select Status"
                        class="p-column-filter" showClear />
                </template>
            </Column>

            <Column field="serviceType" header="Service Type" class="w-1/6" sortable>
                <template #body="slotProps">
                    {{
                        slotProps.data.serviceType.charAt(0).toUpperCase() +
                        slotProps.data.serviceType.slice(1).toLowerCase()
                    }}
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="serviceTypeOptions" placeholder="Select Service"
                        class="p-column-filter" showClear />
                </template>
            </Column>

            <Column field="_count.pieces" dataType="numeric" header="Pieces" sortable>
                <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" mode="decimal" placeholder="Search Pieces" />
                </template>
            </Column>

            <Column field="payment.amount" dataType="numeric" header="Total" sortable>
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
                <template #filter="{ filterModel }">
                    In Cents:
                    <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" :useGrouping="false"
                        :maxFractionDigits="0" />
                </template>
            </Column>

            <Column field="createdAt" header="Created At" dataType="date" class="w-1/6" sortable>
                <template #body="slotProps">
                    {{
                        new Date(slotProps.data.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })
                    }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="yy-mm-dd" placeholder="yy/mm/dd" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>