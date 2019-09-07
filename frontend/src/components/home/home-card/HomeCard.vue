<template>
  <div class="app-home-card pb-3">
    <v-card class="home-card" flat>
      <v-card-text>
        <h1 class="home-title ma-1">Home</h1>

        <v-img
          class="mt-4 mb-5" :class="{ 'mx-1': isPhone, 'mx-3': !isPhone }"
          height="300"
          contain
          src="./read_the_fucking_manual.png"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        />

        <div class="home-paragraph my-5" :class="{ 'mx-1': isPhone, 'mx-3': !isPhone }">

          <v-alert v-model="alerts.pwa" dismissible outline type="info" class="justify my-4">
            <strong>{{ $t('home.alerts.pwa') }}</strong>
          </v-alert>

          <p v-html="$t('home.paragraphs.first')"></p>
          <p v-html="$t('home.paragraphs.second')"></p>
          <p v-html="$t('home.paragraphs.third')"></p>
          <p v-html="$t('home.paragraphs.fourth')"></p>
          <p v-html="$t('home.paragraphs.fifth')"></p>
          <p v-html="$t('home.paragraphs.sixth')"></p>
          <p v-html="$t('home.paragraphs.seventh')"></p>
          <p v-html="$t('home.paragraphs.eight')"></p>

          <v-alert v-model="alerts.errors" dismissible outline type="warning" class="justify my-4">
            <strong>{{ $t('home.alerts.errors') }}</strong>
          </v-alert>

          <v-alert v-model="alerts.swipe" dismissible outline type="warning" class="justify my-4">
            <strong>{{ $t('home.alerts.swipe') }}</strong>
          </v-alert>

          <v-alert v-model="alerts.spaces" dismissible outline type="warning" class="justify my-4">
            <strong>{{ $t('home.alerts.spaces') }}</strong>
          </v-alert>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class AppExamCard extends Vue {
  $vuetify: any;

  private alerts = {
    pwa: true,
    errors: true,
    swipe: true,
    spaces: true
  };

  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }
}
</script>

<style scoped>
.app-home-card {
  height: 100%;
}

.home-card {
  min-height: 100%;
  border-radius: 8px;
}

.home-title {
  text-align: center;
  font-size: 32px;
  font-weight: 400;
}

.home-paragraph p {
  font-size: 16px;
  text-align: justify;
}

.justify {
  text-align: justify;
}
</style>