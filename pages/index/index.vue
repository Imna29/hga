<script setup lang="ts">
import { Flame } from "lucide-vue-next";
import { Gift } from "lucide-vue-next";

const certNumber = ref<number | null>(null);

// Add Mailchimp script only on homepage
useHead({
  script: [
    {
      innerHTML: `
        !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/82802ff2a9b499a1571e0313f/29ed72291cf199b209102af96.js");
      `,
      type: 'text/javascript',
      id: 'mcjs'
    }
  ]
});
</script>
<template>
  <div>

    <div class="w-full md:grid grid-cols-2 h-[500px]">
      <div>
        <img src="/case_new.svg" alt="hero" class="object-cover h-full w-full" />
      </div>
      <div class="mt-20 pr-10">
        <ClientOnly>
          <BlurReveal>
            <h1 class="text-6xl font-bold text-center">Immortalize Perfection.</h1>
          </BlurReveal>
        </ClientOnly>
        <RadiantText :duration="5"
          class="block items-end justify-end w-full text-4xl mt-4  transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          Elevate your collection!
        </RadiantText>

        <div class="mx-auto w-fit flex gap-2">
          <ShimmerButton class="shadow-2xl mt-4 py-3 px-4 rounded-full font-medium !bg-[#0A7CFF]" shimmer-size="4px"
            size="large" @click="navigateTo('/order')">
            <span class="text-xl flex gap-2 text-white">
              <Flame class="fill-white stroke-0" />
              Start Now
            </span>
          </ShimmerButton>
        </div>
      </div>
    </div>
    <div class="grid gap-24 relative">
      <div class="grid md:w-7/12 w-3/4 md:grid-cols-2 grid-cols-1 mx-auto md:gap-24 gap-8 mt-32">
        <div class="relative flex flex-col gap-6 text-center bg-white/10 p-8 rounded-2xl ">
          <GlowBorder :color="['#0A7CFF', '#1a36b4', '#4A90E2']"/>
          <div class="text-5xl font-semibold leading-normal">Who Are We?</div>
          <div class="text-lg px-4">
            HFA, the world's leading experts in minifigure grading, introduce a
            thrilling new dimension to the minifigure collecting community.
            Enhance your collection by having your figures authenticated,
            graded, and preserved in our custom-designed acrylic cases, serving
            as both protection and a stunning display for your prized
            collection.
          </div>
        </div>
        <div class="relative flex flex-col gap-6 bg-white/10 p-8 rounded-2xl ">
          <GlowBorder :color="['#0A7CFF', '#1a36b4', '#4A90E2']"/>
          <div class="text-5xl font-semibold leading-normal text-center">
            How It Works
          </div>
          <div class="text-lg px-6">
            <div class="mx-auto w-fit">
              <ul class="list-disc mx-auto space-y-2">
                <li>
                  Submit your figure(s) by shipping them to HFA for grading
                </li>
                <li>
                  Track the status of your submission through the HFA dashboard
                  to see what step it's on and when it's headed back to you
                </li>
                <li>
                  Enjoy your returned submission in their brand new graded cases
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-2">For more help, visit the FAQ</div>
        </div>
      </div>
      <div class="w-3/4 mx-auto text-center bg-white/10 py-24 rounded-xl border-gray-500 border-2 relative">
        <GlowBorder :color="['#0A7CFF', '#1a36b4', '#4A90E2']"/>
        <div class="text-5xl font-semibold">Cert Number Lookup</div>
        <div class="text-2xl mt-4">
          Enter cert number found on graded case to view extra Information on
          your item
        </div>
        <IconField class="w-1/2 mx-auto mt-4">
          <InputIcon class="pi pi-search" />
          <form @submit.prevent="navigateTo(`/certificate/${certNumber}`)">
            <InputNumber class="w-full h-[60px]" placeholder="Enter Cert Number" size="large" v-model="certNumber"
              inputId="withoutgrouping" :useGrouping="false" fluid />
            </form>
        </IconField>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center mt-24 gap-12">
      <div class="text-5xl font-bold">Why HFA</div>
      <div class="grid md:grid-cols-3 grid-cols-1">
        <div class="grid gap-10 w-full md:w-10/12 mx-auto text-center">
          <div class="text-3xl font-semibold">Collectability</div>
          <div class="text-lg">
            Grading your figure(s) with HFA adds a level of collectability and
            desirability based on their received grade, especially that
            <span class="font-bold">pristine 10</span>
          </div>
        </div>
        <div class="grid gap-10 w-full md:w-10/12 mx-auto text-center">
          <div class="text-3xl font-semibold">Security</div>
          <div class="text-lg">
            Our cases and authenticity guarantees offer new layers of physical
            protection and piece of mind to know your figures are the real deal
          </div>
        </div>
        <div class="grid gap-10 w-full md:w-10/12 mx-auto text-center">
          <div class="text-3xl font-semibold">Value</div>
          <div class="text-lg">
            Increased collectability, security, and every aspect of these
            factors contribute to the intrinsic value of your prized figure(s),
            enhancing their desirability and value
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24 text-center">
      <h1 class="text-5xl font-bold">Start Now!</h1>
      <h3 class="text-lg mt-4">
        Start your submission today to elevate your collection!
      </h3>
      <PricingTable class="mt-4" />
    </div>
    <div class="w-1/2 text-center mx-auto mt-32">
      <div class="text-5xl font-bold">Our Socials</div>
      <div class="text-lg mt-2">
        Check out our socials and stay up to date on everything HFA!
      </div>
      <div class="mt-4 flex justify-center gap-8">
        <div>
          <i class="pi pi-facebook text-6xl text-blue-500" style="font-size: 3.75rem !important"></i>
        </div>
        <a href="https://x.com/hfagrading" target="_blank" rel="noopener noreferrer">
          <div>
            <i class="pi pi-twitter text-6xl dark:text-white" style="font-size: 3.75rem !important"></i>
          </div>
        </a>
        <a href="https://www.instagram.com/hfagrading/" target="_blank" rel="noopener noreferrer">
          <div>
            <i class="pi pi-instagram text-6xl text-pink-500" style="font-size: 3.75rem !important"></i>
          </div>
        </a>
        <div>
          <i class="pi pi-youtube text-6xl text-red-700" style="font-size: 3.75rem !important"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-bg {
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle at center,
      rgba(0, 123, 255, 0.4) 0%,
      rgba(0, 123, 255, 0.2) 40%,
      rgba(0, 123, 255, 0) 80%);
  z-index: 0;
  pointer-events: none;
}
</style>
