<script setup>
import { FeaturedSuccessIcon, FeaturedErrorIcon, FeaturedWarningIcon, FeaturedPrimaryIcon, FeaturedSecondaryIcon } from '@/components/icons/outline.jsx'
import { cva } from "class-variance-authority"
import { computed } from "vue"

const props = defineProps({
    intent: {
        type: String,
        validator(value) {
            return ["success", "warning", "error", "infoprimary", "infosecondary"].includes(value);
        },
        default: "success",
    },
    show: {
        type: Boolean,
        default: true,
    },
    onDismiss: Function,
    dismissLabel: {
        type: String,
        default: "Dismiss",
    },
});

const containerClass = computed(() => {
    return cva("inline-flex flex-col items-center gap-8 w-[414px] bg-white border rounded-xl border-gray-light-100 p-6 shadow-xl dark:bg-gray-dark-950 dark:border-gray-dark-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50")({
        intent: props.intent,
    })
});

const iconContainerClass = computed(() => {
    return cva("w-10 h-10 flex items-center justify-center border-[6px] rounded-[28px] ", {
        variants: {
            intent: {
                success: "bg-success-100 border-success-50 dark:bg-success-500 dark:border-success-600",
                warning: "bg-warning-100 border-warning-50 dark:bg-warning-500 dark:border-warning-600",
                error: "bg-error-100 border border-error-50 dark:bg-error-500 dark:border-error-600",
                infoprimary: "bg-primary-100 border border-primary-50 dark:bg-primary-500 dark:border-primary-600",
                infosecondary: "bg-gray-100 border border-gray-50 dark:bg-gray-500 dark:border-gray-600",
            }
        }
    })({
        intent: props.intent,
    })
});

const iconComponent = computed(() => {
    const icons = {
        success: FeaturedSuccessIcon,
        warning: FeaturedWarningIcon
    };

    return icons[props.intent];
});

const iconClass = computed(() => {
    return cva("dark:text-white", {
        variants: {
            intent: {
                success: "text-success-600",
                warning: "text-warning-600",
            }
        }
    })({
        intent: props.intent,
    })
});

const titleContainerClass = computed(() => {
    return cva("text-gray-light-900 font-semibold text-lg dark:text-white")({
        intent: props.intent,
    })
});

import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();
const showAlert = computed(() => alertStore.showAlert);
const title = computed(() => alertStore.title);
const message = computed(() => alertStore.message);
</script>

<template>
    <!-- Backdrop -->
    <div v-if="showAlert" class="fixed inset-0 bg-gray-light-50 dark:bg-gray-dark-900 opacity-50 z-30"></div>
    <TransitionGroup
        tag="div"
        enter-from-class="scale-0 opacity-0 transform-origin-center"
        enter-active-class="transition-transform ease-out duration-200"
        leave-active-class="transition-transform ease-in duration-200"
        leave-to-class="scale-0 opacity-0 transform-origin-center"
    >
        <div v-if="showAlert" :class="containerClass">
            <div :class="iconContainerClass">
                <component :is="iconComponent" :class="iconClass"/>
            </div>
            <div class="flex flex-col items-center gap-1">
                <div :class="titleContainerClass">
                    {{ title }}
                </div>
                <div class="text-gray-light-500 dark:text-gray-dark-400">
                    {{ message }}
                </div>
            </div>
            <slot></slot>
        </div>
    </TransitionGroup>

</template>