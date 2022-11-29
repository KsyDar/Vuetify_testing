<template>
  <v-app-bar :elevation="2" density="comfortable" class="bg-main_color_green header">
    <div>
      <MainMenu
        :isMenuOpened="isMenuOpened"
        :isAuthorized="isAuthorized"
        :authorizeOpen="authorizeOpen"
        :isFullScreen="isDisable"
        @login="authorizeOpen = true"
        @exit="exit"
      />
    </div>
    <v-app-bar-title
      @click="goToCatalog"
      style="cursor: pointer; max-width: fit-content"
      class="text-h4 font-weight-black"
    >
      Hooka-Wooka
    </v-app-bar-title>
    <template v-slot:append>
      <div v-if="isDisable" class="d-flex">
        <v-btn icon="mdi-basket" class="text-marker_color_orange" @click="goToBasket"></v-btn>
        <v-btn
          v-if="isAuthorized"
          icon="mdi-location-exit"
          @click="exit"
        ></v-btn>
        <div v-else>
          <AuthForm
            @authorisationSuccess="authorizeOpen = false"
            :authorizeOpen="authorizeOpen"
            :isFullScreen="!isDisable"
          />
        </div>
      </div>
      <div v-else>
        <MobileFilters />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from "@vue/reactivity";
import { useDisplay } from "vuetify";

import router from "../router";

import { useUsersStore } from "../store/users";

import MainMenu from "./MainMenu.vue";
import AuthForm from "./modals/AuthForm.vue";
import Filters from "./filters/Filters.vue";
import MobileFilters from "./filters/MobileFilters.vue";


const goToBasket = () => {
  router.push({ name: "Basket" });;
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};

const usersStore = useUsersStore();
const authorizeOpen = ref(false);
const isAuthorized = computed(() => {
  if(usersStore.currentUser) {
    return true
  }
  else return false
});
const isMenuOpened = ref(false);

const exit = () => {
  usersStore.exit();
};


const { width } = useDisplay();
const isDisable = computed(() => width.value > 960);
</script>

<style>
/* .header {
  border-bottom: 4px dotted rgb(var(--v-theme-main_color_1));
} */
</style>