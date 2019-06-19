<template>
    <v-form class="pa-4">
      <v-radio-group :class="{ 'radio-group-centered': !isPhone }" :value="answerType" @change="setAnswerType($event)" :row="!isPhone">
        <v-radio value="" :color="radioColor.empty" @click="radioClicked('')">
          <template v-slot:label>
            <span @click.stop="radioClicked('')">Empty</span>
          </template>
        </v-radio>
        <v-radio value="OUTPUT" :color="radioColor.output" @click="radioClicked('OUTPUT')">
          <template v-slot:label>
            <span @click.stop="radioClicked('OUTPUT')">Output</span>
          </template>
        </v-radio>
        <v-radio value="COMPILETIME" :color="radioColor.compile" @click="radioClicked('COMPILETIME')">
          <template v-slot:label>
            <span @click.stop="radioClicked('COMPILETIME')">Compiletime</span>
          </template>
        </v-radio>
        <v-radio value="RUNTIME" :color="radioColor.runtime" @click="radioClicked('RUNTIME')">
          <template v-slot:label>
            <span @click.stop="radioClicked('RUNTIME')">Runtime</span>
          </template>
        </v-radio>
      </v-radio-group>
      <v-text-field
        v-if="isOutput"
        type="text"
        label="Output"
        name="output"
        append-icon="done"
        :disabled="isFinished"
        v-model="answerOutput"
      />
      <v-layout :column="isPhone" v-if="isError">
        <v-flex xs12 sm1>
          <v-text-field type="number" label="Row" name="row" :disabled="isFinished" v-model="answerRow"/>
        </v-flex>
        <v-flex xs12 sm11>
          <v-text-field
            :class="{ 'ml-3': !isPhone }"
            type="text"
            label="Caused by"
            name="caused-by"
            append-icon="warning"
            :disabled="isFinished"
            v-model="answerCause"
          />
        </v-flex>
      </v-layout>
    </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';

import AppExamCardCode from '@/components/exam/exam-card/exam-card-code-exercise/exam-card-code/ExamCardCode.vue';
import { FormAnswer } from '../../../../../../schema/types/answer.interface';
import { TestStatus } from '../../../../../../store';
import { CodeExercise, OutputSolution, ErrorSolution, instanceOfOutputSolution } from '../../../../../../schema/types/exam.interface';

@Component
export default class AppExamCardCodeAnswer extends Vue {

  @Prop({ type: [ Object, Array ], required: true })
  solution!: OutputSolution | ErrorSolution;

  @Prop({ type: Boolean, required: true })
  showAnswers!: boolean;

  $vuetify: any;
  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }

  get answer(): FormAnswer {
    return this.$store.getters.currentAnswer;
  }

  get answerType(): '' | 'OUTPUT' | 'COMPILETIME' | 'RUNTIME' | 'TRUE_OR_FALSE' {
    if (this.isFinished && this.showAnswers) {
      if (instanceOfOutputSolution(this.solution)) {
        return 'OUTPUT';
      }
      else {
        return this.solution.type;
      }
    }
    else {
      return this.answer.type;
    }
  }

  get answerOutput(): string {
    if (this.isFinished && this.showAnswers) {
      return (this.solution as OutputSolution).join(' oppure ');
    }
    else {
      return this.answer.output;
    }
  }
  set answerOutput(value: string) {
    if (!this.isFinished) {
      this.setCodeAnswer({ ...this.answer, output: value });
    }
  }

  get answerRow(): number {
    if (this.isFinished && this.showAnswers) {
      return (this.solution as ErrorSolution).row;
    }
    else {
      return this.answer.row;
    }
  }
  set answerRow(value: number) {
    if (!this.isFinished) {
      this.setCodeAnswer({ ...this.answer, row: value });
    }
  }

  get answerCause(): string {
    if (this.isFinished && this.showAnswers) {
      return (this.solution as ErrorSolution).cause;
    }
    else {
      return this.answer.cause;
    }
  }
  set answerCause(value: string) {
    if (!this.isFinished) {
      this.setCodeAnswer({ ...this.answer, cause: value });
    }
  }

  get isOutput(): boolean {
    return this.answerType === 'OUTPUT';
  }

  get isError(): boolean {
    return this.answerType === 'COMPILETIME' || this.answerType === 'RUNTIME';
  }

  get isFinished(): boolean {
    return this.$store.state.test.status === TestStatus.FINISHED;
  }

  get radioColor(): object {
    return {
      empty: (this.isFinished && !this.showAnswers) ? 'primary' : 'accent',
      output: (this.isFinished && !this.showAnswers) ? 'primary' : 'success',
      compile: (this.isFinished && !this.showAnswers) ? 'primary' : 'warning',
      runtime: (this.isFinished && !this.showAnswers) ? 'primary' : 'error',
    };
  }

  setAnswerType(value: '' | 'OUTPUT' | 'COMPILETIME' | 'RUNTIME' | 'TRUE_OR_FALSE'): void {
    if (!this.isFinished) {
      this.setCodeAnswer({ ...this.answer, type: value });
    }
  }

  radioClicked(value: '' | 'OUTPUT' | 'COMPILETIME' | 'RUNTIME' | 'TRUE_OR_FALSE'): void {
    this.setAnswerType(value);
  }

  setCodeAnswer(answer: FormAnswer): void {
    this.$store.dispatch('setCodeAnswer', answer);
  }

}
</script>

<style>
.theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
  color: black;
}
</style>

<style scoped>
.radio-group-centered >>> .v-input__control {
  width: 100% !important;
}

.radio-group-centered >>> .v-input--radio-group__input {
  display: flex !important;
}

.radio-group-centered >>> .v-radio {
  flex: 1 !important;
  display: flex !important;
  justify-content: center !important;
}
</style>