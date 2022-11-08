<template>
  <v-app-bar :elevation="2" density="comfortable">
    <div>
      <MainMenu 
      :isMenuOpened="isMenuOpened"
      :isAuthorized="isAuthorized"
      :authorizeOpen="authorizeOpen"
      @login="authorizeOpen = true"
      @exit="exit"
      />
    </div>
    <v-app-bar-title 
    @click="goToCatalog" 
    style="cursor: pointer; max-width: fit-content;"
    >
    Hooka-Wooka
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn 
      icon="mdi-basket" 
      @click="goToBasket"
      class="d-none d-sm-inline"
      ></v-btn>
      <div class="d-inline d-sm-none">
        <MobileFilters
        :filtersOpened="filtersOpened"
        />
      </div>
      <v-btn v-if="isAuthorized"
       icon="mdi-location-exit"
       @click="exit"
       class="d-none"
       ></v-btn>
      <div v-else>
        <AuthForm 
        :authorizeOpen="authorizeOpen"
        @authorisationSuccess="isAuthorized = true"
        />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import router from "../router";
import { useUsersStore } from "../store/users";
import MainMenu from "./MainMenu.vue";
import AuthForm from "./AuthForm.vue";
import MobileFilters from "./MobileFilters.vue";

const goToBasket = () => {
  router.push({ name: "Basket" });
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};

const authorizeOpen = ref(false);
const isAuthorized = ref(false);

const isMenuOpened = ref(false);

const usersStore = useUsersStore();

const exit = () => {
  usersStore.exit();
  isAuthorized.value = false;
};


const filtersOpened = ref(false);
</script>

<style>
</style>