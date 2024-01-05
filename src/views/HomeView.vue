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
              <a @click.prevent="edit(product.id)" class="text-sm leading-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Editar</a>
              <a @click.prevent="deleteProduct(product.id)" class="text-sm leading-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Deletar</a>
              <a @click.prevent="show(product.id)" class="text-sm leading-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Mostrar</a>
            </div>
         </div>
       </li>
     </ul>
   </div>

  <ModalProduct
      v-if="modalShowProduct.modalDynamic"
      :name="productId.name"
      :quantity="productId.quantity"
      :value="productId.value"
  />

  <ModalProductEdit
    v-if="modalEditProduct.modalDynamic"
    :id="productEdit.id"
    :quantity="productEdit.quantity"
    :value="productEdit.value"
    :name="productEdit.name"
    @postEdited="postEdited"
  />

</template>


<script setup>

import axios from "axios";

import {onMounted, ref} from "vue";
import FormProduct from "@/components/FormProduct.vue";
import ModalProduct from "@/components/ModalProduct.vue";
import {useModalShowProduct} from "@/stores/ModalShowProduct.js";
import ModalProductEdit from "@/components/ModalProductEdit.vue";
import {useModalShowProductEdit} from "@/stores/ModalShowProductEdit.js";


const productsAll = ref([]);

const productId = ref(null);

const productEdit = ref(null);


const modalShowProduct = useModalShowProduct();
const modalEditProduct = useModalShowProductEdit();

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
    modalShowProduct.modalOpen();
}


function edit(id) {
  productEdit.value = productsAll.value.find(product => product.id === id);
  modalEditProduct.modalOpen();
}

function postEdited(product) {
  const all = productsAll.value;
  const id = all.findIndex(product => product.id === product.id);
  all.splice(id, 1, product)
  modalEditProduct.modalClose();
}

</script>