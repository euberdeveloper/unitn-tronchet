<template>
    <app-home />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import AppHome from '@/components/home/Home.vue';

@Component({
  components: {
    AppHome
  }
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch('stopExam');
  }
}
</script>
