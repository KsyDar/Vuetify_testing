<template>
      <v-list>
        <v-list-item>
          <v-switch
            v-model="allSelected"
            @change="selectAll()"
            color="marker_color_orange"
            label="Все товары"
            :class="[{ active: allSelected }, inactive]"
            class="text-h6 font-weight-black"            
          ></v-switch>
        </v-list-item>

        <v-list-item v-for="typeItem in types" :key="typeItem.id" >
          <v-switch
            v-model="typeItem.selected"
            @change="filter(typeItem)"
            color="marker_color_orange"
            :label="typeItem.name"
            :class="[{ active: typeItem.selected }, inactive]"
            class="text-h6 font-weight-black"
            hide-details
          ></v-switch>
        </v-list-item>
      </v-list>
</template>

<script setup>
import { useProductsStore } from "../../store/products";

import { computed, ref } from "vue";


const emits = defineEmits(["selectAll", "filter", "openFilters"]);

const types = computed(() => productsStore.types); 
const productsStore = useProductsStore();

const allSelected = computed(() => {
  if(productsStore.filters.length === 0) {
    return true
  } else {
    return false
  };
});

const selectAll = () => {
  productsStore.cleanFilters();
};

const filter = (type) => {
  productsStore.setFilter(type);
};
</script>

<style>
.active {
  color: rgb(var(--v-theme-text_color_orange));
}

.inactive {
  color: rgb(var(--v-theme-text_color_grey));
}
</style>