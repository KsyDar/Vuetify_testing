<template>
  <v-navigation-drawer
    permanent
    disable-resize-watcher
    v-model="isDisable"
    class="border-none"
  >
    <Filters />
  </v-navigation-drawer>
  <v-main>
    <div class="d-flex">
      <v-container>
        <v-row class="align-start">
          <v-col v-for="product in itemsPage" :key="product.id" :cols="cols">
            <v-card>
              <v-card-title class="text-text_color_grey">
                {{ product.name }}
              </v-card-title>
              <v-img :src="product.image" height="200px" cover />
              <v-card-actions class="bg-main_color_white">
                <v-card-text class="text-marker_color_orange text-h6">
                  {{ product.price.toLocaleString() }}p
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="(basketStore.getCounter(product) === 0)"
                  @click="addToBasket(product)"
                  class="bg-main_color_green font-weight-bold rounded-pill"
                >
                  В корзину
                </v-btn>

                <UIcounter v-else :product="product"/>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pagesCount"
            active-color="main_color_1"
          >
          </v-pagination>
        </div>
      </v-container>
    </div>
  </v-main>
</template>

<script setup>
import { useProductsStore } from "../../store/products";
import { useBasketStore } from "../../store/basket";

import { computed, onBeforeMount, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import Filters from "../filters/Filters.vue";
import UIcounter from "../ui/UIcounter.vue";

const productsStore = useProductsStore();
const basketStore = useBasketStore();

onBeforeMount(async () => {
  await productsStore.getProducts();
});

const { width } = useDisplay();
const isDisable = computed(() => width.value > 960);

const cols = computed(() => {
  if (width.value < 601) {
    return 12;
  } else {
    return 4;
  }
});

const products = computed(() => productsStore.filteredItems);
const countItemsOnPage = 6;
const page = ref(1);

watch(
  () => productsStore.filters.length,
  () => {
    page.value = 1;
  }
);

const pagesCount = computed(() =>
  Math.ceil(products.value.length / countItemsOnPage)
);

const itemsPage = computed(() => {
  return products.value.slice(
    countItemsOnPage * (page.value - 1),
    countItemsOnPage * page.value
  );
});

const addToBasket = (product) => {
  const basketItem = {
    amount: 1,
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
  };
  basketStore.updateBasket(basketItem);
};
</script>

<style scoped>
</style>