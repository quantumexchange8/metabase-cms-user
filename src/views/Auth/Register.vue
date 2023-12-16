<script setup>
import AuthHeader from "@/components/Auth/AuthHeader.vue";
import {computed, onMounted, ref, watch} from "vue";
import RegisterStepper from "@/components/Auth/RegisterStepper.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import ShieldCheckIcon from "@/components/icons/ShieldCheckIcon.vue";
import KeyIcon from "@/components/icons/KeyIcon.vue";
import UsersIcon from "@/components/icons/UsersIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import Caption from "@/components/Auth/Caption.vue";
import InputIconWrapper from "@/components/InputIconWrapper.vue";
import Label from "@/components/Label.vue";
import InputError from "@/components/InputError.vue";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon.vue";
import RegisterRocketMan from "@/components/Auth/RegisterRocketMan.vue";
import Input from "@/components/Input.vue";
import BaseListbox from "@/components/BaseListbox.vue";
import CountryLists from '@/data/countries.json'
import titles from '@/data/title.json'
import fundSources from '@/data/fundSource.json'
import axios from "axios";
import Button from "@/components/Button.vue";
import {useAuthStore} from "@/stores/auth";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import HintText from "@/components/HintText.vue";
import { CheckIcon, EyeIcon, EyeOffIcon } from '@/components/icons/outline'
import Checkbox from "@/components/Checkbox.vue";

const countrySel = ref([]);
const stateSel = ref([]);
const citySel = ref([]);
const tradeExpSel = ref([]);
const nationalities = ref([]);
const selectedCountry = ref(132);
const selectedState = ref(null);
const steps = [1,2,3,4];
const authStore = useAuthStore();
const formStep = ref(1);
const showPassword = ref(false);
const showPassword2 = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const togglePasswordVisibilityConfirm = () => {
    showPassword2.value = !showPassword2.value;
}

const getCircleClass = (step) => ({
    'w-3 h-3': true,
    'bg-gray-light-200 dark:bg-gray-dark-700': step !== formStep.value,
    'bg-primary-600': step === formStep.value,
    'rounded-full': true,
});

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MM'
});

const stepDetails = {
    1: {
        title: 'Basic details',
        caption: 'Make sure the details provided are accurate.'
    },
    2: {
        title: 'Your identity',
        caption: 'No worries, we’ll protect your identity.'
    },
    3: {
        title: 'Choose a password',
        caption: 'Your password must fulfil the following criteria.'
    },
    4: {
        title: 'Join us now',
        caption: 'One last step to start your journey with us.'
    },
};

const computedTitle = computed(() => {
    return stepDetails[formStep.value]?.title || 'Register';
});

const computedCaption = computed(() => {
    return stepDetails[formStep.value]?.caption || 'Fill all fields';
});

const form = ref({
    form_step: formStep.value,
    title: '',
    name: '',
    email: '',
    phone: '',
    country: 132,
    state: '',
    city: '',
    dial_code: '+60',
    trade_experience: '',
    source_of_fund: '',
    gender: null,
    dob: '',
    nationality: 'Malaysian',
    identification_type: 'nric',
    identification_number: '',
    identity_proof: null,
    address_proof: null,
    password: '',
    password_confirmation: '',
    referral_code: '',
    terms: false,
});

onMounted(async () => {
    const response = await axios.get('/getRegisterInputs');
    const stateData = await axios.get(`/getStates?country_id=132`);
    countrySel.value = response.data.countries;
    tradeExpSel.value = response.data.tradeExperiences;
    nationalities.value = response.data.nationalities;
    stateSel.value = stateData.data;
});

