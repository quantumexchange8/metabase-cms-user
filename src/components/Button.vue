<script setup>
import { toRefs, computed } from 'vue'
// import { Link } from '@inertiajs/vue3'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary-filled',
        validator(value) {
            return [
                'primary-filled', 
                'primary-faded', 
                'primary-outline', 
                'primary-text', 
                'secondary-outline', 
                'secondary-text', 
                'error-filled', 
                'error-text', 
                'warning', 
                'info', 
                'gray', 
                'transparent'
            ].includes(value)
        },
    },
    type: {
        type: String,
        default: 'submit',
    },
    size: {
        type: String,
        default: 'base',
        validator(value) {
            return ['sm', 'base', 'lg'].includes(value)
        },
    },
    squared: {
        type: Boolean,
        default: false,
    },
    pill: {
        type: Boolean,
        default: false,
    },
    href: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    iconOnly: {
        type: Boolean,
        default: false,
    },
    srText: {
        type: String || undefined,
        default: undefined,
    },
    external: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['click'])

const { type, variant, size, squared, pill, href, iconOnly, srText, external } = props

const { disabled } = toRefs(props)

const baseClasses = [
    'inline-flex items-center text-sm transition-colors font-medium select-none disabled:bg-gray-100 disabled:text-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none',
]

const variantClasses = (variant) => ({
    'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-100 disabled:text-white disabled:cursor-not-allowed dark:disabled:bg-primary-950 dark:disabled:text-primary-800': variant == 'primary-filled',
    'bg-primary-50 text-primary-700 hover:bg-primary-100 disabled:bg-primary-100 disabled:text-primary-300 disabled:cursor-not-allowed dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-200 dark:disabled:bg-primary-950 dark:disabled:text-primary-800': variant == 'primary-faded',
    'bg-white border border-primary-300 text-primary-700 hover:bg-primary-50 disabled:bg-white disabled:text-primary-200 disabled:border-primary-200 disabled:cursor-not-allowed dark:bg-gray-dark-950 dark:text-primary-200 dark:border-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-200 dark:disabled:bg-transparent dark:disabled:border-primary-900 dark:disabled:text-primary-900': variant == 'primary-outline',
    'bg-transparent text-primary-700 hover:bg-primary-50 disabled:bg-transparent disabled:text-primary-200 disabled:border-primary-200 disabled:cursor-not-allowed dark:text-primary-200 dark:hover:bg-primary-900 dark:disabled:bg-transparent dark:disabled:text-primary-900': variant == 'primary-text',

    'bg-white border border-gray-light-300 text-gray-900 hover:bg-gray-50 hover:border-gray-light-300 disabled:bg-white disabled:border-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-[#1B2530] dark:bg-transparent dark:border-gray-dark-600 dark:text-dark-gray-50 dark:hover:bg-gray-dark-900 dark:disabled:bg-transparent dark:disabled:border-gray-dark-700 dark:disabled:text-gray-dark-700':
        variant == 'secondary-outline',
    'bg-transparent text-gray-light-500 hover:bg-gray-light-50 disabled:bg-transparent dark:text-gray-dark-400 dark:hover:bg-gray-dark-900 dark:disabled:bg-transparent dark:disabled:text-gray-dark-600':
        variant == 'secondary-text',

    'bg-error-500 text-white hover:bg-error-600 disabled:bg-error-200 disabled:text-white dark:disabled:bg-error-800 dark:disabled:text-error-600': variant == 'error-filled',
    'bg-transparent text-error-600 hover:bg-error-50 disabled:bg-transparent disabled:text-error-200 dark:disabled:bg-transparent dark:disabled:text-error-700': variant == 'error-text',
    
    'bg-success-600 hover:bg-success-700 text-white': variant == 'success',
    'bg-error-600 text-white hover:bg-error-700': variant == 'danger',
    'bg-warning-400 text-white hover:bg-warning-500': variant == 'warning',
    'bg-gray-600 border border-gray-500 text-white': variant == 'info',
    'bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-500 dark:hover:bg-gray-600':
        variant == 'gray',
    'text-gray-400 bg-transparent dark:hover:text-white':
        variant == 'transparent',
})

const classes = computed(() => [
    ...baseClasses,
    iconOnly
        ? {
                'p-1.5': size == 'sm',
                'p-2': size == 'base',
                'p-3': size == 'lg',
            }
        : {
                'px-4 py-2': size == 'sm',
                'px-4 py-2.5': size == 'base',
                'px-4 py-3': size == 'lg',
            },
    variantClasses(variant),
    {
        'rounded-lg': !squared && !pill,
        'rounded-full': pill,
    },
    {
        'pointer-events-none opacity-50': href && disabled.value,
    },
])

const iconSizeClasses = [
    {
        'w-5 h-5': size == 'sm',
        'w-6 h-6': size == 'base',
        'w-7 h-7': size == 'lg',
    },
]

const handleClick = (e) => {
    if (disabled.value) {
        e.preventDefault()
        e.stopPropagation()
        return
    }
    emit('click', e)
}

const Tag = 'a'
</script>

<template>
    <component
        :is="Tag"
        v-if="href"
        :href="!disabled ? href : null"
        :class="classes"
        :aria-disabled="disabled.toString()"
    >
        <span
            v-if="srText"
            class="sr-only"
        >
            {{ srText }}
        </span>

        <slot :iconSizeClasses="iconSizeClasses" />
    </component>

    <button
        v-else
        :type="type"
        :class="classes"
        @click="handleClick"
        :disabled="disabled"
    >
        <span
            v-if="srText"
            class="sr-only"
        >
            {{ srText }}
        </span>

        <slot :iconSizeClasses="iconSizeClasses" />
    </button>
</template>
