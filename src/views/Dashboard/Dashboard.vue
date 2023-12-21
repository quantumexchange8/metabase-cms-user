<script setup>
import Header from "@/components/Header.vue";
import {useAuthStore} from "@/stores/auth";
import {onMounted} from "vue";

const authStore = useAuthStore();
onMounted(async () => {
    await authStore.getUser()
});
</script>

<template>
    <Header title="Dashboard">
        Welcome back, <span v-if="authStore.user">{{ authStore.user.name }}</span>
    </Header>
</template>