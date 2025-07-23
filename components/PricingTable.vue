<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto py-8">
    <div v-for="(tier, i) in tiers" :key="tier.name"
      class="rounded-2xl p-6 flex flex-col items-center bg-white/10 border-gray-500 border-2">
      <div class="text-2xl font-bold mb-2">{{ tier.name }}</div>
      <div class="text-3xl font-semibold mb-1">
        ${{ tier.price }}<span class="text-base font-normal">/ea</span>
      </div>

      <div class="flex justify-center items-end gap-2 my-4 min-h-[140px] h-full">
        <div class="flex flex-row h-full items-center mt-auto">
          <div v-for="index in tier.figures" :key="index">
            <img src="/figure.png" alt="Minifigure" class="h-20 w-auto" />
          </div>
        </div>
      </div>

      <button v-if="tier.membersOnly"
        class="w-full mt-auto py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-lg cursor-not-allowed opacity-80"
        disabled>
        Members Only
      </button>
      <button v-else
        class="w-full mt-auto py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition"
        @click="navigateTo(tier.link)">
        Submit
      </button>
      <button @click="toggleDescription(i)" class=" text-blue-400 hover:text-blue-300 underline mb-2 mt-4">
        <i class="pi pi-chevron-up"  v-if="descriptionVisibility[i]"></i>
        <i class="pi pi-chevron-down" v-else></i>
      </button>

      <!-- Tier Description (Conditional) -->
      <div v-if="descriptionVisibility[i]" class="text-md text-gray-300 mb-4 text-center">
        <div v-html="tier.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

const tiers = ref([
  {
    name: "Bulk",
    price: "24.99",
    figures: 3,
    membersOnly: true,
    link: "/order?type=BULK",
    description:
      "<div>5 figure Minimum - $100 max declared value per figure - Members only</div><div>comes with: grade breakdown, 15 day turnaround time</div>",
  },
  {
    name: "Value",
    price: "29.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=VALUE",
    description:
      "<div>$75 max declared value per figure</div><div>Comes with: grade breakdown, back of the line turnaround time</div>",
  },
  {
    name: "Core",
    price: "34.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=CORE",
    description:
      "<div>$125 max declared value per figure</div><div>Comes with: grade breakdown, 15 day turnaround time after figure is received</div>",
  },
  {
    name: "Plus",
    price: "44.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=PLUS",
    description:
      "<div>$250 max declared value per figure</div><div>Comes with: grade breakdown, 12 day turnaround time after figure is received, case protector</div>",
  },
  {
    name: "Premium",
    price: "64.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=PREMIUM",
    description:
      "<div>$450 max declared value per figure</div><div>Comes with: grade breakdown, 9 day turnaround time after figure is received, case protector</div>",
  },
  {
    name: "Ultimate",
    price: "84.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=ULTIMATE",
    description:
      "<div>$450+ declared value per figure</div><div>Comes with: grade breakdown, 5 day turnaround time after figure is received, case protector</div>",
  },
]);

const descriptionVisibility = reactive(
  Array(tiers.value.length).fill(false),
);

function toggleDescription(index) {
  descriptionVisibility[index] = !descriptionVisibility[index];
}


</script>

<style scoped>
/* Add any specific styles if needed */
img {
  /* Example style to prevent huge images if src is missing */
  max-width: 100%;
  height: auto;
}
</style>
