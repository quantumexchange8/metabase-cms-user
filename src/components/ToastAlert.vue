<script setup>
import { FeaturedSuccessIcon, FeaturedErrorIcon, FeaturedWarningIcon, FeaturedPrimaryIcon, FeaturedSecondaryIcon } from '@/components/icons/outline.jsx'
import XIcon from '@/components/icons/XIcon.vue'
import { computed } from "vue"
import { cva } from "class-variance-authority"

const props = defineProps({
  intent: {
    type: String,
    validator(value) {
      return ["infoprimary", "infosecondary", "success", "error", "warning"].includes(value);
    },
    default: "infoprimary",
  },
  title: String,
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
    return cva("flex w-[480px]  border  gap-3 p-4 box-border rounded-xl shadow-[0_4px_8px_-2px_rgba(16,24,40,0.12)]", {
        variants: {
            intent: {
                success: "bg-success-25 border-success-500 dark:bg-success-950 dark:border-success-400",
                warning: "bg-warning-25 border-warning-500 dark:bg-warning-950 dark:border-warning-400",
                error: "bg-error-25 border border-error-500 dark:bg-error-950 dark:border-error-400",
                infoprimary: "bg-primary-25 border border-primary-500 dark:bg-primary-950 dark:border-primary-400",
                infosecondary: "bg-gray-25 border border-gray-500 dark:bg-gray-950 dark:border-gray-400",
            }
        }
    })({
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

const iconClass = computed(() => {
    return cva("dark:text-white", {
        variants: {
            intent: {
                success: "text-success-600",
                warning: "text-warning-600",
                error: "text-error-600",
                infoprimary: "text-primary-600",
                infosecondary: "text-gray-light-600",
            }
        }
    })({
        intent: props.intent,
    })
});

const titleContainerClass = computed(() => {
  return cva("font-semibold text-gray-light-900 text-sm dark:text-white")({
    intent: props.intent,
  })
});

const contentContainerClass = computed(() => {
  return cva("font-normal text-gray-light-500 text-sm dark:text-gray-dark-400")({
    intent: props.intent,
  })
});

const iconComponent = computed(() => {
  const icons = {
    success: FeaturedSuccessIcon,
    warning: FeaturedWarningIcon,
    error: FeaturedErrorIcon,
    infoprimary: FeaturedPrimaryIcon,
    infosecondary: FeaturedSecondaryIcon,
  };

  return icons[props.intent];
});

const xiconClass = computed(() => {
    return cva("w-6 h-6", {
        variants: {
            intent: {
                success: "text-success-500 dark:text-success-400",
                warning: "text-warning-500 dark:text-warning-400",
                error: "text-error-500 dark:text-error-400",
                infoprimary: "text-primary-500 dark:text-primary-400",
                infosecondary: "text-gray-light-500 dark:text-gray-dark-400",
            }
        }
    })({
        intent: props.intent,
    })
});

</script>

<template>
    <div class="flex flex-col items-center gap-10 p-20">
        <div :class="containerClass">
            <div :class="iconContainerClass">
                <component :is="iconComponent" :class="iconClass"/>
            </div>
            <div class="inline-flex flex-col justify-center w-[360px]">
                <div>
                    <h2 :class="titleContainerClass">
                        {{ props.title }}
                    </h2>
                </div>
                <div>
                    <div :class="contentContainerClass">
                        <slot/>
                    </div>
                </div>
            </div>
            <div>
                <button class="w-6 h-6" @click="dismissToast">
                    <XIcon :class="xiconClass"></XIcon>
                </button>
            </div>
        </div>
    </div>
</template>