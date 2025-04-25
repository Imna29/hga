<script lang="ts" setup>
</script>

<template>
  <div class="py-4 px-4 sm:px-6 lg:px-8 text-gray-100">
    <div class="text-3xl font-bold mt-8 md:w-1/2 mx-auto text-center mb-4">
      Thank you for your order! You can view your order status on the Orders
      page in the dashboard.
    </div>

    <div
      class="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full p-8 space-y-8 mx-auto"
    >
      <h1 class="text-3xl font-bold text-blue-400 mb-2">
        Shipping Instructions
      </h1>
      <p class="text-gray-300 mb-6">
        Once you've submitted your submission form, follow these steps to send
        in your figure(s):
      </p>

      <ol class="space-y-8 list-decimal list-inside text-gray-300">
        <li>
          <h2 class="font-semibold text-lg text-blue-400 mb-2">
            Package Your Figure(s) Carefully
          </h2>
          <ul
            class="list-disc list-inside ml-4 text-gray-400 mt-2 space-y-2"
          >
            <li>Place each minifigure in a separate container or zip bag.</li>
            <li>
              <span class="italic text-blue-400">
                We recommend disassembling your figure(s) before packing to
                prevent damage during transit.
              </span>
            </li>
          </ul>
        </li>

        <li>
          <h2 class="font-semibold text-lg text-blue-400 mb-2">
            Prepare for Shipping
          </h2>
          <ul
            class="list-disc list-inside ml-4 text-gray-400 mt-2 space-y-2"
          >
            <li>
              Place the individually packaged figure(s) into a bubble mailer or
              a box with padding for protection.
            </li>
            <li>
              Before sealing, write down your
              <span class="font-semibold text-blue-300">order number</span>
              and include it inside the package. Your order number can be found
              in your dashboard at
              <a
                href="https://hfagrading.com/dashboard"
                class="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
              >
                hfagrading.com/dashboard
              </a>
              .
            </li>
          </ul>
        </li>

        <li>
          <h2 class="font-semibold text-lg text-blue-400 mb-2">Ship To:</h2>
          <div
            class="bg-gray-700 border border-gray-600 rounded-lg p-4 mt-2 text-gray-100"
          >
            <p>Hexqo Grading Authority LLC</p>
            <p>PO Box 8078</p>
            <p>Philadelphia, PA 19101</p>
          </div>
        </li>

        <li>
          <h2 class="font-semibold text-lg text-blue-400 mb-2">
            Track Your Order
          </h2>
          <p class="text-gray-400 mt-2">
            Once your figure(s) are received, you can track the status of your
            submission through your dashboard at
            <a
              href="https://hfagrading.com/dashboard"
              class="text-blue-400 hover:text-blue-300 underline"
              target="_blank"
            >
              hfagrading.com/dashboard
            </a>
            .
          </p>
        </li>
      </ol>
    </div>

    <div class="mx-auto w-fit mt-8">
      <NuxtLink to="/dashboard/orders">
        <Button class="text-white" size="large">View Orders</Button>
      </NuxtLink>
    </div>
  </div>
</template>
