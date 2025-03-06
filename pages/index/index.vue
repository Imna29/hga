<script setup lang="ts">
import { Flame } from 'lucide-vue-next';
import { Gift } from 'lucide-vue-next';

const certNumber = ref("");
</script>
<template>
    <div>
        <div class="w-full md:grid grid-cols-2 h-[500px]">
            <div>
                <img src="/case.png" alt="hero" class="object-cover h-full w-full" />
            </div>
            <div class="mt-20 pr-10">
                <h1 class="text-6xl font-bold text-right">
                    Immortalize Perfection.
                </h1>
                <h2 class="text-4xl font-bold mt-4 text-right">
                    Elevate your collection!
                </h2>

                <div class="ml-auto w-fit flex gap-2">
                    <button class="mt-4 py-3 px-4 rounded-full font-medium !bg-[#0A7CFF]" size="large">
                        <span class="text-xl flex gap-2">
                            <Flame class="fill-white" />
                            Start Now
                        </span>
                    </button>
                    <button class="mt-4 py-3 px-4 rounded-full font-medium flex gap-2 text-xl" size="large" style="
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)),
                radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.06) inset,
                1px 1px 0px 0px rgba(255, 255, 255, 0.08) inset,
                0px 8px 40px -20px rgba(255, 255, 255, 0.2);
  ">
                        <span class="flex gap-2">
                            <Gift class="text-[#1F87FF]"/>
                            Try Demo
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-1/2 mx-auto text-center">
            <p class="text-2xl mt-8">
                HFA, the world’s leading experts in minifigure grading, introduce a thrilling new dimension to the
                minifigure collecting community. Enhance your collection by having your figures authenticated,
                graded, and preserved in our custom-designed acrylic cases, serving as both protection and a
                stunning display for your prized collection.
            </p>
        </div>
        <div class="flex justify-center mt-96">
            <div class="w-3/4  text-center dark:bg-surface-800 bg-surface-100 py-24 bg-opacity-80 rounded-xl">
                <div class="text-5xl">Cert Number Lookup</div>
                <div class="text-2xl mt-4">Enter cert number found on graded case to view extra Information on your
                    item
                </div>
                <IconField class="w-1/2 mx-auto mt-4 ">
                    <InputIcon class="pi pi-search" />
                    <InputText class="w-full h-[60px]" v-model="certNumber" placeholder="Enter Cert Number"
                        size="large" />
                </IconField>
            </div>
        </div>
        <div class="mt-48 text-center">
            <h1 class="text-5xl font-bold">Start Now!</h1>
            <h3 class="text-lg  mt-4">Start your submission today to elevate your collection!</h3>
            <PricingTable class="mt-4" />
        </div>
        <div class="w-1/2  text-center mx-auto mt-32">
            <div class="text-5xl font-bold">Our Socials</div>
            <div class="text-lg mt-2">Check out our socials and stay up to date on everything HFA!
            </div>
            <div class="mt-4 flex justify-center gap-8">
                <div>
                    <i class="pi pi-facebook text-6xl text-blue-500" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-twitter text-6xl dark:text-white" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-instagram text-6xl text-pink-500" style="font-size: 3.75rem !important;"></i>
                </div>
                <div>
                    <i class="pi pi-youtube text-6xl text-red-700" style="font-size: 3.75rem !important; "></i>
                </div>
            </div>
        </div>

    </div>
</template>
