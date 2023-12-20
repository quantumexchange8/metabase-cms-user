<script setup>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
</script>

<template>
    <div class="bg-white dark:bg-gray-dark-950 flex min-h-screen">

        <Sidebar />

        <main class="py-5 px-4">
            <router-view></router-view>
        </main>
    </div>

</template>