import {defineStore} from 'pinia';

export const useModalShowProduct = defineStore('ModalShowProduct', {

    state: () => ({
        showModal: false
    }),

    getters: {
       modalDynamic: (state) => state.showModal,
    },

    actions: {
        modalOpen() {
            this.showModal = true;
        },
        modalClose() {
            this.showModal = false;
        }
    }

})