<script setup lang="ts">
import { dark } from '@clerk/themes'

const route = useRoute();
</script>

<template>
    <div class="flex">
        <div class="mx-auto mt-16">
            <SignIn path="/sign-in" :appearance="{baseTheme:dark}"></SignIn>
        </div>
    </div>
</template>