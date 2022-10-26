<template>
  <div style="display:flex">
    <div style="padding:16px">
      <v-card>
        <v-list>
          <v-list-item v-for="typeItem in types" :key="typeItem.id">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="typeItem.selected" :label="typeItem.name"></v-checkbox-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <v-container>
      <v-row align="start">
        <v-col v-for="product in products" :key="product.id" cols="4">
          <v-card :title="product.name">
            <v-img :src="product.image" height="200px" cover />
            <v-card-actions>
              <v-card-text>{{ product.price }}p</v-card-text>
              <v-spacer></v-spacer>
              <v-btn>В корзину</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useProductsStore } from "../store/products";
import { onBeforeMount, ref } from "vue";

const productsStore = useProductsStore();
const products = ref([]);
const types = ref([]);

onBeforeMount(async () => {
  await productsStore.getProducts();
  await productsStore.getTypes();
  products.value = productsStore.products;
  types.value = productsStore.types;
});
</script>

<style>
</style>