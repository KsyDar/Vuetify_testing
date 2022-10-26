<template>
  <v-container>
    <v-row align="start" no-gutters>
      <v-col v-for="product in products" :key="product.id" cols="4">
        <v-card :title="product.name">
          <v-img :src="product.image" height="200px" cover/>
          <v-card-actions>
            <v-card-tex>{{product.price}}p</v-card-tex>
            <v-spacer></v-spacer>
            <v-btn>В корзину</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useProductsStore } from "../store/products";
import { onBeforeMount, ref } from "vue";

const productsStore = useProductsStore();
const products = ref([]);

onBeforeMount(() => {
  productsStore.getProducts();
  products.value = productsStore.products;
});
</script>

<style>
</style>