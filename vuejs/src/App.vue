<template>
  <v-app>
    <app-toolbar />
    <app-drawer />
    <app-content>
      <router-view />
    </app-content>
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AppToolbar from '@/components/toolbar/Toolbar.vue';
import AppDrawer from '@/components/drawer/Drawer.vue';
import AppContent from '@/components/content/Content.vue';
import AppFooter from '@/components/footer/Footer.vue';

@Component({
  components: {
    AppToolbar,
    AppDrawer,
    AppContent,
    AppFooter
  },
})
export default class App extends Vue {

  get user() {
    return this.$store.state.user;
  }

  @Watch('user', { immediate: true })
  watchUser(newValue: any) {
    if (this.user === null) {
      this.$router.push('/login');
    }
  }

}
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>

<style scoped>
#app {
  overflow: hidden;
}
</style>

