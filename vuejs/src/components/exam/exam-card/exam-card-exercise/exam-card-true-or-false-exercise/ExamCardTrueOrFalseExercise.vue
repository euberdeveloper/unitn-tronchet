<template>
  <v-form>
    <v-container fluid>
      <v-layout column>
        <template v-for="(question, index) of exercise">
          <v-flex :key="index" :class="questionsClasses[index]">
              <v-layout :row="!isPhone" :column="isPhone" :align-center="!isPhone">
                  <v-flex xs12 sm6 lg8>
                      <span class="question">{{ question.question }}</span>
                  </v-flex>
                  <v-flex xs12 sm6 lg4>
                      <v-radio-group :class="{ 'custom-radio-group': !isPhone }" :value="radioBindings[index]" @change="setTrueOrFalse(index, $event)" row>
                          <v-radio :value="true" :color="radioColor.true" @click="radioClicked(index, true)">
                            <template v-slot:label>
                              <span @click.stop="radioClicked(index, true)">{{ $t('exam.true') }}</span>
                            </template>
                          </v-radio> 
                          <v-radio label="Falso" :value="false" :color="radioColor.false" @click="radioClicked(index, false)" >
                            <template v-slot:label>
                              <span @click.stop="radioClicked(index, false)">{{ fausto ? $t('exam.fausto') : $t('exam.false') }}</span>
                            </template>
                          </v-radio>
                      </v-radio-group>
                  </v-flex>
              </v-layout>
          </v-flex>
          <v-divider :key="-index - 1" />
        </template>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { TrueOrFalseExercise } from '@/schema/types/exam.interface';
import { FormAnswer } from '@/schema/types/answer.interface';
import { Valutation, correctQuestion } from '@/utils/valutation';
import { TestStatus } from '@/store';

@Component
export default class AppExamCardTrueOrfalse extends Vue {

  @Prop({ type: Boolean, required: true })
  showAnswers!: boolean;

  $vuetify: any;
  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }

  get fausto(): boolean {
    return this.$store.state.test.fausto;
  }

  get exercise(): TrueOrFalseExercise {
    return this.$store.getters.currentExercise;
  }

  get answer(): FormAnswer {
    return this.$store.getters.currentAnswer;
  }

  get isFinished(): boolean {
    return this.$store.state.test.status === TestStatus.FINISHED;
  }

  get questionsValutations(): Valutation[] {
    return this.answer.trueOrFalse.map((answer, index) => correctQuestion(answer, this.exercise[index].solution));
  }

  get questionsClasses(): object[] {
    return this.questionsValutations.map((valutation, index) => ({
      'success-question': this.isFinished && !this.showAnswers && this.questionsValutations[index] === Valutation.RIGHT,
      'empty-question': this.isFinished && !this.showAnswers && this.questionsValutations[index] === Valutation.EMPTY,
      'error-question': this.isFinished && !this.showAnswers && this.questionsValutations[index] === Valutation.WRONG
    }));
  }

  get radioColor(): object {
    return {
      true: (this.isFinished && !this.showAnswers) ? 'primary' : 'success',
      false: (this.isFinished && !this.showAnswers) ? 'primary' : 'error'
    };
  }

  get radioBindings(): (boolean | null)[] {
    return this.exercise.map((question, index) => (this.isFinished && this.showAnswers) ? question.solution : this.answer.trueOrFalse[index]);
  }

  setTrueOrFalse(index: number, value: boolean | null) {
    if (!this.isFinished) {
      this.$store.dispatch('setTrueOrFalseAnswer', { index, value });
    }
  }

  radioClicked(index: number, value: boolean): void {
        if (this.answer.trueOrFalse[index] === value) {
            this.setTrueOrFalse(index, null);
        }
        else {
            this.setTrueOrFalse(index, value);
        }
  }

}

</script>

<style scoped>
.question {
    font-family: roboto, sans-serif; 
    font-size: 16px;
}

.custom-radio-group >>> .v-input__control {
  width: 100% !important;
}

.custom-radio-group >>> .v-input--radio-group__input {
  display: flex !important;
}

.custom-radio-group >>> .v-radio {
  flex: 1 !important;
  display: flex !important;
  justify-content: flex-end !important;
}

.success-question {
  background: #90da90;
}
.empty-question {
  background: #7bd1fb;
}
.error-question {
  background: #e48d8d;
}
</style>