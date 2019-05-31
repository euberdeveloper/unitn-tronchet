<template>
  <v-layout align-center justify-center>
    <v-flex xs11 sm10 md6>
      <app-login-card/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import AppLoginCard from '@/components/login/login-card/LoginCard.vue';

@Component({
  components: {
    AppLoginCard
  }
})
export default class AppLogin extends Vue {
  get user() {
    return this.$store.state.user;
  }

  created() {
    this.$store.dispatch('showFooter');
    this.$store.dispatch('stopExam');
  }

  @Watch('user')
  watchUser(newValue): void {
    if (this.user !== null) {
        this.$router.push('/home');
      }
  }
}
</script>

<style scoped>
</style>