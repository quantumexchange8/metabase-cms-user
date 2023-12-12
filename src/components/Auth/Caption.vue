<script setup>
const { title, caption, size } = defineProps({
    title: String,
    caption: String,
    size: {
        type: String,
        default: '3xl'
    }
});

const getFontSize = (size) => {
    const sizes = {
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
    };

    return sizes[size] || '3xl';
};
</script>

<template>
    <h2 class="font-semibold text-gray-light-900 dark:text-gray-dark-50 md:text-3xl">{{ title }}</h2>
    <p class="text-md font-normal text-gray-light-500 dark:text-gray-dark-400">{{ caption }}</p>
</template>
