<script setup lang="ts">
import { Flame } from "lucide-vue-next";
import { Gift } from "lucide-vue-next";

const certNumber = ref("");
</script>
<template>
  <div>
    <div class="w-full md:grid grid-cols-2 h-[500px]">
      <div>
        <img
          src="/case_new.svg"
          alt="hero"
          class="object-cover h-full w-full"
        />
      </div>
      <div class="mt-20 pr-10">
        <h1 class="text-6xl font-bold text-right">Immortalize Perfection.</h1>
        <h2 class="text-4xl font-bold mt-4 text-right">
          Elevate your collection!
        </h2>

        <div class="ml-auto w-fit flex gap-2">
          <button
            class="mt-4 py-3 px-4 rounded-full font-medium !bg-[#0A7CFF]"
            size="large"
            @click="navigateTo('/order')"
          >
            <span class="text-xl flex gap-2">
              <Flame class="fill-white" />
              Start Now
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="grid gap-24 relative">
      <div
        class="grid md:w-7/12 w-3/4 md:grid-cols-2 grid-cols-1 mx-auto md:gap-24 gap-8 mt-32"
      >
        <div
          class="flex flex-col gap-4 text-center bg-white p-4 bg-opacity-10 rounded-2xl border-gray-500 border-2"
        >
          <div class="text-5xl font-semibold leading-normal">Who Are We?</div>
          <div class="text-lg">
            HFA, the world’s leading experts in minifigure grading, introduce a
            thrilling new dimension to the minifigure collecting community.
            Enhance your collection by having your figures authenticated,
            graded, and preserved in our custom-designed acrylic cases, serving
            as both protection and a stunning display for your prized
            collection.
          </div>
        </div>
        <div
          class="flex flex-col gap-4 bg-white p-4 bg-opacity-10 rounded-2xl border-gray-500 border-2"
        >
          <div class="text-5xl font-semibold leading-normal text-center">
            How It Works
          </div>
          <div class="text-lg px-4">
            <div class="mx-auto w-fit">
              <ul class="list-disc mx-auto">
                <li>
                  Submit your figure(s) by shipping them to HFA for grading
                </li>
                <li>
                  Track the status of your submission through the HFA dashboard
                  to see what step it's on and when it’s headed back to you
                </li>
                <li>
                  Enjoy your returned submission in their brand new graded cases
                </li>
              </ul>
            </div>
          </div>
          <div class="">For more help, visit the FAQ</div>
        </div>
      </div>
      <div
        class="w-3/4 mx-auto text-center bg-white py-24 bg-opacity-10 rounded-xl border-gray-500 border-2"
      >
        <div class="text-5xl font-semibold">Cert Number Lookup</div>
        <div class="text-2xl mt-4">
          Enter cert number found on graded case to view extra Information on
          your item
        </div>
        <IconField class="w-1/2 mx-auto mt-4">
          <InputIcon class="pi pi-search" />
          <form @submit.prevent="navigateTo(`/certificate/${certNumber}`)">
            <InputNumber
              class="w-full h-[60px]"
              placeholder="Enter Cert Number"
              size="large"
              v-model="certNumber"
              inputId="withoutgrouping"
              :useGrouping="false"
              fluid
            />
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
          <i
            class="pi pi-facebook text-6xl text-blue-500"
            style="font-size: 3.75rem !important"
          ></i>
        </div>
        <a
          href="https://x.com/hfagrading"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <i
              class="pi pi-twitter text-6xl dark:text-white"
              style="font-size: 3.75rem !important"
            ></i>
          </div>
        </a>
        <a
          href="https://www.instagram.com/hfagrading/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <i
              class="pi pi-instagram text-6xl text-pink-500"
              style="font-size: 3.75rem !important"
            ></i>
          </div>
        </a>
        <div>
          <i
            class="pi pi-youtube text-6xl text-red-700"
            style="font-size: 3.75rem !important"
          ></i>
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
  background: radial-gradient(
    circle at center,
    rgba(0, 123, 255, 0.4) 0%,
    rgba(0, 123, 255, 0.2) 40%,
    rgba(0, 123, 255, 0) 80%
  );
  z-index: 0;
  pointer-events: none;
}
</style>
