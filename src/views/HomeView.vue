<template>

    <FormProduct @postCreated="postCreated"/>
   <div class="container mx-auto mt-20">
     <ul role="list" class="divide-y divide-gray-100">
        <div v-if="!productsAll.length">
          <li>Não há nenhum produto cadastrado</li>
        </div>
       <li
           class="flex justify-between gap-x-6 py-5"
            v-for="product in productsAll"
            :key="product.id"
       >
         <div class="flex min-w-0 gap-x-4">
           <div class="min-w-0 flex-auto">
             <p class="text-sm font-semibold leading-6 text-gray-900">{{ product.name }}</p>
           </div>
         </div>
         <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div class="flex gap-3">
              <a class="text-sm leading-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Editar</a>
              <a @click.prevent="deleteProduct(product.id)" class="text-sm leading-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Deletar</a>
              <a @click.prevent="show(product.id)" class="text-sm leading-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Mostrar</a>
            </div>
         </div>
       </li>
     </ul>
   </div>

  <div v-if="Modal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{ productId.name }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Quantidade: {{ productId.quantity }}</p>
                  <p class="text-sm text-gray-500">Valor: {{ productId.value }} R$</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="closeModal" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import axios from "axios";

import {onMounted, ref} from "vue";
import FormProduct from "@/components/FormProduct.vue";

const productsAll = ref([]);

const productId = ref(null);

const Modal = ref(false);

function postCreated(value) {
  productsAll.value.unshift(value)
}

onMounted(() => {
    axios.get('produtos')
        .then((response) => {
          productsAll.value = response.data;
        })
})

function deleteProduct(id) {
  axios.delete(`produtos/${id}`)
      .then(() => {
        let all = productsAll.value;
        const idProductDelete = productsAll.value.findIndex(product => product.id === id);
        all.splice(idProductDelete, 1);
      })
}

function show(id) {
    productId.value = productsAll.value.find(product => product.id === id);
    Modal.value = true;
}

function closeModal() {
    Modal.value = false;
}

</script>