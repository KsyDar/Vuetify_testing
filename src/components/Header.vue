<template>
  <v-app-bar :elevation="2">
    <v-app-bar-nav-icon />
    <v-app-bar-title 
    @click="goToCatalog" 
    style="cursor: pointer"
    >
    Hooka-Wooka
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-basket" @click="goToBasket"></v-btn>
      <AuthForm :authorize="authorize"/>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import router from "../router";
import AuthForm from "./views/AuthForm.vue";

const goToBasket = () => {
  router.push({ name: "Basket" });
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};

const authorize = ref(false);
</script>

<style>
</style>