<template>
  <v-app>
    <default-bar />
    <ErrorSnackbar />
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import ErrorSnackbar from '@/components/shared/ErrorSnackbar.vue'
</script>
