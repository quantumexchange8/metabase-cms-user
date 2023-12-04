<script setup>
defineProps({
    value: String,
})
</script>

<template>
    <label class="block text-sm font-medium text-gray-light-700 dark:text-gray-dark-200">
        <span v-if="value">{{ value }}</span>

        <span v-else><slot /></span>
    </label>
</template>
