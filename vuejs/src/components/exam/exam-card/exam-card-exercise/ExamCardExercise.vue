<template>
  <div>
    <app-exam-card-true-or-false-exercise v-if="isTrueOrFalse" :showAnswers="showAnswers"/>
    <app-exam-card-code-exercise v-else :showAnswers="showAnswers"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';

import AppExamCardCodeExercise from '@/components/exam/exam-card/exam-card-exercise/exam-card-code-exercise/ExamCardCodeExercise.vue';
import AppExamCardTrueOrFalseExercise from '@/components/exam/exam-card/exam-card-exercise/exam-card-true-or-false-exercise/ExamCardTrueOrFalseExercise.vue';

@Component({
  components: {
    AppExamCardCodeExercise,
    AppExamCardTrueOrFalseExercise
  }
})
export default class AppExamCardExercise extends Vue {
  @Prop({ type: Boolean, required: true })
  showAnswers!: boolean;

  get isTrueOrFalse(): boolean {
    return this.$store.getters.isTrueOrFalseExercise;
  }

}
</script>

<style scoped>
</style>