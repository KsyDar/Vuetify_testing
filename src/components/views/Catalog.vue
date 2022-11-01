<template>
  <div style="display: flex">
    <div style="padding: 16px">
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-action start>
              <v-checkbox-btn
                label="Все товары"
                @change="selectAll()"
                v-model="allSelected"
              ></v-checkbox-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-for="typeItem in types" :key="typeItem.id">
            <v-list-item-action start>
              <v-checkbox-btn
                :label="typeItem.name"
                @change="filter(typeItem)"
              ></v-checkbox-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <v-container>
      <v-row align="start">
        <v-col v-for="product in itemsPage" :key="product.id" cols="4">
          <v-card :title="product.name">
            <v-img :src="product.image" height="200px" cover />
            <v-card-actions>
              <v-card-text>{{ product.price }}p</v-card-text>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-if="count(product)"
                style="align-items: center"
                divided
              >
                <v-btn icon="mdi-minus" @click="removeFromBasket(product)"></v-btn>
                <div>{{ count(product) }}</div>
                <v-btn
                  icon="mdi-plus"
                  @click="addToBasket(product)"
                ></v-btn>
              </v-btn-toggle>
              <v-btn v-else @click="addToBasket(product)">В корзину</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="pagesCount"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useProductsStore } from "../../store/products";
import { computed, onBeforeMount, ref } from "vue";

const productsStore = useProductsStore();
const products = computed(() => productsStore.filteredItems);
const types = computed(() => productsStore.types);

const filters = ref([]);

onBeforeMount(async () => {
  await productsStore.getProducts();
  await productsStore.getTypes();
});

const countItemsOnPage = 6;
const page = ref(1);
const pagesCount = computed(() =>
  Math.ceil(products.value.length / countItemsOnPage)
);
const itemsPage = computed(() => {
  return products.value.slice(
    countItemsOnPage * (page.value - 1),
    countItemsOnPage * page.value
  );
});

const allSelected = ref(true);

const selectAll = () => {
  productsStore.setFilter([]);
  allSelected.value = true;
};

const filter = (type) => {
  if (filters.value.indexOf(type.id) === -1) {
    filters.value.push(type.id);
  } else {
    filters.value = filters.value.filter((f) => f !== type.id);
  }

  page.value = 1;
  productsStore.setFilter(filters.value);
  allSelected.value = false;

  if (filters.value.length >= productsStore.types.length) {
    selectAll();
  }
};


const count = (product) => {
  let counter = 0;
  const item = productsStore.basket.find(el => el.id === product.id)
  if(item) {
    return counter = item.amount;
  }
  else return false;
}

const addToBasket = (product) => {
  const basketItem = {
    amount: 1,
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
  };
  productsStore.addToBasket(basketItem);
};

const removeFromBasket = (product) => {
  productsStore.removeFromBasket(product);
}
</script>

<style>
</style>