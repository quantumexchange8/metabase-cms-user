<script setup>
import ApplicationIconLogo from "@/components/ApplicationIconLogo.vue";
import SidebarItem from "@/components/Sidebar/SidebarItem.vue";
import {
    BankNote03,
    HomeLineIcon,
    Users01Icon,
    SwitchVertical01,
    LogOut01,
} from "@/components/icons/outline";
import Button from "@/components/Button.vue";
import {onMounted} from "vue";
import { useAuthStore } from "@/stores/auth";
import {useDark, useToggle} from "@vueuse/core";

const authStore = useAuthStore();
const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

onMounted(async () => {
    await authStore.getUser()
});

const sidebarItems = [
    //Dashboard
    {href: '#', active: true, label: 'Dashboard', children: [], icon: HomeLineIcon},
    //Social Trading
    {
        href: '#', active: false, label: 'Social Trading', children: [], icon: Users01Icon
    },
    //Savings
    {
        href: '#', active: false, label: 'Savings', children: [], icon: BankNote03
    },
    //Transactions
    {
        href: '#', active: false, label: 'Transactions', children: [], icon: SwitchVertical01
    },
    //Rewards
    //My Accounts
    //Account Settings
]
</script>

<template>
    <div class="w-[280px] py-5 px-4 shrink-0 bg-white dark:bg-gray-dark-950 border-r border-gray-light-200 dark:border-gray-dark-700">
        <div class="flex items-center justify-between">
            <a href="" class="inline-block">
                <ApplicationIconLogo class="h-7 w-auto" />
            </a>
            <div class="">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" :checked="isDark" @click="toggleDarkMode()">
                    <div class="group peer ring-0 bg-warning-100 rounded-full outline-none duration-300 after:duration-300 w-9 h-5 shadow-md peer-checked:bg-[#B2CCFF]  peer-focus:outline-none after:content-sun after:rounded-full after:absolute after:bg-yellow-500 after:outline-none after:h-4 after:w-4 after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center peer-checked:after:bg-[#155EEF] peer-checked:after:translate-x-4 peer-checked:after:content-moon peer-hover:after:scale-95">
                    </div>
                </label>
            </div>
        </div>

        <div class="flex flex-col gap-3 my-8 p-3 rounded-xl border border-gray-light-200 dark:border-gray-dark-700">
            <div class="flex justify-between items-center self-stretch">
                <div>RANK</div>
                <div>Bell</div>
            </div>
            <div v-if="authStore.user" class="flex items-center text-gray-light-900 dark:text-gray-dark-50">
                {{ authStore.user.name }}
            </div>
            <Button
                type="button"
                variant="primary-filled"
                class="flex justify-center font-semibold"
            >
                Deposit
            </Button>
            <Button
                type="button"
                variant="secondary-outline"
                class="flex justify-center font-semibold text-gray-light-900 dark:text-gray-dark-50"
            >
                Referral Programme
            </Button>
        </div>

        <nav class="flex flex-col gap-1">
            <div class="flex items-center gap-1 self-stretch mb-2">
                <div class="font-semibold text-xs uppercase text-gray-light-300 dark:text-gray-dark-600">
                    Menu
                </div>
                <div class="w-full h-[1px] bg-gray-light-300 dark:bg-gray-dark-600"></div>
            </div>
            <SidebarItem
                v-for="item in sidebarItems"
                :key="item.label"
                :item="item"
            />

            <Button
                type="button"
                variant="error-text"
                @click="authStore.handleLogOut"
            >
                <LogOut01 />
                <span class="ml-2 text-md">Log Out</span>
            </Button>
        </nav>
    </div>
</template>