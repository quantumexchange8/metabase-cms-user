<script setup>
import Label from "@/components/Label.vue";
import InputIconWrapper from "@/components/InputIconWrapper.vue";
import InputError from "@/components/InputError.vue";
import Input from "@/components/Input.vue";
import CommunityIcon from '@/components/icons/AlertCircleIcon.vue'
import AlertCircleIcon from "@/components/icons/AlertCircleIcon.vue";
</script>

<template>
    <form action="" class="max-w-md p-5">
        <div class="grid gap-6">
            <div class="space-y-2">
                <Label for="email" value="Email" />
                <InputIconWrapper
                    invalid="error"
                >
                    <Input
                        id="email"
                        type="email"
                        class="block w-full"
                        placeholder="you@example.com"
                        autofocus
                        autocomplete="username"
                        invalid="error"
                    />
                    <template #invalidIcon>
                        <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500" />
                    </template>
                </InputIconWrapper>
                <InputError message="test" class="mt-2" />
            </div>
        </div>
    </form>
</template>