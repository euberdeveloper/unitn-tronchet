<template>
  <v-footer v-if="show" class="footer" color="primary" app :absolute="isPhone" height="55" dark>
    <v-layout :row="!isPhone" :column="isPhone" primary>
      <v-flex text-xs-center white--text order-xs2 order-sm1 :class="{ phoneSpace: isPhone }" xs12>
        <span>&copy; 2019 MIT License Copyright</span>
      </v-flex>
      <v-flex text-xs-center white--text order-xs1 order-sm2 xs12>
        <span>Made with Vuetify</span>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {
  $vuetify: any;

  get show(): boolean {
    return this.$store.state.footer;
  }

  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }
}
</script>

<style scoped>
.footer {
  padding: 25px;
  letter-spacing: 0.6px;
}

.phoneSpace {
  margin-bottom: 2px;
}
</style>