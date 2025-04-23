<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto py-8">
    <div v-for="(tier, i) in tiers" :key="tier.name"
      class="rounded-2xl p-6 flex flex-col items-center  bg-white bg-opacity-10 border-gray-500 border-2">
      <div class="text-2xl font-bold mb-2">{{ tier.name }}</div>
      <div class="text-3xl font-semibold mb-1">${{ tier.price }}<span class="text-base font-normal">/ea</span></div>
      <div class="flex justify-center items-end gap-2 my-4 min-h-[140px] h-full">
        <div class="flex flex-row h-full items-center mt-auto">
          <img v-for="i in Array(tier.figures)" :key="i" class="w-full" src="/economy.png" alt="Minifigure" />
        </div>
      </div>
      <button v-if="tier.membersOnly"
        class="w-full py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-lg cursor-not-allowed opacity-80"
        disabled>
        Members Only
      </button>
      <button v-else
        class="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition"
        @click="navigateTo(tier.link)">
        Submit
      </button>
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl text-blue-400">
        <span>&#8964;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const tiers = [
  {
    name: "Bulk",
    price: "24.99",
    figures: 3,
    membersOnly: true,
    link: "/order?type=BULK",
  },
  {
    name: "Value",
    price: "29.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=VALUE",
  },
  {
    name: "Core",
    price: "34.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=CORE",
  },
  {
    name: "Plus",
    price: "44.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=PLUS",
  },
  {
    name: "Premium",
    price: "64.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=PREMIUM",
  },
  {
    name: "Ultimate",
    price: "84.99",
    figures: 1,
    membersOnly: false,
    link: "/order?type=ULTIMATE",
  },
];

function navigateTo(link) {
  useRouter().push(link);
}
</script>