<script setup>
import { computed } from 'vue';

const props = defineProps({
    status: String,
})

const badgeClasses = computed(() => {
    const baseClasses = 'text-xs font-medium px-2 py-0.5 rounded-[50px] inline-flex items-center';
    const status = props.status;

    if (status === 'warning') {
        return `${baseClasses} bg-warning-50 border border-warning-200 text-warning-600 dark:bg-warning-900 dark:border-warning-700 dark:text-warning-300`;
    } else if (status === 'success') {
        return `${baseClasses} bg-success-50 border border-success-200 text-success-600 dark:bg-success-900 dark:border-success-700 dark:text-success-300`;
    } else if (status === 'primary') {
        return `${baseClasses} bg-primary-50 border border-primary-200 text-primary-600 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-300`;
    } else if (status === 'danger') {
        return `${baseClasses} bg-error-50 border border-error-200 text-error-600 dark:bg-error-900 dark:border-error-700 dark:text-error-300`;
    } else if (status === 'secondary') {
        return `${baseClasses} bg-gray-light-50 border border-gray-light-200 text-gray-light-600 dark:bg-gray-dark-900 dark:border-gray-dark-700 dark:text-gray-dark-300`
    } else {
        return baseClasses;
    }
});
</script>

<template>
    <span :class="badgeClasses"><slot></slot></span>
</template>
