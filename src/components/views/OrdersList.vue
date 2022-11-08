<template>
  <v-card
    v-if="orders.length === 0"
    title="История заказов пуста!"
    subtitle="Вы ещё ничего не сделали ни одного заказа! Вернуться к каталогу?"
  >
    <v-card-actions>
      <v-btn @click="goToCatalog">Каталог</v-btn>
    </v-card-actions>
  </v-card>
  <div v-else style="display: flex; flex-direction: column">
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">№</th>
          <th class="text-left">Дата</th>
          <th class="text-left">Название</th>
          <th class="text-left">Количество</th>
          <th class="text-left"></th>
          <th class="text-left">Цена</th>
          <th class="text-left">Итого</th>
        </tr>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <tr>
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="item in order.list" :key="item.id">
          <td></td>
          <td></td>
          <td>{{ item.name }}</td>
          <td>
            {{ item.amount }}
          </td>
          <td>x</td>
          <td>{{ item.price }} р</td>
          <td>{{ item.price * item.amount }} р</td>
        </tr>
        <tr class="text-subtitle-2">
          <td></td>
          <td></td>
          <td>Итого:</td>
          <td></td>
          <td></td>
          <td>{{ order.total }} р</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { useProductsStore } from "../../store/products";
import { useUsersStore } from "../../store/users";
import router from "../../router";
import { computed, onBeforeMount } from "@vue/runtime-core";

const usersStore = useUsersStore();
const productsStore = useProductsStore();

onBeforeMount(async () => {
  await usersStore.getOrdersHistory();
})

const orders = computed(() => usersStore.currentOrders);

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};
</script>

<style>
</style>