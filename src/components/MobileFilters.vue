<template>
  <v-dialog v-model="filtersOpen" activator="parent" class="pa-16">
    <template v-slot:activator="{ filtersOpened }">
      <v-btn 
      icon="mdi-filter"
      v-bind="filtersOpened"
      @click="filtersOpened = true"
      ></v-btn>
    </template>
    <v-card class="ma-auto h-50 w-50">
        <v-list>
        <v-list-item>
          <v-list-item-action start>
            <v-checkbox-btn
              label="Все товары"
              @change="selectAll()"
              v-model="allSelected"
            ></v-checkbox-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-for="typeItem in types" :key="typeItem.id">
          <v-list-item-action start>
            <v-checkbox-btn
              :label="typeItem.name"
              @change="filter(typeItem)"
            ></v-checkbox-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
    filtersOpened: Boolean,
})
</script>

<style>
</style>