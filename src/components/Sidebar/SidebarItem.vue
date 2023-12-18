<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import {computed} from "vue";

const props = defineProps({
    item: Object
})

const hasActiveChild = computed(() => {
    function hasActiveItem(items) {
        return items.some(item => item.active || hasActiveItem(item.children));
    }

    return hasActiveItem(props.item.children)
});
</script>

<template>
    <a
        v-if="!item.children.length"
        :class="[
            'flex w-full gap-3 items-center py-2 px-3 text-gray-light-700 dark:text-gray-dark-200 font-semibold text-md',
            'hover:bg-gray-light-100 dark:hover:bg-gray-dark-800 rounded-md',
            item.active ? 'bg-gray-light-100 dark:bg-gray-dark-800' : ''
        ]"
        :href="item.href"
    >
        <component
            :class="['w-6 h-6 shrink-0 text-gray-light-500 dark:text-gray-dark-400']"
            :is="item.icon"
            v-if="item.icon"
        ></component>
        <span>{{ item.label }}</span>
    </a>

    <Disclosure
        v-else
        v-slot="{open}"
        :default-open="hasActiveChild"
    >
        <DisclosureButton
            :class="[
                'flex w-full text-left gap-3 items-center py-2 px-3 text-gray-light-700 dark:text-gray-dark-200 font-semibold text-md',
                'hover:bg-gray-light-100 dark:hover:bg-gray-dark-800 rounded-md',
                 item.active ? 'bg-gray-light-100 dark:bg-gray-dark-800' : ''
            ]"
        >
            <component
                :class="['w-6 h-6 shrink-0 text-gray-light-500 dark:text-gray-dark-400']"
                :is="item.icon"
                v-if="item.icon"
            ></component>
            <span class="flex-1">{{ item.label }}</span>
            <ChevronDownIcon
                :class="[
                    'w-6 h-6 shrink-0',
                    open ? '-rotate-180' : ''
                ]"
            />
        </DisclosureButton>
        <DisclosurePanel
            class="ml-4"
        >
            <SidebarItem
                v-for="child in item.children"
                :item="child"
            />
        </DisclosurePanel>
    </Disclosure>
</template>