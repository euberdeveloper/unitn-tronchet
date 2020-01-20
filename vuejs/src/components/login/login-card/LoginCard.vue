<template>
  <div>
    <v-scale-transition>
      <v-card v-if="show" class="login-card" flat>
        <v-toolbar dark color="primary">
          <v-spacer/>
          <v-toolbar-title>{{ $t('login.title') }}</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>

        <v-card-text>
          <app-login-card-form @credentials="credentials = $event"/>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            :disabled="!credentials || loading"
            :loading="loading"
            @click="login"
          >{{ $t('login.button') }}</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-scale-transition>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn dark flat @click="snackbar.show = false">{{ $t('toast.close') }}</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import AppLoginCardForm from '@/components/login/login-card/login-card-form/LoginCardForm.vue';

import { get as getAuth } from '@/utils/auth';
import { Credentials } from './login-card-form/credentials.interface';

@Component({
  components: {
    AppLoginCardForm
  }
})
export default class AppLoginCard extends Vue {
  credentials: Credentials | null = null;
  show = false;
  loading = false;
  snackbar = {
    show: false,
    message:  this.$root.$i18n.t('toast.login'),
    color: 'error'
  };

  created(): void {
    setTimeout(() => (this.show = true), 1);
  }

  login(): void {
    if (!this.loading && this.credentials != null) {
      const { user, password } = this.credentials;
      this.loading = true;
      getAuth()
        .login(user, password)
        .catch(error => {
          this.loading = false;
          this.snackbar.show = true;
          console.log('Error in logging in', error);
        });
    }
  }
}
</script>

<style scoped>
</style>