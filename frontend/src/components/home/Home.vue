<template>
  <v-layout align-center justify-center>
    <v-flex xs12 fill-height>
      <app-home-card />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import AppHomeCard from '@/components/home/home-card/HomeCard.vue';

@Component({
  components: {
    AppHomeCard
  }
})
export default class AppHome extends Vue {

  created() {
    this.$store.dispatch('showFooter');
  }

}
</script>

<style scoped>
</style>