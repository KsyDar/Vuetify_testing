<template>
  <v-container style="max-width: 105px">
    <v-row
      style="height: 36px"
      class="bg-main_color_green rounded-pill d-flex align-center"
    >
      <v-col cols="4" class="pa-0">
        <v-btn
          icon="mdi-minus"
          @click="count(product, --counter)"
          class="bg-main_color_green elevation-0 h-auto w-auto"
        >
        </v-btn>
      </v-col>
      <v-col cols="4" class="pa-0">
        <input
          v-model="counter"
          type="number"
          size="1"
          maxlength="2"
          class="h-100 ml-2 text-main_color_white count-input"
          @change="count(product, counter)"
        />
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-btn
          icon="mdi-plus"
          @click="count(product, ++counter)"
          class="bg-main_color_green elevation-0 h-auto w-auto mr-0"
        >
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { ref } from "vue";
import { useBasketStore } from "../../store/basket";

const props = defineProps({
  product: Object,
});

const basketStore = useBasketStore();
const counter = ref(basketStore.getCounter(props.product));

const count = (product, newCounter) => {
  const basketItem = {
    amount: newCounter,
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
  };

  basketStore.updateBasket(basketItem);
}
</script>
  
<style>
.count-input {
  border: none;
  outline: none;
}
</style>