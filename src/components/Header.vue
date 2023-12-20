<script setup>
const props = defineProps({
    title: {
        type: String,
    },
});
</script>

<template>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 class="text-2xl font-semibold leading-tight text-gray-light-900 dark:text-gray-dark-50">
            {{ title }}
        </h2>
    </div>
    <p class="text-base font-normal dark:text-gray-400">
        <slot></slot>
    </p>
</template>