<script setup lang="ts">
import { dark } from '@clerk/themes'

</script>

<template>
    <div class="flex">
        <div class="mx-auto mt-16">
            <SignIn path="/sign-in" fallback-redirect-url="/dashboard" :appearance="{baseTheme:dark}"></SignIn>
        </div>
    </div>
</template>