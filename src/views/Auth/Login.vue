<script setup>
import Label from "@/components/Label.vue";
import InputIconWrapper from "@/components/InputIconWrapper.vue";
import InputError from "@/components/InputError.vue";
import Input from "@/components/Input.vue";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon.vue";
import Caption from "@/components/Auth/Caption.vue";
import AuthHeader from "@/components/Auth/AuthHeader.vue";
import Button from "@/components/Button.vue";
import { useAuthStore } from "@/stores/auth";
import {ref} from "vue";

const authStore = useAuthStore();
const form = ref({
    email: '',
    password: '',
});

</script>

<template>
    <div class="flex justify-center min-h-screen">
        <div class="flex w-full">
            <div class="flex flex-col justify-between w-full h-auto bg-white dark:bg-gray-900">
                <!-- Top Bar -->
                <div class="p-8">
                    <AuthHeader />
                </div>

                <div class="w-full">
                    <form action="" class="max-w-md p-5 mx-auto" @submit.prevent="authStore.handleLogin(form)">
                        <Caption
                            title="Log in"
                            caption="Welcome back! Please enter your details"
                        />
                        <div class="grid gap-6 my-8">
                            <div class="space-y-1.5">
                                <Label for="email" value="Email" />
                                <InputIconWrapper
                                    :invalid="authStore.errors.email"
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        class="block w-full"
                                        placeholder="Enter email"
                                        autofocus
                                        autocomplete="username"
                                        :invalid="authStore.errors.email"
                                        v-model="form.email"
                                    />
                                    <template #invalidIcon>
                                        <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500 dark:text-error-400" />
                                    </template>
                                </InputIconWrapper>
                                <InputError :message="authStore.errors.email" class="mt-2" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="password" value="Password" />
                                <InputIconWrapper
                                    :invalid="authStore.errors.password"
                                >
                                    <Input
                                        id="password"
                                        type="password"
                                        class="block w-full"
                                        placeholder="Enter password"
                                        autocomplete="username"
                                        :invalid="authStore.errors.password"
                                        v-model="form.password"
                                    />
                                    <template #invalidIcon>
                                        <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500 dark:text-error-400" />
                                    </template>
                                </InputIconWrapper>
                                <InputError :message="authStore.errors.password" class="mt-2" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-3">
                            <Button
                                class="w-full flex justify-center"
                                size="lg"
                            >
                                Log in
                            </Button>
                            <p class="text-center text-base text-gray-light-500 dark:text-gray-dark-400">
                                Don't have an account?
                                <router-link to="/register"><span class="text-primary-600">Sign up</span></router-link>
                            </p>
                        </div>

                    </form>
                </div>

                <!-- Footer -->
                <div class="p-8">
                    Footer
                </div>
            </div>
            <div class="w-full lg:flex flex-col items-center hidden bg-gray-light-100 p-5 dark:bg-gray-800">

            </div>
        </div>
    </div>

</template>