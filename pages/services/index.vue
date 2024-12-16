<script setup lang="ts">

</script>

<template>
    <div>
        <div class="text-5xl font-bold text-center mt-4">
            Our Services
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
            <div class="dark:bg-surface-800 bg-surface-400 p-4 gap-4 rounded-2xl w-3/4 ml-auto mr-5">
                <img src="/economy.png" class="mx-auto" alt="Economy" />
            </div>
            <div class="p-4 gap-4 rounded-2xl w-3/4 ml-5 my-auto">
                <div class="text-3xl font-bold">
                    Standard Figure
                </div>
                <div class="mt-4">
                    Our standard figure grading service is designed for the average sized LEGO minifigure. This includes
                    most minifigures produced by LEGO and is capped at a width of 1 1/8in, a height of 2in, and a depth
                    of 3/4in. Figures submitted should fit within the listed dimensions including wearable accessories,
                    hats, hair, helmets, etc…
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
            <div class=" p-4 gap-4 rounded-2xl w-3/4 ml-auto mr-5 my-auto">
                <div class="text-3xl font-bold">
                    Tall Figure
                </div>
                <div class="mt-4">
                    Our tall figure grading service is designed for figures that exceed the height limits of our
                    standard cases. This may include minifigures with parts or accessories that increase the figure’s
                    height. This service is capped at a width of 1 1/2in, a height of 2 1/2in, and a depth of 1 1/8in.
                    Figures submitted should fit within the listed dimensions including wearable accessories, hats,
                    hair, helmets, etc…

                </div>
            </div>
            <div class="dark:bg-surface-800 bg-surface-400 p-4 gap-4 rounded-2xl w-3/4 ml-5 mr-auto">
                <img src="/economy.png" class="mx-auto" alt="Economy" />
            </div>

        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
            <div class="dark:bg-surface-800 bg-surface-400 p-4 gap-4 rounded-2xl w-3/4 ml-auto mr-5">
                <img src="/economy.png" class="mx-auto" alt="Economy" />
            </div>
            <div class="p-4 gap-4 rounded-2xl w-3/4 ml-5 my-auto">
                <div class="text-3xl font-bold">
                    Big Figure
                </div>
                <div class="mt-4">
                    Our Big Figure grading service is designed for LEGO big figs. These are figures that exceed the
                    limits of all our other cases and are capped at a width of 3 1/2in, a height of 3 1/2in, and a depth
                    of 2 1/4in. As with our other submission types, figures must fit in the listed dimensions including
                    accessories, hats, hair, helmets, etc… must fit in the listed dimensions.

                </div>
            </div>
        </div>
        <div class="mt-20 text-center">
            <div class="text-5xl font-bold">
                Our Pricing
            </div>
            <PricingTable class="mt-8" />
        </div>
    </div>
</template>

<style scoped></style>