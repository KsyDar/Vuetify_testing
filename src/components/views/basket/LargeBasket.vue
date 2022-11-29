<template>
  <v-table
        fixed-header
        class="
          bg-main_color_white
          text-text_color_grey
          text-center text-h6
          font-weight-black
        "
      >
        <thead>
          <tr>
            <th></th>
            <th class="text-center text-h6">Название</th>
            <th class="text-center text-h6">Количество</th>
            <th></th>
            <th class="text-center text-h6">Цена</th>
            <th class="text-center text-h6">Итого</th>
            <th></th>
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
            <td class="d-flex justify-center align-center">
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
                <div>{{ item.amount }}</div>
                <v-btn
                  icon="mdi-plus"
                  @click="addToBasket(item)"
                  class="bg-main_color_green h-auto w-auto ml-2 elevation-0"
                >
                </v-btn>
              </v-item-group>
            </td>
            <td>x</td>
            <td>{{ item.price }} р</td>
            <td>{{ item.price * item.amount }} р</td>
            <td>
              <v-btn
                variant="flat"
                icon="mdi-delete"
                class="bg-main_color_white text-marker_color_orange"
                @click="deleteAll(item)"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
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