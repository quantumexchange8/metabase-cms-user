<script setup>
import { onMounted, ref } from 'vue'

defineProps({
    modelValue: String,
    withIcon: {
        type: Boolean,
        default: false,
    },
    invalid: String
})

defineEmits(['update:modelValue'])

const input = ref(null)

const focus = () => input.value?.focus()

defineExpose({
    input,
    focus
})

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus()
    }
})
</script>

<template>
    <input
        :class="[
            'py-2.5 rounded-lg text-base font-normal shadow-xs border placeholder:text-gray-light-500 dark:placeholder:text-gray-dark-400 text-gray-light-900 dark:text-gray-dark-50',
            'bg-white dark:bg-gray-dark-950',
            'disabled:bg-gray-light-50 disabled:cursor-not-allowed dark:disabled:bg-gray-dark-900',
            {
                'px-4': !withIcon,
                'pl-11 pr-4': withIcon,
            },
            {
                'border-gray-light-300 dark:border-gray-dark-600 focus:ring-primary-400 hover:border-primary-400 focus:border-primary-400 focus:shadow-primary-light dark:focus:ring-primary-500 dark:hover:border-primary-500 dark:focus:border-primary-500 dark:focus:shadow-primary-dark' :!invalid,
                'border-error-300 focus:ring-error-300 hover:border-error-300 focus:border-error-300 focus:shadow-error-light dark:border-error-600 dark:focus:ring-error-600 dark:hover:border-error-600 dark:focus:border-error-600 dark:focus:shadow-error-dark' :invalid,
            }
        ]"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
    />
</template>
