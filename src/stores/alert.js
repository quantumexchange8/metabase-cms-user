import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        showAlert: false,
        title: '',
        message: '',
        intent: '',
    }),
    actions: {
        show({ title, message, intent }) {
            this.showAlert = true;
            this.title = title;
            this.message = message;
            this.intent = intent;
        },
        hide() {
            this.showAlert = false;
        },
    },
});