watch(selectedCountry, async (country) => {
    if (country) {
        try {
            // Make an asynchronous request using the selected country's ID
            const response = await axios.get(`/getStates?country_id=${country}`);
            // Update the states with the response data
            stateSel.value = response.data;
            form.value.country = selectedCountry.value;
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }
})

watch(selectedState, async (state) => {
    if (state) {
        try {
            // Make an asynchronous request using the selected state's ID
            const response = await axios.get(`/getCities?state_id=${state}`);
            // Update the states with the response data
            citySel.value = response.data;
            form.value.state = selectedState.value;
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }
})
const selectedIdentityProofFile = ref(null);
const selectedIdentityProofFileName = ref(null);
const selectedAddressProofFile = ref(null);
const selectedAddressProofFileName = ref(null);
const handleIdentityProof = (event) => {
    const identityProofInput = event.target;
    const file = identityProofInput.files[0];

    if (file) {
        // Display the selected image
        const reader = new FileReader();
        reader.onload = () => {
            selectedIdentityProofFile.value = reader.result;
        };
        reader.readAsDataURL(file);
        selectedIdentityProofFileName.value = file.name;
        form.value.identity_proof = event.target.files[0];

    } else {
        selectedIdentityProofFile.value = null;
    }
};

const handleAddressProof = (event) => {
    const addressProofInput = event.target;
    const file = addressProofInput.files[0];

    if (file) {
        // Display the selected image
        const reader = new FileReader();
        reader.onload = () => {
            selectedAddressProofFile.value = reader.result;
        };
        reader.readAsDataURL(file);
        selectedAddressProofFileName.value = file.name;
        form.value.address_proof = event.target.files[0];
    } else {
        selectedAddressProofFile.value = null;
    }
};

const removeIdentityProof = () => {
    selectedIdentityProofFile.value = null;
}

const removeAddressProof = () => {
    selectedAddressProofFile.value = null;
};

const submitRegisterValidation = (form) => {
    authStore.handleRegisterValidation(form).then(() => {
        if (authStore.errors.length <= 0) {
            formStep.value++
            form.form_step = formStep.value
        }
    });
};
const prevPage = () => {
    formStep.value--;
}

const passwordRules = [
    { message: 'Must be at least 8 characters', regex: /.{8,}/ },
    { message: 'Must contain one uppercase letter', regex: /[A-Z]+/ },
    { message: 'Must contain one lowercase letter', regex: /[a-z]+/ },
    { message: 'Must contain one number', regex: /[0-9]+/ },
    { message: 'Must contain one of the special characters', regex: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+/ }
];

const passwordValidation = () => {
    let valid = false;
    let messages = [];

    for (let condition of passwordRules) {
        const isConditionValid = condition.regex.test(form.value.password);

        if (isConditionValid) {
            valid = true;
        }

        messages.push({
            message: condition.message,
            valid: isConditionValid,
        });
    }

    // Check if the new password matches the confirm password
    const isMatch = form.value.password === form.value.password_confirmation;

    messages.push({
        message: 'New password matches confirm password',
        valid: isMatch && form.value.password !== '',
    });

    // Set valid to false if there's any condition that failed
    valid = valid && isMatch;

    return { valid, messages };
};
</script>

<template>
    <div class="flex justify-center min-h-screen">
        <!-- Row -->
        <div class="w-full flex">
            <!-- Col -->
            <div
                class="flex-col gap-[100px] w-full h-auto hidden lg:flex lg:w-[600px] bg-gray-light-50 dark:bg-gray-dark-900"
            >
                <div class="p-8">
                    <AuthHeader />
                </div>

                <RegisterStepper
                    :formStep="formStep"
                />
            </div>
            <!-- Col -->
            <div class="w-full flex flex-col gap-2 items-center bg-white pt-[100px] dark:bg-gray-dark-950">
                <div class="flex items-center justify-center w-10 h-10 border dark:border-gray-400 rounded-lg shadow">
                    <UserIcon v-if="formStep === 1" aria-hidden="true" class="h-6 w-6 text-gray-800 dark:text-white" />
                    <KeyIcon v-if="formStep === 2" aria-hidden="true" class="h-6 w-6 text-gray-800 dark:text-white" />
                    <ShieldCheckIcon v-if="formStep === 3" aria-hidden="true" class="h-6 w-6 text-gray-800 dark:text-white" />
                    <UsersIcon v-if="formStep === 4" aria-hidden="true" class="h-6 w-6 text-gray-800 dark:text-white" />
                </div>
                <Caption
                    :title="computedTitle"
                    :caption="computedCaption"
                />
                <form class="w-[360px] mt-8">

                    <!-- Step 1 -->
                    <div v-if="formStep === 1" class="grid gap-5">
                        <div class="space-y-1.5">
                            <Label for="title" value="Title" />
                            <BaseListbox
                                :options="titles"
                                v-model="form.title"
                                :error="!!authStore.errors.title"
                            />
                            <InputError :message="authStore.errors.title" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="name" value="Name" />
                            <InputIconWrapper
                                :invalid="authStore.errors.name"
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    class="block w-full"
                                    placeholder="Enter your full name as per passport"
                                    v-model="form.name"
                                    autocomplete="name"
                                    :invalid="authStore.errors.name"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                </template>
                            </InputIconWrapper>
                            <InputError v-if="authStore.errors.name" :message="authStore.errors.name" class="mt-2" />
                        </div>
                        <div class="space-y-2">
                            <Label for="email" value="Email" />
                            <InputIconWrapper
                                :invalid="authStore.errors.email"
                            >
                                <Input
                                    id="email"
                                    type="email"
                                    class="block w-full"
                                    placeholder="Enter your email"
                                    autocomplete="username"
                                    :invalid="authStore.errors.email"
                                    v-model="form.email"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                </template>
                            </InputIconWrapper>
                            <InputError :message="authStore.errors.email" class="mt-2" />
                        </div>
                        <div class="space-y-2">
                            <Label for="phone" value="Phone number" />
                            <div class="flex gap-3">
                                <BaseListbox
                                    class="w-[140px]"
                                    :options="CountryLists"
                                    v-model="form.dial_code"
                                    with-img
                                    is-phone-code
                                    :error="!!authStore.errors.phone"
                                />
                                <InputIconWrapper
                                    :invalid="authStore.errors.phone"
                                >
                                    <Input
                                        id="phone"
                                        type="text"
                                        class="block w-full"
                                        placeholder="Enter phone number"
                                        autocomplete="phone"
                                        :invalid="authStore.errors.phone"
                                        v-model="form.phone"
                                    />
                                    <template #invalidIcon>
                                        <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                    </template>
                                </InputIconWrapper>
                            </div>
                            <InputError :message="authStore.errors.phone" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="country" value="Country" />
                            <BaseListbox
                                :options="countrySel"
                                v-model="selectedCountry"
                                :error="!!authStore.errors.country"
                            />
                            <InputError :message="authStore.errors.country" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="state" value="State" />
                            <BaseListbox
                                :options="stateSel"
                                v-model="selectedState"
                                option-message="Please choose a country"
                                :error="!!authStore.errors.state"
                            />
                            <InputError :message="authStore.errors.state" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="city" value="City" />
                            <BaseListbox
                                :options="citySel"
                                v-model="form.city"
                                option-message="Please choose a country or a state"
                                :error="!!authStore.errors.city"
                            />
                            <InputError :message="authStore.errors.city" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="trade_experience" value="Trade experience" />
                            <BaseListbox
                                :options="tradeExpSel"
                                v-model="form.trade_experience"
                                :error="!!authStore.errors.trade_experience"
                            />
                            <InputError :message="authStore.errors.trade_experience" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="source_of_fund" value="Source of funds" />
                            <BaseListbox
                                :options="fundSources"
                                v-model="form.source_of_fund"
                                :error="!!authStore.errors.source_of_fund"
                            />
                            <InputError :message="authStore.errors.source_of_fund" class="mt-2" />
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div v-if="formStep === 2" class="grid gap-5">
                        <div class="space-y-1.5">
                            <Label class="dark:text-white" for="gender" value="Gender" />
                            <div class="flex gap-x-12">
                                <div class="flex">
                                    <input type="radio" name="gender" v-model="form.gender" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-1" value="male">
                                    <label for="hs-radio-group-1" class="text-sm text-gray-600 ml-2 dark:text-white">Male</label>
                                </div>

                                <div class="flex">
                                    <input type="radio" name="gender" v-model="form.gender" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-2" value="female">
                                    <label for="hs-radio-group-2" class="text-sm text-gray-600 ml-2 dark:text-white">Female</label>
                                </div>
                            </div>
                            <InputError :message="authStore.errors.gender" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="dob" value="Date of birth" />
                            <vue-tailwind-datepicker
                                placeholder="dd/mm/yyyy"
                                :formatter="formatter"
                                separator=" - "
                                v-model="form.dob"
                                as-single
                                :shortcuts="false"
                                input-classes="py-2.5 rounded-lg text-base font-normal shadow-xs border placeholder:text-gray-light-500 dark:placeholder:text-gray-dark-400 text-gray-light-900 dark:text-gray-dark-50 bg-white dark:bg-gray-dark-950 disabled:bg-gray-light-50 disabled:cursor-not-allowed dark:disabled:bg-gray-dark-900 border-gray-light-300 dark:border-gray-dark-800 focus-within:ring-primary-400 hover:border-primary-400 focus-within:border-primary-400 focus-within:shadow-primary-light dark:focus-within:ring-primary-500 dark:hover:border-primary-500 dark:focus-within:border-primary-500 dark:focus-within:shadow-primary-dark"
                            />
                            <InputError :message="authStore.errors.dob" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="nationality" value="Nationality" />
                            <BaseListbox
                                :options="nationalities"
                                v-model="form.nationality"
                                :error="!!authStore.errors.nationality"
                            />
                            <InputError :message="authStore.errors.nationality" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="dark:text-white" for="us_citizen" value="Are you US citizen?" />
                            <div class="flex gap-x-12">
                                <div class="flex">
                                    <input type="radio" name="us_citizen" v-model="form.us_citizen" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-1" :value=true>
                                    <label for="hs-radio-group-1" class="text-sm text-gray-600 ml-2 dark:text-white">Yes</label>
                                </div>

                                <div class="flex">
                                    <input type="radio" name="us_citizen" v-model="form.us_citizen" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-2" :value="false">
                                    <label for="hs-radio-group-2" class="text-sm text-gray-600 ml-2 dark:text-white">No</label>
                                </div>
                            </div>
                            <InputError :message="authStore.errors.us_citizen" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="dark:text-white" for="identification_type" value="Identification type" />
                            <div class="flex gap-x-12">
                                <div class="flex">
                                    <input type="radio" name="identification_type" v-model="form.identification_type" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-1" value="nric">
                                    <label for="hs-radio-group-1" class="text-sm text-gray-600 ml-2 dark:text-white">NRIC</label>
                                </div>

                                <div class="flex">
                                    <input type="radio" name="identification_type" v-model="form.identification_type" class="shrink-0 mt-0.5 border-gray-light-300 rounded-full hover:border-primary-600 dark:hover:border-primary-600 focus:ring-primary-600 dark:bg-transparent dark:border-gray-dark-600 dark:checked:bg-primary-600 dark:checked:border-primary-600 dark:focus:ring-offset-gray-dark-800" id="hs-radio-group-2" value="passport">
                                    <label for="hs-radio-group-2" class="text-sm text-gray-600 ml-2 dark:text-white">Passport</label>
                                </div>
                            </div>
                            <InputError :message="authStore.errors.identification_type" class="mt-2" />
                        </div>
                        <div class="space-y-2">
                            <Label for="identification_number" value="NRIC/Passport number" />
                            <InputIconWrapper
                                :invalid="authStore.errors.identification_number"
                            >
                                <Input
                                    id="identification_number"
                                    type="text"
                                    class="block w-full"
                                    placeholder="Enter your identification number"
                                    :invalid="authStore.errors.identification_number"
                                    v-model="form.identification_number"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                </template>
                            </InputIconWrapper>
                            <InputError :message="authStore.errors.identification_number" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="identity_proof" value="Upload your IC/passport photo (FRONT side only)" />
                            <div class="flex gap-3">
                                <input
                                    ref="identityProofInput"
                                    id="identity_proof"
                                    type="file"
                                    class="hidden"
                                    @change="handleIdentityProof"
                                    accept="image/*"
                                />
                                <Button
                                    type="button"
                                    variant="primary-faded"
                                    @click="$refs.identityProofInput.click()"
                                >
                                    Browse
                                </Button>
                                <div v-if="authStore.errors.identity_proof" class="inline-flex items-center gap-2">
                                    <AlertCircleIcon class="w-4 h-4 text-error-500 dark:text-error-400" />
                                    <InputError :message="authStore.errors.identity_proof" />
                                </div>
                            </div>
                            <div
                                v-if="selectedIdentityProofFile"
                                class="relative w-full py-2 pl-4 flex justify-between rounded-lg border focus:ring-1 focus:outline-none"
                                :class="[
                                    {
                                          'border-error-300 focus-within:ring-error-300 hover:border-error-300 focus-within:border-error-300 focus-within:shadow-error-light dark:border-error-600 dark:focus-within:ring-error-600 dark:hover:border-error-600 dark:focus-within:border-error-600 dark:focus-within:shadow-error-dark': authStore.errors.identity_proof,
                                          'border-gray-light-300 dark:border-gray-dark-800 focus:ring-primary-400 hover:border-primary-400 focus-within:border-primary-400 focus-within:shadow-primary-light dark:focus-within:ring-primary-500 dark:hover:border-primary-500 dark:focus-within:border-primary-500 dark:focus-within:shadow-primary-dark': !authStore.errors.identity_proof,
                                    }
                                ]"
                            >
                                <div class="inline-flex items-center gap-3">
                                    <img :src="selectedIdentityProofFile" alt="Selected Image" class="max-w-full h-9 object-contain rounded" />
                                    <div class="text-gray-light-900 dark:text-gray-dark-50">
                                        {{ selectedIdentityProofFileName }}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="transparent"
                                    pill
                                    @click="removeIdentityProof"
                                >
                                    <XIcon />
                                </Button>
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <Label for="address_proof" value="Upload proof of address photo" />
                            <div class="flex gap-3">
                                <input
                                    ref="addressProofInput"
                                    id="address_proof"
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleAddressProof"
                                />
                                <Button
                                    type="button"
                                    variant="primary-faded"
                                    @click="$refs.addressProofInput.click()"
                                >
                                    Browse
                                </Button>
                                <div v-if="authStore.errors.address_proof" class="inline-flex items-center gap-2">
                                    <AlertCircleIcon class="w-4 h-4 text-error-500 dark:text-error-400" />
                                    <InputError :message="authStore.errors.address_proof" />
                                </div>
                            </div>
                            <div
                                v-if="selectedAddressProofFile"
                                class="relative w-full py-2 pl-4 flex justify-between rounded-lg border focus:ring-1 focus:outline-none"
                                :class="[
                                    {
                                          'border-error-300 focus-within:ring-error-300 hover:border-error-300 focus-within:border-error-300 focus-within:shadow-error-light dark:border-error-600 dark:focus-within:ring-error-600 dark:hover:border-error-600 dark:focus-within:border-error-600 dark:focus-within:shadow-error-dark': authStore.errors.address_proof,
                                          'border-gray-light-300 dark:border-gray-dark-800 focus:ring-primary-400 hover:border-primary-400 focus-within:border-primary-400 focus-within:shadow-primary-light dark:focus-within:ring-primary-500 dark:hover:border-primary-500 dark:focus-within:border-primary-500 dark:focus-within:shadow-primary-dark': !authStore.errors.address_proof,
                                    }
                                ]"
                            >
                                <div class="inline-flex items-center gap-3">
                                    <img :src="selectedAddressProofFile" alt="Selected Image" class="max-w-full h-9 object-contain rounded" />
                                    <div class="text-gray-light-900 dark:text-gray-dark-50">
                                        {{ selectedAddressProofFileName }}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="transparent"
                                    pill
                                    @click="removeAddressProof"
                                >
                                    <XIcon />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div v-if="formStep === 3" class="grid gap-5">
                        <div class="space-y-1.5">
                            <Label for="password" value="Password" />
                            <InputIconWrapper
                                :invalid="authStore.errors.password"
                                is-password
                            >
                                <Input
                                    id="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    class="block w-full"
                                    placeholder="New password"
                                    :invalid="authStore.errors.password"
                                    v-model="form.password"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                </template>
                                <div
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    @click="togglePasswordVisibility"
                                >
                                    <template v-if="showPassword">
                                        <EyeIcon aria-hidden="true" class="w-5 h-5 text-gray-light-500 dark:text-gray-dark-400" />
                                    </template>
                                    <template v-else>
                                        <EyeOffIcon aria-hidden="true" class="w-5 h-5 text-gray-light-500 dark:text-gray-dark-400" />
                                    </template>
                                </div>
                            </InputIconWrapper>
                            <InputError :message="authStore.errors.password" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="password_confirmation" value="Confirm Password" />
                            <InputIconWrapper
                                :invalid="authStore.errors.password_confirmation"
                                is-password
                            >
                                <Input
                                    id="password_confirmation"
                                    :type="showPassword2 ? 'text' : 'password'"
                                    class="block w-full"
                                    placeholder="Confirm password"
                                    :invalid="authStore.errors.password_confirmation"
                                    v-model="form.password_confirmation"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-4 h-4 text-error-500 dark:text-error-400" />
                                </template>
                                <div
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    @click="togglePasswordVisibilityConfirm"
                                >
                                    <template v-if="showPassword2">
                                        <EyeIcon aria-hidden="true" class="w-5 h-5 text-gray-light-500 dark:text-gray-dark-400" />
                                    </template>
                                    <template v-else>
                                        <EyeOffIcon aria-hidden="true" class="w-5 h-5 text-gray-light-500 dark:text-gray-dark-400" />
                                    </template>
                                </div>
                            </InputIconWrapper>
                            <InputError :message="authStore.errors.password_confirmation" class="mt-2" />
                        </div>
                        <div class="flex flex-col items-start gap-3 self-stretch">
                            <div v-for="message in passwordValidation().messages" :key="message.key" class="flex items-center gap-2 self-stretch">
                                <div
                                    :class="{
                                        'bg-success-500': message.valid,
                                        'bg-gray-500': !message.valid
                                    }"
                                    class="flex justify-center items-center w-5 h-5 rounded-full grow-0 shrink-0"
                                >
                                    <CheckIcon aria-hidden="true" class="text-white" />
                                </div>
                                <div
                                    class="text-sm"
                                    :class="{
                                        'text-gray-light-600 dark:text-gray-dark-300': message.valid,
                                        'text-gray-light-500 dark:text-gray-dark-400': !message.valid
                                    }"
                                >
                                    {{ message.message }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="formStep === 4" class="grid gap-5">
                        <div class="flex flex-col justify-center items-center gap-[-12px]">
                            <RegisterRocketMan />
                            <div class="flex flex-col items-center self-stretch">
                                <div class="text-lg font-semibold text-gray-light-900 dark:text-gray-dark-50">
                                    Already have friend at METABASE?
                                </div>
                                <div class="text-md font-normal text-gray-light-500 dark:text-gray-dark-400 text-center">
                                    Join with their referral code so you both get <span class="text-primary-600 font-medium">USD 100.00 - REWARDS!</span>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <Label for="referral_code" value="Referral code (last 8 letters in the referral link)" />
                            <InputIconWrapper
                                :invalid="authStore.errors.referral_code"
                                is-password
                            >
                                <Input
                                    id="referral_code"
                                    type="text"
                                    class="block w-full"
                                    placeholder="Optional"
                                    :invalid="authStore.errors.referral_code"
                                    v-model="form.referral_code"
                                />
                                <template #invalidIcon>
                                    <AlertCircleIcon aria-hidden="true" class="w-5 h-5 text-error-500 dark:text-error-400" />
                                </template>
                            </InputIconWrapper>
                            <InputError :message="authStore.errors.referral_code" class="mt-2" />
                        </div>
                        <div class="space-y-1.5">
                            <label class="flex items-start self-stretch">
                                <Checkbox name="remember" v-model:checked="form.terms" />
                                <span class="ml-2 text-xs text-justify text-gray-600 dark:text-white">By proceeding, I agree that I have read the supporting documents and agree to the Risk Disclosure Notice, Terms and Conditions, and Client Agreement.</span>
                            </label>
                        </div>
                    </div>

                    <div class="mt-8 flex justify-center gap-4">
                        <span v-for="step in steps" :key="step" :class="getCircleClass(step)"></span>
                    </div>

                    <div class="mt-4 flex justify-between">
                        <Button
                            type="button"
                            v-if="formStep === 1"
                            variant="secondary-text"
                        >
                            <router-link to="/login">Back to log in</router-link>
                        </Button>
                        <Button
                            type="button"
                            v-if="formStep !== 1"
                            variant="secondary-text"
                            @click="prevPage"
                        >
                            Back
                        </Button>
                        <Button
                            v-if="formStep !== 4"
                            @click.prevent="submitRegisterValidation(form)"
                        >
                            Next
                        </Button>
                        <Button
                            v-if="formStep === 4"
                        >
                            <span>Sign Up</span>
                        </Button>

                    </div>
                </form>
                <div class="mt-10 p-8 flex justify-between w-full">
                    <div>Copyright</div>
                    <div>email</div>
                </div>
            </div>
        </div>
    </div>
</template>