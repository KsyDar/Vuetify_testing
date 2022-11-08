<template>
  <v-menu bottom left activator="parent">
    <template v-slot:activator="{ isMenuOpened }">
      <v-app-bar-nav-icon
        v-bind="isMenuOpened"
        @click="isMenuOpened = !isMenuOpened"
      />
    </template>
    <v-list>
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
        <v-btn
          v-if="!isAuthorized"
          class="w-100"
          variant="text"
          @click="authorisation"
        >
          Войти
        </v-btn>
        <v-btn v-else class="w-100" variant="text" @click="exit"> Выйти </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import router from "../router";
import { ref } from "@vue/reactivity";
import { useUsersStore } from "../store/users";

const props = defineProps({
  isMenuOpened: Boolean,
  isAuthorized: Boolean,
  authorizeOpen: Boolean,
});

const emits = defineEmits(["login", "exit"]);

const goToBasket = () => {
  router.push({ name: "Basket" });
};

const authorisation = () => {
  emits("login");
};


const isOrdersOpened = ref(false);

const goToOrders = () => {
    router.push({ name: "OrdersList" });
};


const usersStore = useUsersStore();

const exit = () => {
  emits("exit");
};
</script>

<style>
</style>