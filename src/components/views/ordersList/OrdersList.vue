<template>
  <v-main>
    <v-card
      v-if="orders.length === 0"
      title="История заказов пуста!"
      subtitle="Вы ещё ничего не сделали ни одного заказа! Вернуться к каталогу?"
      class="bg-main_color_white text-text_color_grey"
    >
      <v-card-actions>
        <v-btn @click="goToCatalog">Каталог</v-btn>
      </v-card-actions>
    </v-card>

    <div v-else style="display: flex; flex-direction: column">
      <MobileOrders
     v-if="isMobile"
     :orders="orders"
     />

     <LargeOrders
     v-else
     :orders="orders"
     />
    </div>
  </v-main>
</template>

<script setup>
import { useUsersStore } from "../../../store/users";

import router from "../../../router";

import { computed, onBeforeMount } from "@vue/runtime-core";
import { useDisplay } from "vuetify";

import MobileOrders from "./MobileOrders.vue";
import LargeOrders from "./LargeOrders.vue"



const { width } = useDisplay();
const isMobile = computed(() => width.value < 600);

const usersStore = useUsersStore();

onBeforeMount(async () => {
  await usersStore.getOrdersHistory();
});

const orders = computed(() => usersStore.currentOrders);

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};
</script>

<style>
</style>