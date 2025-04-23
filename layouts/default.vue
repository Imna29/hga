<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    label: "Services",
    to: "/services"
  },
  {
    label: "How We Grade",
    to: "/how-we-grade"
  },
  {
    label: "About Us",
    to: "/about"
  },
  {
    label: "Hobby News",
    to: "/hobby-news"
  },
  {
    label: "More",
    items: [
      {
        label: "Help & Contact",
        to: "/contact"
      },
      {
        label: "FAQ",
        to: "/contact#faq"
      }
    ]
  }
]);

function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="background dark:bg-black relative z-0 overflow-hidden">
    <!-- Background gradient image -->
    <div class="absolute -z-10">
      <img src="/gradient.png" alt="Gradient Background" />
    </div>
    <div class="absolute -z-10 ">
      <img src="/gradient-2.png" class="w-fit object-contain opacity-60" alt="Gradient Background" />
    </div>
    <div class="absolute -z-10 ">
      <img src="/gradient-3.png" class="w-fit object-contain opacity-60" alt="Gradient Background" />
    </div>

    <!-- Background stars image -->
    <div class="absolute -z-10">
      <img src="/stars.png" alt="Gradient Background" />
    </div>

    <div class="container mx-auto pt-2 min-h-dvh">
      <!-- Navbar Container -->
      <div class=" p-4 flex items-center justify-between">
        <!-- Left: Logo -->
        <div>
          <NuxtLink to="/" class="font-mono text-4xl logo">
            HFA
          </NuxtLink>
        </div>

        <!-- Center: Menu Items -->
        <div class="bg-white/10 py-3 px-8 rounded-full">
          <nav class="flex gap-6">
            <template v-for="item in items" :key="item.label">
              <!-- Simple link item -->
              <NuxtLink v-if="item.to" :to="item.to"
                class="text-black dark:text-color p-1 hover:bg-white/10 hover:rounded-3xl">
                <span>{{ item.label }}</span>
              </NuxtLink>

              <!-- Dropdown for item with sub-items -->
              <div v-else class="relative group flex items-center gap-2">
                <span class="text-black dark:text-color  cursor-pointer">
                  <span>{{ item.label }}</span>
                </span>
                <div
                  class="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded hidden group-hover:block">
                  <template v-for="subItem in item.items" :key="subItem.label">
                    <NuxtLink :to="subItem.to"
                      class="block px-4 py-2 text-black dark:text-color hover:bg-gray-100 dark:hover:bg-gray-700">
                      {{ subItem.label }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
            </template>
          </nav>
        </div>

        <!-- Right: Sign In Button -->
        <div class="flex gap-4">
          <SignedOut>
            <button @click="navigateTo('/sign-in')">
              Login
            </button>
          </SignedOut>
          <SignedIn>
            <button @click="navigateTo('/dashboard')">
              Dashboard
            </button>
          </SignedIn>
          <button class="sign-in-btn" @click="navigateTo('/sign-in')">
            Start Now
          </button>
        </div>
      </div>

      <!-- Main Content Slot -->
      <slot />

      <!-- Footer -->
      <div class="mt-16 pb-4 flex">
        <NuxtLink to="/" class="font-mono text-4xl logo mr-5">
          HFA
        </NuxtLink>
        <div class="ml-auto">
          HFAfigs@gmail.com | +1 (475) 251-3265 | © 2024 HexqoLLC All rights
          reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: "Bebas Neue", monospace;
  letter-spacing: 0.1em;
}

.light-mode .background {
  background-image: linear-gradient(rgba(246, 245, 236, 0.9),
      rgba(246, 245, 236, 0.9)),
    url("/public/background4.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.sign-in-btn {
  border: 2px solid #007bff;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: white;
  /* The radial gradient gives an inward shadow effect
     from the blue border toward the text */
  background: radial-gradient(ellipse at center,
      #fff 1%,
      rgba(0, 123, 255, 0.1) 1%);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  box-shadow: inset 0 0 6px rgba(0, 123, 255, 0.3);
}

.sign-in-btn:hover {
  box-shadow: inset 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>
