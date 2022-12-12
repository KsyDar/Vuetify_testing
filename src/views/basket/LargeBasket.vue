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
              <UIcounter :product="item"/>
            </td>
            <td>x</td>
            <td>{{ item.price.toLocaleString() }} р</td>
            <td>{{ (item.price * item.amount).toLocaleString() }} р</td>
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