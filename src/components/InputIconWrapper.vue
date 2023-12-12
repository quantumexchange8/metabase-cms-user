<template>
    <div
        class="relative text-gray-400 focus-within:text-gray-900 dark:focus-within:text-gray-400"
    >
        <div
            aria-hidden="true"
            class="absolute inset-y-0 flex items-center px-4 pointer-events-none "
        >
            <slot name="icon" />
        </div>

        <div
            v-show="invalid"
            aria-hidden="true"
            class="absolute inset-y-0 flex items-center pointer-events-none"
            :class="{
                'right-10': isPassword,
                'right-4': !isPassword,
            }"
        >
            <slot name="invalidIcon" />
        </div>

        <slot />
    </div>
</template>

<script setup>
defineProps({
    invalid: [String, Array],
    isPassword: {
        type: Boolean,
        default: false
    }
})

</script>