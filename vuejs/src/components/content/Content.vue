<template>
  <v-content class="content">
    <v-container fluid fill-height>
      <slot></slot>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class AppContent extends Vue {}
</script>

<style scoped>
.content {
  background-color: #868686;
}
</style>