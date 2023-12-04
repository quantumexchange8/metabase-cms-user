<script setup>
defineProps({
    message: String
})
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-error-500 dark:text-error-400">
            {{ message }}
        </p>
    </div>
</template>
