<template>
  <v-dialog
    v-model="authorizeOpen"
    class="pa-16"
    :fullscreen="isFullScreen"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="isMenu"
        class="w-100"
        v-bind="props"
        variant="text"
      >
        Войти
      </v-btn>
      <v-btn
        v-else-if="!isNewOrder"
        icon="mdi-account-arrow-right"
        v-bind="props"
      >
      </v-btn>
    </template>

    <v-card class="ma-auto h-50 w-50 bg-main_color_white">
      <v-form ref="form" lazy-validation>
        <v-container>
          <v-row class="justify-end">
            <v-card-text v-if="isNewOrder">
              Желаете авторизоваться?
            </v-card-text>
            <v-card-actions>
              <v-btn
                icon="mdi-close-thick"
                @click="authorizeOpen = false; emit('closed')"
              ></v-btn>
            </v-card-actions>
          </v-row>
          <v-row v-if="errorLogin" class="justify-center">
            Неправильный логин или пароль!
          </v-row>
          <v-row v-if="errorFilling" class="justify-center">
            Все поля должны быть заполнены!
          </v-row>
          <v-row v-if="errorRegistration" class="justify-center">
            Пользователь с таким логином уже существует!
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-text-field
                class="mb-5"
                label="Name"
                required
                hide-details="auto"
                v-model="name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-text-field
                type="password"
                class="mb-5"
                label="Password"
                required
                hide-details="auto"
                v-model="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-card-actions class="w-100 justify-space-between">
              <v-btn
                @click="login()"
                class="bg-main_color_green rounded-pill"
              >
                Войти
              </v-btn>

              <v-btn
                v-if="isNewOrder"
                class="bg-marker_color_orange rounded-pill d-block ma-0"
                variant="text"
                @click="authorizeOpen = false; emit('closed')"
              >
                Продолжить без авторизации
              </v-btn>
              
              <v-btn
              v-else
              @click="register()"
              class="bg-marker_color_orange rounded-pill"
              >
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useUsersStore } from "../../store/users";


const props = defineProps({
  isOpen: Boolean,
  isMenu: Boolean,
  isFullScreen: Boolean,
  isNewOrder: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits();

const usersStore = useUsersStore();
const name = ref("");
const password = ref("");

const errorLogin = ref(false);
const errorRegistration = ref(false);
const errorFilling = ref(false);

const authorizeOpen = ref(false);

watch(() => props.isOpen, 
(val) => {
  authorizeOpen.value = val;
})


const login = async () => {
  errorLogin.value = false;
  errorRegistration.value = false;
  errorFilling.value = false;

  if (name.value.length === 0 || password.value.length === 0) {
    errorFilling.value = true;
    return
  };

  await usersStore.login(name.value, password.value);
  if (usersStore.currentUser === null) {
    errorLogin.value = true;
    authorizeOpen.value = true;
    return
  };

  emit("closed");
};

const register = async () => {
  errorLogin.value = false;
  errorRegistration.value = false;
  errorFilling.value = false;

  if (name.value.length === 0 || password.value.length === 0) {
    errorFilling.value = true;
    return
  };

  const user = {
    name: name.value,
    password: password.value,
    fio: "",
    address: "",
    number: "",
  };

  await usersStore.addUser(user);

  if (usersStore.currentUser === null) {
    errorRegistration.value = true;
  };
};
</script>

<style>
</style>