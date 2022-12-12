<template>
  <div class="text-center">
    <v-menu :close-on-content-click="false" location="end" activator="parent">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-filter"
        ></v-btn>
      </template>

      <Filters/>
    </v-menu>
  </div>
</template>

<script setup>
import Filters from "./Filters.vue";
</script>

<style>
</style>