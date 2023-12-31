import { defineStore } from "pinia";
import axios from 'axios';
import {useAlertStore} from "@/stores/alert";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        authErrors: []
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async getUser() {
            await this.getToken();
            const data = await axios.get('/api/user');
            this.authUser = data.data;
        },
        async handleLogin (data) {
            this.authErrors = [];
            await this.getToken();

            try {
                await axios.post('/login', {
                    email: data.email,
                    password: data.password,
                });
                await this.router.push('/dashboard')
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleRegisterValidation (data) {
            this.authErrors = [];
            await this.getToken();

            try {
                await axios.post('/validateRegister', {
                    form_step: data.form_step,
                    title: data.title,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    trade_experience: data.trade_experience,
                    source_of_fund: data.source_of_fund,
                    gender: data.gender,
                    dob: data.dob,
                    nationality: data.nationality,
                    us_citizen: data.us_citizen,
                    identification_type: data.identification_type,
                    identification_number: data.identification_number,
                    identity_proof: data.identity_proof,
                    address_proof: data.address_proof,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    referral_code: data.referral_code,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleRegister (data) {
            const alertStore = useAlertStore()
            this.authErrors = [];
            await this.getToken();

            try {
                const response = await axios.post('/register', {
                    title: data.title,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    trade_experience: data.trade_experience,
                    source_of_fund: data.source_of_fund,
                    gender: data.gender,
                    dob: data.dob,
                    nationality: data.nationality,
                    us_citizen: data.us_citizen,
                    identification_type: data.identification_type,
                    identification_number: data.identification_number,
                    identity_proof: data.identity_proof,
                    address_proof: data.address_proof,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    referral_code: data.referral_code,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                alertStore.show({
                    intent: response.data.status,
                    title: response.data.title,
                    message: response.data.message,
                });

                await this.router.push('/login')
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleLogOut () {
            await axios.post("/logout");
            this.authUser = null;
            await this.router.push('/login')
        }
    }
})