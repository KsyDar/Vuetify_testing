<template>
  <v-card
        v-for="item in shopList"
        :key="item.id"
        class="d-flex bg-main_color_white"
      >
        <v-container>
          <v-row class="align-center">
            <v-col cols="3">
              <v-img :src="item.image"></v-img>
            </v-col>
            <v-col>
              <v-card-title
                class="text-h6 font-weight-black text-text_color_grey"
              >
              {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                Итого: {{ (item.price * item.amount).toLocaleString() }} р
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col>
              <UIcounter :product="item"/>
            </v-col>
            <v-col cols="2">
              <v-card-text
                class="text-h6 font-weight-black text-text_color_grey"
              >
                x
              </v-card-text>
            </v-col>
            <v-col>
              <v-card-text
                class="text-h6 font-weight-black text-text_color_grey"
              >
              {{ item.price.toLocaleString() }} р
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-btn
                variant="flat"
                icon="mdi-delete"
                size="x-small"
                @click="deleteAll(item)"
                class="bg-main_color_white text-marker_color_orange"
              >
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
</template>

<script setup>
import UIcounter from '../../components/ui/UIcounter.vue';


const props = defineProps({
    shopList: Array,
});

const emits = defineEmits(['deleteAll']);

const deleteAll = (item) => {
    emits('deleteAll', item);
};
</script>

<style>

</style>