<script setup>
defineProps({
    message: [String, Array]
})
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-error-500 dark:text-error-400">
            <span v-if="message && message.length > 0">{{ message[0] }}</span>
            <span v-else>{{ message }}</span>
        </p>
    </div>
</template>
