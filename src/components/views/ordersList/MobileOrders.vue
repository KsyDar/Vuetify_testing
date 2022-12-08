<template>
  <v-card
        v-for="order in orders" :key="order.id"
        class="d-flex bg-main_color_white text-text_color_grey"
      >
        <v-container>
          <v-row class="align-center bg-main_color_grey">
            <v-col>
              <v-card-text class="text-h6">
                №{{ orders.indexOf(order) + 1 }}
              </v-card-text>
            </v-col>
            <v-col></v-col>
            <v-col>
              <v-card-text class="text-end text-h6">
                Дата: {{ order.date }}
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="align-center" v-for="item in order.list" :key="item.id">
            <v-col>
              <v-card-text class="text-body-2 font-weight-black">
                {{ item.name }}
              </v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="text-end text-body-2 font-weight-black">
                {{ item.amount }} x {{ item.price.toLocaleString() }} р
              </v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="text-end text-body-2 font-weight-black">
                = {{ (item.price * item.amount).toLocaleString() }} р
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text class="text-h6 text-text_color_orange">
                Итого:
              </v-card-text>
            </v-col>
            <v-col></v-col>
            <v-col>
              <v-card-text class="text-end text-h6 text-text_color_orange">
                {{ order.total.toLocaleString() }} р
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
</template>

<script setup>
const props = defineProps({
    orders: Array,
});
</script>

<style>

</style>