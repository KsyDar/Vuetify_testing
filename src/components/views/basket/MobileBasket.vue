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
                Итого: {{ total }} р
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col>
              <v-item-group
                style="height: 36px; max-width: fit-content"
                class="
                  bg-main_color_green
                  rounded-pill
                  d-flex
                  justify-center
                  align-center
                  w-75
                  pa-2
                "
              >
                <v-btn
                  icon="mdi-minus"
                  @click="removeFromBasket(item)"
                  class="bg-main_color_green h-auto w-auto mr-2 elevation-0"
                >
                </v-btn>
                <div>
                  {{ item.amount }}
                </div>
                <v-btn
                  icon="mdi-plus"
                  @click="addToBasket(item)"
                  class="bg-main_color_green h-auto w-auto ml-2 elevation-0"
                >
                </v-btn>
              </v-item-group>
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
              {{ item.price }} р
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
const props = defineProps({
    shopList: Array,
});

const emits = defineEmits(['removeFromBasket', 'addToBasket', 'deleteAll']);

const removeFromBasket = (item) => {
    emits('removeFromBasket', item);
};

const addToBasket = (item) => {
    emits('addToBasket', item);
};

const deleteAll = (item) => {
    emits('deleteAll', item);
};
</script>

<style>

</style>