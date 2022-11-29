<template>
  <v-app>
    <Header></Header>
    <router-view />
  </v-app>
</template>

<script setup>
import Header from "./components/Header.vue";
import Filters from "./components/filters/Filters.vue";
import router from "./router";
import { useDisplay } from "vuetify";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { width } = useDisplay();
const isDisable = computed(() => width.value > 960);

const routeName = computed(() => useRoute().name === 'Catalog');
</script>
