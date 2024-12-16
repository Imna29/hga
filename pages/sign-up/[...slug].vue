<script setup lang="ts">
import { dark } from '@clerk/themes'
</script>

<template>
    <div class="flex">
        <div class="mx-auto mt-16">
            <SignUp path="/sign-up" :appearance="{baseTheme:dark}"></SignUp>
        </div>
    </div>
</template>