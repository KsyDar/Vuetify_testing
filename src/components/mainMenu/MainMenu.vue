<template>
  <v-menu bottom left activator="parent">
    <template v-slot:activator="{ props }">
      <v-app-bar-nav-icon
        v-bind="props"
      />
    </template>
    <v-list class="bg-main_color_white">
      <v-list-item class="pa-0">
        <v-btn class="w-100" variant="text" @click="goToBasket">
          Корзина
        </v-btn>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-btn
          class="w-100"
          variant="text"
          :disabled="!isAuthorized"
          @click="goToOrders"
        >
          Заказы
        </v-btn>
      </v-list-item>
      <v-list-item class="pa-0">
        <div v-if="!isAuthorized" class="w-100">
          <AuthForm
            :isMenu="true"
            :isFullScreen="!isFullScreen"
          />
        </div>
        <v-btn v-else class="w-100" variant="text" @click="exit"> Выйти </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import router from "../../router";

import { ref } from "@vue/reactivity";

import { useUsersStore } from "../../store/users";

import AuthForm from "../modals/AuthForm.vue";


const props = defineProps({
  isMenuOpened: Boolean,
  isAuthorized: Boolean,
  isFullScreen: Boolean,
});

const emits = defineEmits(["exit"]);

const isOrdersOpened = ref(false);

const goToBasket = () => {
  router.push({ name: "Basket" });
};

const goToOrders = () => {
  router.push({ name: "OrdersList" });
};

const exit = () => {
  emits("exit");
};
</script>

<style>
</style>