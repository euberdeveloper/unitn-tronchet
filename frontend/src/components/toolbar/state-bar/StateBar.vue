<template>
  <v-flex white v-if="show">
    <v-progress-linear
      class="ma-0"
      :color="color"
      :height="height"
      :value="value"
    />
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AppStateBar extends Vue {

  @Prop({ type: Number, required: true })
  height!: number;

  get show(): string {
    return this.$store.state.stateBar.visibility;
  }

  get value(): string {
    return this.$store.state.stateBar.value;
  }

  get color(): string {
    return this.$store.state.stateBar.color;
  }

}
</script>

<style scoped>
</style>