<script setup lang="ts">
import PricingTable from "~/components/PricingTable.vue";

const certNumber = ref("");
</script>
<template>
    <div>
        <div class="w-full md:grid grid-cols-2 h-[700px]">
            <div class="mt-20 pr-20">
                <h1 class="text-6xl font-bold">
                    Immortalize
                    Perfection.
                </h1>
                <h2 class="text-2xl font-bold mt-4">
                    Elevate your collection!
                </h2>
                <p class="text-lg mt-4">
                    HGA, the world’s leading experts in minifigure grading, introduce a thrilling new dimension to the
                    minifigure collecting community. Enhance your collection by having your figures authenticated,
                    graded, and preserved in our custom-designed acrylic cases, serving as both protection and a
                    stunning display for your prized collection.
                </p>
                <Button class="mt-4">
                    Start Your Collection
                </Button>
            </div>
        </div>
        <div class="flex justify-center mt-10">
            <div class="w-3/4  text-center">
                <div class="text-5xl">Cert Number Lookup</div>
                <div class="text-lg mt-2">Enter cert number found on graded case to view extra Information on your
                    item
                </div>
                <IconField class="w-1/2 mx-auto mt-2">
                    <InputIcon class="pi pi-search" />
                    <InputText class="w-full" v-model="certNumber" placeholder="Enter Cert Number" />
                </IconField>
            </div>
        </div>
        <div class="w-1/2  text-center mx-auto mt-48">
            <div class="text-5xl">Our Socials</div>
            <div class="text-lg mt-2">Check out our socials and stay up to date on everything HGA!
            </div>
            <div class="mt-4 flex justify-center gap-8">
                <div>
                    <i class="pi pi-facebook text-6xl text-blue-500" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-twitter text-6xl text-white" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-instagram text-6xl text-pink-500" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-youtube text-6xl text-red-700" style="font-size: 3.75rem !important; "></i>
                </div>
            </div>
        </div>
        <div class="mt-48 text-center">
            <h1 class="text-5xl font-bold">Start Now!</h1>
            <h3 class="text-lg font-bold mt-4">Start your submission today to elevate your collection!</h3>
            <PricingTable class="mt-4" />
        </div>
    </div>
</template>
