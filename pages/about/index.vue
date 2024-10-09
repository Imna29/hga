<script lang="ts" setup>
const events = ref([
  { status: 'Ordered', icon: 'pi pi-shopping-cart', color: '#9C27B0', desciption: "You place an order for a minifigure grading service with the HGA team." },
  { status: 'Shipped', icon: 'pi pi-truck', color: '#FF9800', desciption: "You shipped your minifigure to us. We are currently waiting to receive your package." },
  { status: 'Received', icon: 'pi pi-check', color: '#9C27B0', desciption: "We received your package and are currently processing your order." },
  { status: 'Grading', icon: 'pi pi-cog', color: '#FF9800', desciption: "We are grading your minifigure and will send you a confirmation email once your minifigure is graded." },
  { status: "Packing", icon: 'pi pi-box', color: '#9C27B0', desciption: "We are packing your minifigure in one of our custom-designed acrylic cases." },
  { status: 'Shipped', icon: 'pi pi-send', color: '#FF9800', desciption: "We shipped the minifigure back to you in a custom-designed acrylic case. We will send you a tracking number once your minifigure is processed by our fulfillment team." },
  { status: 'Delivered', icon: 'pi pi-verified', color: '#097969', desciption: "Your minifigure is delivered to you. You can now display your minifigure in your home or office." },
]);
</script>

<template>
  <div>
    <div class="text-5xl font-bold text-center mt-10">
      About Us
    </div>
    <div class="text-center mt-10 w-3/4 mx-auto text-lg font-sem">
      Welcome to HGA—the world's leading experts in LEGO® minifigure grading. Born out of a passion for collecting and
      preserving the tiny icons of creativity, we bring a thrilling new dimension to the minifigure community. Our
      mission is simple: to enhance your collection by providing top-notch authentication, grading, and preservation
      services, all showcased in our custom-designed acrylic cases. These cases not only protect your prized figures but
      also turn them into stunning display pieces.
    </div>
    <div class="text-center mt-10 w-3/4 mx-auto text-2xl font-sem">
      How it works
    </div>
    <Timeline :value="events" align="alternate" class="customized-timeline mt-2">
      <template #marker="slotProps">
        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
          :style="{ backgroundColor: slotProps.item.color }">
          <i :class="slotProps.item.icon"></i>
        </span>
      </template>
      <template #content="slotProps">
        <Card class="mt-4">
          <template #title>
            {{ slotProps.item.status }}
          </template>

          <template #content>
            <img v-if="slotProps.item.image"
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`"
              :alt="slotProps.item.name" width="200" class="shadow-sm" />
            <p>
              {{ slotProps.item.desciption }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>

  </div>
</template>


<style scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row;

      .p-timeline-event-content {
        text-align: left;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }
  }
}
</style>