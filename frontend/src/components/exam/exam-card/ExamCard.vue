<template>
  <div>
    <v-scale-transition>
      <v-card v-if="show" class="exam-card" :class="cardClass" flat>
        <v-toolbar dark height="55" color="primary">
          <v-spacer/>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer/>
          <v-btn v-if="isFinished" flat icon @click="toggleShowScore">
            <v-icon>{{ showScoreIcon }}</v-icon>
          </v-btn>
          <v-btn v-if="isFinished && !showScore" flat icon @click="toggleShowAnswers">
            <v-icon>{{ showAnswersIcon }}</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-slide-y-transition mode="out-in">
            <v-layout row pa-5 :key="current">
              <v-flex xs12>
                <app-exam-card-score v-if="isFinished && showScore" />
                <app-exam-card-exercise v-else :showAnswers="showAnswers" />
              </v-flex>
            </v-layout>
          </v-slide-y-transition>
        </v-card-text>

        <v-card-actions>
          <v-layout row>
            <v-flex xs12 class="ma-3">
              <app-exam-card-bottom />
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-scale-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';

import AppExamCardExercise from '@/components/exam/exam-card/exam-card-exercise/ExamCardExercise.vue';
import AppExamCardScore from '@/components/exam/exam-card/exam-card-score/ExamCardScore.vue';
import AppExamCardBottom from '@/components/exam/exam-card/exam-card-bottom/ExamCardBottom.vue';

import { Exercise, Exam } from '../../../schema/types/exam.interface';
import { FormAnswer } from '../../../schema/types/answer.interface';
import { TestStatus } from '../../../store';
import { Valutation, Outcome } from '../../../valutation';

@Component({
  components: {
    AppExamCardExercise,
    AppExamCardScore,
    AppExamCardBottom
  }
})
export default class AppExamCard extends Vue {

  show = false;
  showAnswers = false;

  get current(): number {
    return this.$store.state.test.exercise;
  }

  get examName(): string {
    return this.$store.getters.currentExam.name;
  }

  get title(): string {
    return this.isFinished && this.showScore ? this.examName : 'Esercizio ' + (this.current + 1);
  }

  get isTrueOrFalse(): boolean {
    return this.$store.getters.isTrueOrFalseExercise;
  }

  get isFinished(): boolean {
    return this.$store.state.test.status === TestStatus.FINISHED;
  }

  get showScore(): boolean {
    return this.$store.state.test.showScore;
  }
  set showScore(value: boolean) {
    if (value) {
      this.$store.dispatch('showScore');
    }
    else {
      this.$store.dispatch('showSolutions');
    }
  }

  get outcome(): Outcome {
    return this.$store.getters.outcome;
  }

  get valutation(): Valutation {
    return this.$store.getters.currentValutation;
  }

  get cardClass(): object {
    if (this.showScore) {
      return {
        'success-card': this.isFinished && this.outcome === Outcome.GRANDE,
        'empty-card': this.isFinished && this.outcome === Outcome.PROMOSSO,
        'warning-card': this.isFinished && this.outcome === Outcome.BOCCIATO,
        'error-card': this.isFinished && (this.outcome === Outcome.INDECENTE || this.outcome === Outcome.PESSIMO)
      };
    }
    else {
      return {
        'success-card': this.isFinished && !this.showAnswers && this.valutation === Valutation.RIGHT,
        'empty-card': this.isFinished && !this.showAnswers && this.valutation === Valutation.EMPTY,
        'warning-card': false,
        'error-card': this.isFinished && !this.showAnswers && this.valutation === Valutation.WRONG
      };
    }
  }

  get showScoreIcon(): string {
    return this.showScore ? 'visibility' : 'description';
  }

  get showAnswersIcon(): string {
    return this.showAnswers ? 'insert_drive_file' : 'visibility';
  }

  created() {
    this.showCard();
  }

  showCard(): void {
    setTimeout(() => {
      this.show = true;
    }, 1);
  }

  toggleShowAnswers(): void {
    this.showAnswers = !this.showAnswers;
  }

  toggleShowScore(): void {
    this.showScore = !this.showScore;
  }

}
</script>

<style scoped>
.success-card {
  background: #90da90;
}
.empty-card {
  background: #7bd1fb;
}
.warning-card {
  background: #ece65d;
}
.error-card {
  background: #e48d8d;
}
</style>