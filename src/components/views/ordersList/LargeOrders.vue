<template>
   <v-table
        fixed-header
        class="
          bg-main_color_white
          text-text_color_grey
          text-h6
          font-weight-black
        "
      >
        <thead>
          <tr>
            <th class="text-left text-h6">№</th>
            <th class="text-left text-h6">Дата</th>
            <th class="text-left text-h6">Название</th>
            <th class="text-left text-h6">Количество</th>
            <th class="text-left text-h6"></th>
            <th class="text-left text-h6">Цена</th>
            <th class="text-left text-h6">Итого</th>
          </tr>
        </thead>
        <tbody v-for="order in orders" :key="order.id">
          <tr>
            <td class="text-marker_color_orange text-h6">{{ order.id }}</td>
            <td class="text-marker_color_orange text-h6">{{ order.date }}</td>
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
          <tr>
            <td></td>
            <td></td>
            <td class="text-main_color_green text-h6">Итого:</td>
            <td></td>
            <td></td>
            <td class="text-main_color_green text-h6">{{ order.total }} р</td>
            <td></td>
          </tr>
        </tbody>
      </v-table>
</template>

<script setup>
const props = defineProps({
    orders: Array,
});
</script>

<style>

</style>