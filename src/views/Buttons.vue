<script setup>
// import AuthenticatedLayout from '@/Layouts/Authenticated.vue'
import Button from '@/components/Button.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'

let buttonVariants = [
    "primary-filled",
    "primary-faded",
    "primary-outline",
    "primary-text",
    "secondary-outline",
    "secondary-text",
    "error-filled",
    "error-text",
    "success",
    "danger",
    "warning",
    "info",
    "gray",
];

let buttonSizes = ["sm", "base", "lg"]
</script>

<template>
    <div class="grid items-center gap-6 mt-4">
            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button v-for="size in buttonSizes" :key="size" :variant="variant" :size="size">
                    Button CTA
                </Button>
            </div>

            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button v-for="size in buttonSizes" :key="size" disabled :variant="variant" :size="size">
                    Button CTA
                </Button>
            </div>

            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button v-for="size in buttonSizes" :key="size" :variant="variant" :size="size" class="justify-center gap-2" v-slot="{ iconSizeClasses }">
                    <GlobeIcon aria-hidden="true" :class="iconSizeClasses" />
                    <span>Button</span>
                </Button>
            </div>

            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button v-for="size in buttonSizes" pill :key="size" iconOnly :variant="variant" :size="size" class="justify-center gap-2" v-slot="{ iconSizeClasses }">
                    <GlobeIcon aria-hidden="true" :class="iconSizeClasses" />
                    <span class="sr-only">Icon only button</span>
                </Button>
            </div>
        </div>
</template>
