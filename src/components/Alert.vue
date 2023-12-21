<script setup>
import { FeaturedSuccessIcon, FeaturedErrorIcon, FeaturedWarningIcon, FeaturedPrimaryIcon, FeaturedSecondaryIcon } from '@/components/icons/outline.jsx'
import Button from '@/components/Button.vue'
import { cva } from "class-variance-authority"
import { computed } from "vue"

const props = defineProps({
  intent: {
    type: String,
    validator(value) {
      return ["success"].includes(value);
    },
    default: "warning",
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
    return cva("inline-flex flex-col items-center gap-8 w-[414px] bg-white border rounded-xl border-gray-light-100 p-6 shadow-xl dark:bg-gray-dark-950 dark:border-gray-dark-800")({
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

</script>

<template>
    <div class="flex flex-col items-center gap-10 p-20">
        <div :class="containerClass">
            <div :class="iconContainerClass">
                <component :is="iconComponent" :class="iconClass"/>
                <!-- <FeaturedSuccessIcon class="text-success-600"/> -->
            </div>
            <div class="flex flex-col items-center gap-1">
                <div :class="titleContainerClass">
                    Title
                </div>
                <div class="text-gray-light-500 dark:text-gray-dark-400">
                    Description
                </div>
            </div>
        </div>
    </div>
</template>