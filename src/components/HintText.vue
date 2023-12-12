<script setup>
defineProps({
    message: String
})
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-gray-light-500 dark:text-gray-dark-400 font-normal">
            {{ message }}
        </p>
    </div>
</template>
