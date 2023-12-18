<script setup>
import Toasts from '@/components/ToastAlert.vue'
import Button from '@/components/Button.vue'
import { ref } from "vue";

const showAlert = ref(false);
const toastVariant = ref("success");

const showToast = (variant) => {
  toastVariant.value = variant;
  showAlert.value = true;
};

</script>

<template>
    <div>
        <Button @click="() => showToast('error')">Shows Toast</Button>
    </div>
    
    <Toasts title="Hello" :intent="toastVariant" :show="showAlert" @on-dismiss="dismissToast">
    <div v-if="contentContainerClass != null">
        <p>hi</p>
    </div>
      
    </Toasts>
</template>