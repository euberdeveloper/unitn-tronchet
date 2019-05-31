<template>
  <v-layout align-center justify-center>
    <v-flex xs11 sm10>
      <app-exam-card :key="exam"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import AppExamCard from '@/components/exam/exam-card/ExamCard.vue';

@Component({
  components: {
    AppExamCard
  }
})
export default class AppExam extends Vue {
  @Prop({ type: String, required: true })
  exam!: string;

  @Watch('exam', { immediate: true })
  watchExam(newValue: string): void {
    if (this.exam) {
      this.$store.dispatch('startExam', this.exam);
    }
  }

  created() {
    this.$store.dispatch('hideFooter');
  }
}
</script>

<style scoped>
</style>