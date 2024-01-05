<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h4 class="text-center font-semibold text-xl">Editar produto</h4>
            <div class="">
              <form @submit.prevent="updateProduct" class="mx-auto max-w-xl sm:mt-7">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                    <div class="mt-2.5">
                      <input type="text" v-model="localName" name="name" id="name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                  </div>
                  <div>
                    <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Quantidade</label>
                    <div class="mt-2.5">
                      <input type="number" v-model="localQuantity" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>

                  </div>
                  <div class="sm:col-span-1">
                    <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Valor</label>
                    <div class="mt-2.5">
                      <input v-model="localValue" type="number" name="company" id="company" autocomplete="organization" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Editar Produto</button>
                </div>
              </form>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="modalEditProduct.modalClose" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";
import {useToast} from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import {useModalShowProductEdit} from "@/stores/ModalShowProductEdit.js";

const $createToast = useToast();
const modalEditProduct = useModalShowProductEdit();
const emit = defineEmits(['postEdited']);

const props = defineProps({
  id: Number,
  name: String,
  quantity: Number,
  value: Number
})

const localName = ref(props.name);
const localQuantity = ref(props.quantity);
const localValue = ref(props.value);

function updateProduct() {

  let data = {
    name: localName.value,
    quantity: Number(localQuantity.value),
    value: Number(localValue.value)
  }

  axios.put(`produtos/${props.id}`, data)
    .then(response => {
      if(response.status === 201) {
        $createToast.success('Produto atualizado com sucesso!', {
          position: 'top-right',
          duration: 5000,
        })
        return emit('postEdited', response.data);
      }

      $createToast.error(response.data.errors, {
        position: 'top-right',
        duration: 5000,
      })
    })
}



</script>