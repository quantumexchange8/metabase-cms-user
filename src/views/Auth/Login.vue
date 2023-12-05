<script setup>
import Label from "@/components/Label.vue";
import InputIconWrapper from "@/components/InputIconWrapper.vue";
import InputError from "@/components/InputError.vue";
import Input from "@/components/Input.vue";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon.vue";
import Caption from "@/components/Auth/Caption.vue";
import AuthHeader from "@/components/Auth/AuthHeader.vue";
import Button from "@/components/Button.vue";
import BaseListbox from "@/components/BaseListbox.vue";

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
                    <form action="" class="max-w-md p-5 mx-auto">
                        <Caption
                            title="Log in"
                            caption="Welcome back! Please enter your details"
                        />
                        <div class="grid gap-6 my-8">
                            <div class="space-y-2">
                                <Label for="email" value="Email" />
                                <InputIconWrapper
                                    invalid=""
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        class="block w-full"
                                        placeholder="Enter email"
                                        autofocus
                                        autocomplete="username"
                                        invalid=""
                                    />
                                    <template #invalidIcon>
                                        <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500 dark:text-error-400" />
                                    </template>
                                </InputIconWrapper>
                                <InputError message="" class="mt-2" />
                            </div>
                            <div class="space-y-2">
                                <Label for="password" value="Password" />
                                <InputIconWrapper
                                    invalid=""
                                >
                                    <Input
                                        id="password"
                                        type="password"
                                        class="block w-full"
                                        placeholder="Enter password"
                                        autocomplete="username"
                                        invalid=""
                                    />
                                    <template #invalidIcon>
                                        <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500 dark:text-error-400" />
                                    </template>
                                </InputIconWrapper>
                                <InputError message="" class="mt-2" />
                            </div>
<!--                            <BaseListbox-->
<!--                                id="rankID"-->
<!--                                :options="countryLists"-->
<!--                                v-model="selectCountry"-->
<!--                                with-img-->
<!--                                is-phone-code-->
<!--                            />-->
                        </div>
                        <div>
                            <Button
                                type="button"
                                class="block w-full flex justify-center"
                            >
                                Login
                            </Button>
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