<template>
  <v-app>
    <Header></Header>
    <v-main>
    <Catalog/>
    </v-main>  
  </v-app>
</template>

<script setup>
import Catalog from './components/Catalog.vue';
import Header from './components/Header.vue';

</script>
