<template>
  <v-main>
    <v-card
      v-if="shopList.length === 0"
      title="Корзина пуста!"
      subtitle="Вы ещё ничего не добавили в корзину!"
      class="bg-main_color_white text-text_color_grey"
    >
      <v-card-actions>
        <v-btn @click="goToCatalog"
        class="rounded-pill bg-marker_color_orange"
        >
        Каталог
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else style="flex-direction: column" class="d-flex">
      <MobileBasket
      v-if="isMobile"
      :shopList="shopList"
      @removeFromBasket="removeFromBasket"
      @addToBasket="addToBasket"
      @deleteAll="deleteAll"
      />

      <LargeBasket
      v-else
      :shopList="shopList"
      @removeFromBasket="removeFromBasket"
      @addToBasket="addToBasket"
      @deleteAll="deleteAll"
      />
      
      <v-card class="bg-main_color_white text-text_color_grey">
        <v-card-title class="text-right"> 
          Итого: {{ total }} р 
        </v-card-title>
      </v-card>

      <div>
        <NewOrderModal :isOrderOpened="isOrderOpened" :total="total" />
      </div>
    </div>
  </v-main>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";
import { useDisplay } from "vuetify";

import router from "../../../router";

import { useBasketStore } from "../../../store/basket";

import NewOrderModal from "../../modals/NewOrderModal.vue";
import MobileBasket from "./MobileBasket.vue";
import LargeBasket from "./LargeBasket.vue";



const { width } = useDisplay();
const isMobile = computed(() => width.value < 600);

const basketStore = useBasketStore();
const shopList = computed(() => basketStore.basket);

const total = computed(() => basketStore.calculateTotal().toString());

const addToBasket = (product) => {
  basketStore.addToBasket(product);
};

const removeFromBasket = (product) => {
  basketStore.removeFromBasket(product);
};

const deleteAll = (product) => {
  product.amount = 1;
  basketStore.removeFromBasket(product);
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};

const isOrderOpened = ref(false);
</script>

<style>
</style>