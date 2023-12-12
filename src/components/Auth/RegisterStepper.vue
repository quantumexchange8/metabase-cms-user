<script setup>
import UserIcon from "@/components/icons/UserIcon.vue";
import ShieldCheckIcon from "@/components/icons/ShieldCheckIcon.vue";
import KeyIcon from "@/components/icons/KeyIcon.vue";
import UsersIcon from "@/components/icons/UsersIcon.vue";

const props = defineProps({
    formStep: Number
})
</script>

<template>
    <div class="lg:px-8">
        <div class="flex">
            <div class="flex flex-col items-center mr-4">
                <div>
                    <div
                        class="flex items-center p-2.5 justify-center w-11 h-11 border border-gray-light-300 dark:border-gray-dark-600 rounded-lg shadow"
                    >
                        <UserIcon
                            aria-hidden="true"
                            :class="formStep === 1 ? 'text-gray-light-700 dark:text-white' : 'text-gray-400 dark:text-gray-dark-500'"
                            class="h-6 w-6"
                        />
                    </div>
                </div>
                <div class="w-[2px] h-full bg-gray-light-300 dark:bg-gray-dark-600"></div>
            </div>
            <div
                class="pb-12 flex flex-col gap-1"
                :class="formStep === 1 ? 'text-gray-light-900 dark:text-gray-dark-50' : 'text-gray-light-500 dark:text-gray-dark-400'"
            >
               <div class="font-semibold">Basic details</div>
               <div class="text-sm">Let us know more about you</div>
            </div>
        </div>
        <div class="flex">
            <div class="flex flex-col items-center mr-4">
                <div>
                    <div
                        class="flex items-center p-2.5 justify-center w-11 h-11 border border-gray-light-300 dark:border-gray-dark-600 rounded-lg shadow"
                    >
                        <KeyIcon
                            aria-hidden="true"
                            :class="formStep === 2 ? 'text-gray-light-700 dark:text-white' : 'text-gray-400 dark:text-gray-dark-500'"
                            class="h-6 w-6"
                        />
                    </div>
                </div>
                <div class="w-[2px] h-full bg-gray-light-300 dark:bg-gray-dark-600"></div>
            </div>
            <div
                class="pb-12 flex flex-col gap-1"
                :class="formStep === 2 ? 'text-gray-light-900 dark:text-gray-dark-50' : 'text-gray-light-500 dark:text-gray-dark-400'"
            >
                <div class="font-semibold">Your identity</div>
                <div class="text-sm">We need to verify your identity</div>
            </div>
        </div>
        <div class="flex">
            <div class="flex flex-col items-center mr-4">
                <div>
                    <div
                        class="flex items-center p-2.5 justify-center w-11 h-11 border border-gray-light-300 dark:border-gray-dark-600 rounded-lg shadow"
                    >
                        <ShieldCheckIcon
                            aria-hidden="true"
                            :class="formStep === 3 ? 'text-gray-light-700 dark:text-white' : 'text-gray-400 dark:text-gray-dark-500'"
                            class="h-6 w-6"
                        />
                    </div>
                </div>
                <div class="w-[2px] h-full bg-gray-light-300 dark:bg-gray-dark-600"></div>
            </div>
            <div
                class="pb-12 flex flex-col gap-1"
                :class="formStep === 3 ? 'text-gray-light-900 dark:text-gray-dark-50' : 'text-gray-light-500 dark:text-gray-dark-400'"
            >
                <div class="font-semibold">Choose a password</div>
                <div class="text-sm">Set a password to secure your account</div>
            </div>
        </div>
        <div class="flex">
            <div class="flex flex-col items-center mr-4">
                <div>
                    <div
                        class="flex items-center p-2.5 justify-center w-11 h-11 border border-gray-light-300 dark:border-gray-dark-600 rounded-lg shadow"
                    >
                        <UsersIcon
                            aria-hidden="true"
                            :class="formStep === 4 ? 'text-gray-light-700 dark:text-white' : 'text-gray-400 dark:text-gray-dark-500'"
                            class="h-6 w-6"
                        />
                    </div>
                </div>
            </div>
            <div
                class="pb-12 flex flex-col gap-1"
                :class="formStep === 4 ? 'text-gray-light-900 dark:text-gray-dark-50' : 'text-gray-light-500 dark:text-gray-dark-400'"
            >
                <div class="font-semibold">Join us now</div>
                <div class="text-sm">Join with your friends to enjoy more benefits</div>
            </div>
        </div>
    </div>
</template>
