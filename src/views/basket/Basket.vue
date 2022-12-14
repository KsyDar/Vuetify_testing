<template>
  <v-main>
    <v-card
      v-if="shopList.length === 0"
      title="Корзина пуста!"
      subtitle="Вы ещё ничего не добавили в корзину!"
      class="bg-main_color_white text-text_color_grey"
    >
      <v-card-actions>
        <v-btn @click="goToCatalog" class="rounded-pill bg-marker_color_orange">
          Каталог
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else class="d-flex flex-column">
      <MobileBasket
        v-if="isMobile"
        :shopList="shopList"
        @deleteAll="deleteAll"
      />

      <LargeBasket
        v-else
        :shopList="shopList"
        @deleteAll="deleteAll"
      />

      <div
        class="
          bg-main_color_white
          text-text_color_grey
          d-flex
          flex-column
          align-end
        "
      >
        <v-card-title class="text-right">
          Итого: {{ basketStore.calculatedTotal.toLocaleString() }} р
        </v-card-title>

        <v-btn
            class="bg-marker_color_orange rounded-pill d-block ma-0"
            variant="text"
            @click="order"
          >
            Оформить заказ
          </v-btn>
        <AuthForm :isOpen="isAuthOpen" @closed="closeAuthModal" :isNewOrder="true" />
        <NewOrderModal 
            v-model="isOrderOpened"
            :total="basketStore.calculateTotal" 
            />
      </div>
    </div>
  </v-main>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";
import { useDisplay } from "vuetify";

import router from "../../router";

import { useBasketStore } from "../../store/basket";
import { useUsersStore } from "../../store/users";

import NewOrderModal from "../../components/modals/NewOrderModal.vue";
import AuthForm from "../../components/modals/AuthForm.vue";
import MobileBasket from "./MobileBasket.vue";
import LargeBasket from "./LargeBasket.vue";

const usersStore = useUsersStore();
const isAuthorized = computed(() => {
  if (usersStore.currentUser === null) {
    return false;
  }
  return true;
});

const { width } = useDisplay();
const isMobile = computed(() => width.value < 600);


const basketStore = useBasketStore();
const shopList = computed(() => basketStore.basket);

const updateBasket = (product) => {
  basketStore.updateBasket(product);
};

const deleteAll = (product) => {
  product.amount = 0;
  basketStore.updateBasket(product);
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};


const isOrderOpened = ref(false);
const isAuthOpen = ref(false);

const order = () => {
  if(isAuthorized.value) {
    isOrderOpened.value = true
  } else {
    isAuthOpen.value = true
  }
}

const closeAuthModal = () => {
  isAuthOpen.value = false;
  isOrderOpened.value = true;
}

</script>

<style>
</style>