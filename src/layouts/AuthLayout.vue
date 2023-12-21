<script setup>
import Alert from "@/components/Alert.vue";
import Button from "@/components/Button.vue";
import {useAlertStore} from "@/stores/alert";
import {computed} from "vue";

const alertStore = useAlertStore();
const closeAlert = () => {
    // Hide the alert when the "Ok" button is clicked
    alertStore.hide();
};

const status = computed(() => alertStore.intent || null);
</script>

<template>
    <div
        class="bg-white dark:bg-gray-dark-950"
    >
        <Alert
            :intent="status"
        >
            <Button
                type="button"
                class="flex justify-center w-full uppercase"
                @click="closeAlert"
            >
                Ok
            </Button>
        </Alert>
        <router-view></router-view>
<!--        <PageFooter />-->
    </div>
</template>