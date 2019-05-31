<template>
  <app-not-found :url="url"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import AppNotFound from '@/components/not-found/NotFound.vue';

@Component({
  components: {
    AppNotFound
  }
})
export default class NotFound extends Vue {
  @Prop({ type: String, required: true })
  url!: string;

  created() {
    this.$store.dispatch('stopExam');
  }
}
</script>
