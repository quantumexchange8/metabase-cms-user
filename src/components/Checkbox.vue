<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    value: {
        default: null,
    },
})

const proxyChecked = computed({
    get() {
        return props.checked
    },

    set(val) {
        emit('update:checked', val)
    },
})
</script>

<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        :class="proxyChecked ? 'w-5 h-5 rounded-full border text-primary-600 bg-transparent border-transparent focus:ring-0 focus:ring-offset-0 disabled:bg-primary-100 disabled:border-primary-200 dark:disabled:bg-primary-800 dark:disabled:border-primary-800' : 'w-5 h-5 rounded-full border text-primary-600 bg-transparent focus:ring-0 focus:ring-offset-0 border-gray-light-300 dark:border-gray-dark-600 hover:bg-primary-50 hover:border-primary-600 dark:hover:bg-primary-900 dark:hover:border-primary-600 disabled:bg-gray-light-100 disabled:border-gray-light-200 dark:disabled:bg-gray-dark-800 dark:disabled:border-gray-dark-700'"
    />

</template>
