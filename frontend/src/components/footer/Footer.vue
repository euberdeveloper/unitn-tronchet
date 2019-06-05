<template>
  <v-footer v-if="show" class="footer" color="primary" app dark>
    <v-layout row primary>
      <v-flex text-xs-center white--text xs6>
        <span>&copy; 2019 MIT License Copyright</span>
      </v-flex>
      <v-flex text-xs-center white--text xs6>
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
  get show(): boolean {
    return this.$store.state.footer;
  }
}
</script>

<style scoped>
.footer {
  padding: 25px;
  letter-spacing: 0.6px;
}
</style>