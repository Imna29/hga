<template>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div class="dark:bg-surface-800 bg-surface-100 p-4 h-full flex flex-col gap-4 rounded-2xl">
            <div class="text-3xl font-bold">
                Economy
            </div>
            <div class="text-lg">
                Grade up to 4 figures for less with a longer turnaround time.
            </div>
            <div class="text-5xl">
                $24.75
            </div>
            <div class="flex justify-center flex-nowrap mt-auto">
                <img src="/economy.png" class="w-1/3" alt="Economy">
            </div>
            <div class="mt-auto">
                <Button @click="navigateTo('/order?type=economy')"><span class="text-xl">Submit</span></Button>
            </div>
        </div>


        <div class="dark:bg-surface-800 bg-surface-100 p-4 h-full flex flex-col gap-4 rounded-2xl">
            <div class="text-3xl font-bold">
                Core
            </div>
            <div class="text-lg">
                Grade up to 4 figures with our core service
            </div>
            <div class="text-5xl">
                $29.75
            </div>
            <div class="flex justify-center flex-nowrap mt-auto">
                <img src="/economy.png" class="w-1/3" alt="Economy">
            </div>
            <div class="">
                <Button @click="navigateTo('/order?type=core')"><span class="text-xl">Submit</span></Button>
            </div>
        </div>

        <div class="dark:bg-surface-800 bg-surface-100 p-4 h-full flex flex-col gap-4 rounded-2xl">
            <div class="text-3xl font-bold">
                Bulk
            </div>
            <div class="text-lg">
                Grade 5 or more figures at once and save on each
            </div>
            <div class="text-5xl ">
                $19.75
            </div>
            <div class="flex justify-center mt-auto  flex-nowrap">
                <img src="/economy.png" class="w-1/3" alt="Economy">
                <img src="/economy.png" class="w-1/3" alt="Economy">
                <img src="/economy.png" class="w-1/3" alt="Economy">
            </div>
            <div class="">
                <Button @click="navigateTo('/order?type=bulk')"><span class="text-xl">Submit</span></Button>
            </div>
        </div>
    </div>
</template>
<script>

</script>