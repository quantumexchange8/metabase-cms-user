<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: 'md',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: String
})

const emit = defineEmits(['close'])

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = null
        }
    }
)

const close = () => {
    if (props.closeable) {
        emit('close')
    }
}

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close()
    }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape)
    document.body.style.overflow = null
})

const maxWidthClass = computed(() => {
    return {
        xs: 'max-w-[409px] max-h-48',
        sm: 'sm:max-w-[537px] sm:max-h-72',
        md: 'sm:max-w-3xl sm:max-h-84',
        lg: 'sm:max-w-[1075px] sm:max-h-96',
    }[props.maxWidth]
})
</script>

<template>
    <teleport to="body">
        <transition leave-active-class="duration-200">
            <div
                v-show="show"
                class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50"
                scroll-region
            >
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="show"
                        class="fixed inset-0 transform transition-all"
                        @click="close"
                    >
                        <div
                            class="absolute inset-0 bg-gray-light-25 dark:bg-gray-dark-950 opacity-50"
                        />
                    </div>
                </transition>

                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="bg-white dark:bg-gray-dark-950 border border-gray-light-100 dark:border-gray-dark-800 rounded-xl shadow-xl transform transition-all sm:mx-auto overflow-y-auto"
                        :class="maxWidthClass"
                    >
                        <div
                            v-if="show"
                            class="p-6 w-full"
                        >
                            <h2 class="flex justify-between items-center self-stretch text-xl font-semibold text-gray-light-900 dark:text-gray-dark-50">
                                {{ props.title }}
                                <button type="button" @click="close">
                                    <XMarkIcon
                                        aria-hidden="true"
                                        class="w-6 h-6 text-gray-light-400 dark:text-gray-dark-500 hover:text-gray-light-500 dark:hover:text-gray-dark-300"
                                    />
                                </button>
                            </h2>
                            <div class="flex-1 pt-5">
                                <slot />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>