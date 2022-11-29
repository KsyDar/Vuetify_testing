<template>
  <v-dialog
    v-model="authorizeOpen"
    activator="parent"
    class="pa-16"
    :fullscreen="isFullScreen"
  >
    <template v-slot:activator="{ authorizeOpen }">
      <v-btn
        v-if="isMenu"
        class="w-100"
        v-bind="authorizeOpen"
        variant="text"
        @click="authorizeOpen = true"
      >
        Войти
      </v-btn>
      <v-btn
        v-else
        icon="mdi-account-arrow-right"
        v-bind="authorizeOpen"
        @click="authorizeOpen = true"
      >
      </v-btn>
    </template>
    <v-card class="ma-auto h-50 w-50 bg-main_color_white">
      <v-form ref="form" lazy-validation>
        <v-container>
          <v-row class="justify-end">
            <v-card-actions>
              <v-btn
                icon="mdi-close-thick"
                @click="authorizeOpen = false"
              ></v-btn>
            </v-card-actions>
          </v-row>
          <v-row v-if="error" class="justify-center"
            >Неправильный логин или пароль!</v-row
          >
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
              <v-btn @click="login" class="bg-main_color_green rounded-pill">
                Войти
              </v-btn>
              <v-btn
                @click="register"
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
import { useUsersStore } from "../../store/users";

const props = defineProps({
  authorizeOpen: Boolean,
  isMenu: Boolean,
  isFullScreen: Boolean,
});

const emits = defineEmits(["authorisationSuccess"]);

const name = ref("");
const password = ref("");
const error = ref(false);

const usersStore = useUsersStore();

const login = () => {
  usersStore.login(name.value, password.value);
  if (usersStore.currentUser) {
    emits("authorisationSuccess");
  } else {
    error.value = true;
  }
};

const register = () => {
  const user = {
    name: name.value,
    password: password.value,
  };
  
  usersStore.addUser(user);
  emits("authorisationSuccess");
};
</script>

<style>
</style>