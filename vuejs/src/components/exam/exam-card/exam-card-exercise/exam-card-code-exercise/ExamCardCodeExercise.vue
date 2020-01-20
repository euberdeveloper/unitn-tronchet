<template>
  <div class="code-exercise">
    <app-exam-card-code :code="exercise.code" />
    <app-exam-card-code-answer :solution="exercise.solution" :showAnswers="showAnswers"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit, Watch } from 'vue-property-decorator';

import AppExamCardCode from '@/components/exam/exam-card/exam-card-exercise/exam-card-code-exercise/exam-card-code/ExamCardCode.vue';
import AppExamCardCodeAnswer from '@/components/exam/exam-card/exam-card-exercise/exam-card-code-exercise/exam-card-code-answer/ExamCardCodeAnswer.vue';
import { CodeExercise } from '@/schema/types/exam.interface';

@Component({
  components: {
    AppExamCardCode,
    AppExamCardCodeAnswer
  }
})
export default class AppExamCardCodeExercise extends Vue {
  @Prop({ type: Boolean, required: true })
  showAnswers!: boolean;

  get exercise(): CodeExercise {
    return this.$store.getters.currentExercise;
  }
}
</script>

<style scoped>
</style>