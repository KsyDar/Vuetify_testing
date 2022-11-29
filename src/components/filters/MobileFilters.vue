<template>
  <div class="text-center">
    <v-menu :close-on-content-click="false" location="end" activator="parent">
      <template v-slot:activator="{ isFiltersOpened }">
        <v-btn
          v-bind="isFiltersOpened"
          icon="mdi-filter"
          @click="isFiltersOpened = !isFiltersOpened"
        ></v-btn>
      </template>

      <Filters/>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Filters from "./Filters.vue";

const isFiltersOpened = ref(false);
</script>

<style>
</style>