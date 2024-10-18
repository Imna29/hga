<script setup lang="ts">
import { CircleUserRound } from 'lucide-vue-next';

const router = useRouter();
const items = ref([
    {
        label: "Home",
        icon: "pi pi-home",
        to: "/"
    },
    {
        label: "Services",
        icon: "pi pi-hammer",
        to: "/services"
    },
    {
        label: "How We Grade",
        icon: "pi pi-star",
        to: "/how-we-grade"
    },
    {
        label: "About Us",
        icon: "pi pi-user",
        to: "/about"
    },
    {
        label: "Hobby News",
        icon: "pi pi-book",
        to: "/hobby-news"
    },
    {
        label: "More",
        icon: "pi pi-ellipsis-h",
        items: [

            {
                label: "Help & Contact",
                icon: "pi pi-question",
                to: "/contact"
            },
            {
                label: "FAQ",
                icon: "pi pi-info-circle",
                to: "/contact#faq"
            }
        ]
    }
]);
</script>

<template>
    <div class="background">
        <div class="container mx-auto pt-2">
            <Menubar :model="items" class=" pb-2">
                <template #start>
                    <div>
                        <NuxtLink to="/" class="font-mono text-4xl logo mr-5">
                            HGA
                        </NuxtLink>
                    </div>
                </template>
                <template #item="{ item, props, hasSubmenu, root }">
                    <NuxtLink class="flex items-center" v-bind="props.action" :to="item.to">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                    </NuxtLink>
                </template>
                <template #end>
                    <div class="flex items-center gap-4">
                        <Button>Submit</Button>
                        <CircleUserRound class="cursor-pointer":size="32"/>
                    </div>
                </template>
            </Menubar>
            <slot />
            <div class="mt-16 pb-4 flex">
                <NuxtLink to="/" class="font-mono text-4xl logo mr-5">
                    HGA
                </NuxtLink>


                <div class="ml-auto">
                    HGAfigs@gmail.com

                    |

                    +1 (475) 251-3265

                    |

                    © 2024 HexqoLLC All rights reserved.
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

.background {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/public/background4.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}
</style>
