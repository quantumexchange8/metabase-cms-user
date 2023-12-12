<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {onMounted} from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(async () => {
    await authStore.getUser()
});
</script>

<template>
    <div v-if="authStore.user">
        <p>{{ authStore.user.name }}</p>
    </div>
</template>
