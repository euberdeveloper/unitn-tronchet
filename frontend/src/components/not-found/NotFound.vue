<template>
  <v-layout align-center justify-center>
    <v-flex xs11 sm10 md6>
      <h1>Not Found</h1>
      <h2>{{ url }}</h2>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class AppNotFound extends Vue {
  @Prop({ type: String, required: true })
  url!: string;
}
</script>

<style scoped>
</style>