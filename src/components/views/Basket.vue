<template>
  <v-card
    v-if="shopList.length === 0"
    title="Корзина пуста!"
    subtitle="Вы ещё ничего не добавили в корзину! Вернуться к каталогу?"
  >
    <v-card-actions>
      <v-btn @click="goToCatalog">Каталог</v-btn>
    </v-card-actions>
  </v-card>
  <div v-else style="display: flex; flex-direction: column;">
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Название</th>
          <th class="text-left">Количество</th>
          <th class="text-left"></th>
          <th class="text-left">Цена</th>
          <th class="text-left">Итого</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in shopList" :key="item.id">
          <td>
            <v-avatar>
              <v-img :src="item.image" />
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td>
            <div style="display: flex; align-items: center">
              <v-btn
                variant="flat"
                icon="mdi-minus"
                @click="removeFromBasket(item)"
              ></v-btn>
              <div>{{ item.amount }}</div>
              <v-btn
                variant="flat"
                icon="mdi-plus"
                @click="addToBasket(item)"
              ></v-btn>
            </div>
          </td>
          <td>x</td>
          <td>{{ item.price }} р</td>
          <td>{{ item.price * item.amount }} р</td>
          <td>
            <v-btn
              variant="flat"
              icon="mdi-delete"
              @click="deleteAll(item)"
            ></v-btn>
          </td>
        </tr>
        <tr class="text-subtitle-2">
          <td></td>
          <td>Итого:</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ total }} р</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
    <v-btn>Оформить заказ</v-btn>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import router from "../../router";
import { useProductsStore } from "../../store/products";

const productsStore = useProductsStore();
const shopList = computed(() => productsStore.basket);

const total = computed(() => productsStore.calculateTotal());

const addToBasket = (product) => {
  productsStore.addToBasket(product);
};

const removeFromBasket = (product) => {
  productsStore.removeFromBasket(product);
};

const deleteAll = (product) => {
  product.amount = 1;
  productsStore.removeFromBasket(product);
};

const goToCatalog = () => {
  router.push({ name: "Catalog" });
};
</script>

<style>
</style>