<template>
  <v-dialog v-model="authorize" activator="parent">
    <template v-slot:activator="{ authorize }">
      <v-btn
        icon="mdi-account-arrow-right"
        color="primary"
        v-bind="authorize"
        @click="authorize.value = true"
      ></v-btn>
    </template>
    <v-card>
    <v-container>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Name" required></v-text-field>
          <v-text-field class="mb-5" label="Password" required></v-text-field>
          <v-btn color="success"> Войти </v-btn>
          <v-btn color="error"> Зарегистрироваться </v-btn>
        </v-form>
    </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  authorize: Boolean,
});
</script>

<style>
</style>