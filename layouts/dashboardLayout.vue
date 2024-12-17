<script lang="ts" setup>

const navMenuItems = [
    {
        label: "Dashboard",
        icon: "pi pi-warehouse",
        to: "/dashboard"
    },
    {
        label: "Orders",
        icon: "pi pi-shopping-cart",
        to: "/dashboard/orders"
    },
    {
        label: "Figures",
        icon: "pi pi-image",
        to: "/dashboard/figures"
    }
];

const user = useUser();
const auth = useAuth();

const signOut = async () => {
    await auth.signOut.value();
    navigateTo("/");
};
</script>
<template>
    <div>
        <SignedIn>
            <div class="mx-auto mt-8 sm:px-8 px-2 md:px-16">
                <div class="grid grid-cols-12">
                    <div class="col-span-2 dark:bg-surface-800 bg-surface-100 rounded-xl p-4 md:block hidden h-fit">
                        <div class="flex justify-between">
                            <div class="logo text-5xl p-2">HAN</div>
                            <div class="">
                                <NuxtLink to="/">
                                    <i class="pi pi-home p-2 hover:bg-surface-300 rounded-xl cursor-pointer" />
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <NuxtLink v-for="item in navMenuItems" :key="item.label" :to="item.to">
                                <div
                                    class="dark:hover:bg-surface-700 hover:bg-surface-200 p-2 text-lg rounded-md lg:text-start text-center">
                                    <i :class="item.icon"></i>
                                    {{ item.label }}
                                </div>
                            </NuxtLink>
                            <NuxtLink v-if="user.user.value?.publicMetadata.isAdmin" to="/dashboard/admin">
                                <div
                                    class="dark:hover:bg-surface-700 hover:bg-surface-200 p-2 text-lg rounded-md lg:text-start text-center">
                                    <i class="pi pi-cog"></i>
                                    Admin
                                </div>
                            </NuxtLink>
                            <Button @click="signOut"  severity="primary">Sign Out</Button>

                        </div>
                    </div>
                    <div class="w-full container md:px-16 px-4 col-span-12 md:col-span-10">
                        <div class="mx-auto">
                            <div class="w-full">
                                <h1 class="text-4xl font-bold">{{ useRoute().name }}</h1>
                            </div>
                            <div class="mt-4">
                                <slot />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn />
        </SignedOut>
    </div>
</template>

<style scoped>
.logo {
    font-family: "Bebas Neue", monospace;
    letter-spacing: 0.1em;
}
</style>