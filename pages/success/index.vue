<script lang="ts" setup>

</script>

<template>
    <div>
        <div class="text-3xl font-bold mt-8 md:w-1/2 mx-auto text-center">
            Thank you for your order! You can view your order status on the Orders page in the dashboard.
        </div>
        <div class="mx-auto w-fit mt-4">
            <NuxtLink to="/dashboard/orders">
                <Button>View Orders</Button>
            </NuxtLink>
        </div>
    </div>
</template>