<script setup>
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import GlobeIcon from "@/components/icons/GlobeIcon.vue";
import {useDark, useToggle} from "@vueuse/core";

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

</script>

<template>
    <div class="w-full flex justify-between">
        <ApplicationLogo />
        <div class="inline-flex items-center gap-3">
            <div class="mt-1.5">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" :checked="isDark" @click="toggleDarkMode()">
                    <div class="group peer ring-0 bg-warning-100 rounded-full outline-none duration-300 after:duration-300 w-9 h-5 shadow-md peer-checked:bg-[#B2CCFF]  peer-focus:outline-none after:content-sun after:rounded-full after:absolute after:bg-yellow-500 after:outline-none after:h-4 after:w-4 after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center peer-checked:after:bg-[#155EEF] peer-checked:after:translate-x-4 peer-checked:after:content-moon peer-hover:after:scale-95">
                    </div>
                </label>
            </div>
            <div>
                <GlobeIcon
                    class="text-gray-light-500 dark:text-gray-dark-400"
                />
            </div>
        </div>
    </div>
</template>