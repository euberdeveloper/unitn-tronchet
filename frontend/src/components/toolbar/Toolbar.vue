<template>
  <div>
    <v-toolbar class="toolbar" color="primary" :extension-height="heightStateBar" fixed clipped-left dark app>
      <v-toolbar-side-icon v-if="userLogged" @click="toggleDrawer()"/>

      <v-spacer/>

      <v-toolbar-title id="title">
        <span>{{ title }}</span>
      </v-toolbar-title>

      <v-spacer/>

      <v-btn icon v-if="userLogged" @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>

      <template v-slot:extension>
        <app-state-bar :height="heightStateBar"/>
      </template>
    </v-toolbar>
    
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn dark flat @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

import AppStateBar from './state-bar/StateBar.vue';
import { get as getAuth } from '../../auth';


@Component({
  components: {
    AppStateBar
  }
})
export default class AppToolbar extends Vue {

  snackbar = {
    show: false,
    message: 'Error in logout',
    color: 'error'
  };

  heightStateBar = 5;

  get title(): string {
    return this.$store.getters.toolbarTitle;
  }

  get userLogged(): string {
    return this.$store.getters.loggedIn;
  }

  toggleDrawer(): void {
    this.$store.dispatch('toggleDrawer');
  }

  logout(): void {
    getAuth().logout()
      .catch(error => {
        console.log('Error in logging out', error);
        this.snackbar.show = true;
      });
  }
}
</script>

<style>
.v-toolbar__extension {
  padding: 0 !important;
}
</style>

<style scoped>

</style>