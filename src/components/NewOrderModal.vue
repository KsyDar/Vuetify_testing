<template>
  <v-dialog
    v-model="isOrderOpened"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    activator="parent"
  >
    <template v-slot:activator="{ isOrderOpened }">
      <v-btn
        class="w-100"
        variant="text"
        @click="isOrderOpened = true"
        v-bind="isOrderOpened"
      >
        Оформить заказ
      </v-btn>
    </template>
    <v-card>
        <v-card-title>
          <span class="text-h5">Оформление заказа</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="ФИО"
                  v-model="fio"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Мобильный телефон"
                  v-model="mobile"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Адрес"
                  required
                  v-model="address"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['9:00 - 11:00', '11:00 - 13:00', '13:00 - 16:00', '16:00 - 18:00']"
                  label="Время доставки"
                  required
                  v-model="time"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-checkbox label="Я согласен на обработку персональных данных"
              required
              >
            </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn
            variant="text"
            @click="submitForm"
          >
            Заказать
          </v-btn>
          <v-btn
            variant="text"
            @click="isOrderOpened = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useProductsStore } from "../store/products";
import { useUsersStore } from "../store/users";


const props = defineProps({
  isAuthorized: Boolean,
  isOrderOpened: Boolean,
  total: String,
});

const fio = ref("");
const address = ref("");
const mobile = ref("");
const time = ref("");

const productsStore = useProductsStore();
const usersStore = useUsersStore();

const submitForm = () => {
  const orderInformation = {
    fio: fio.value,
    address: address.value,
    mobile: mobile.value,
    time: time.value,
    basket: productsStore.basket
  };
  console.log(orderInformation);

  const date = new Date();
  const order = {
    userId: usersStore.currentUser.id,
    list: productsStore.basket,
    date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    total: props.total
  };
  usersStore.updateOrdersHistory(order);
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>