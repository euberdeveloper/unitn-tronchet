<template>
  <div>
    <v-bottom-nav v-if="!isFinished || !showScore" class="custom-button" color="primary" :value="true" absolute dark>
      <v-btn color="white" :disabled="disableBack" @click="back" flat>
        <span>Back</span>
        <v-icon>chevron_left</v-icon>
      </v-btn>

      <v-btn color="white" @click="refresh" flat>
        <span>Refresh</span>
        <v-icon>refresh</v-icon>
      </v-btn>

      <v-btn color="white" :disabled="isFinished" @click="finish" flat>
        <span>Finish</span>
        <v-icon>done</v-icon>
      </v-btn>

      <v-btn color="white" :disabled="isFinished" @click="toggleTimer" flat>
        <span>{{ toggleTimerLayout.text }}</span>
        <v-icon>{{ toggleTimerLayout.icon }}</v-icon>
      </v-btn>

      <v-btn color="white" :disabled="disableNext" @click="next" flat>
        <span>Next</span>
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </v-bottom-nav>

    <v-btn v-else block color="primary" round large @click="refresh">RIPETI</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TestStatus } from '../../../../store';

@Component
export default class AppExamCardBottom extends Vue {

  get current(): number {
    return this.$store.state.test.exercise;
  }

  get exercisesAmount(): number {
    return this.$store.getters.exercisesAmount;
  }

  get paused(): boolean {
    return this.$store.state.test.timer.paused;
  }

  get disableBack(): boolean {
    return this.current <= 0;
  }
  get disableNext(): boolean {
    return this.current >= this.exercisesAmount - 1;
  }

  get toggleTimerLayout(): { icon: string; text: string; } {
    return {
      icon: (this.paused ? 'play_arrow' : 'pause'),
      text: (this.paused ? 'Riprendi' : 'Pausa'),
    };
  }

  get isFinished(): boolean {
    return this.$store.state.test.status === TestStatus.FINISHED;
  }

  get showScore(): boolean {
    return this.$store.state.test.showScore;
  }

  back(): void {
    if (!this.disableBack) {
      this.$store.dispatch('back');
    }
  }

  refresh(): void {
    this.$store.dispatch('refreshExam');
  }

  finish(): void {
    this.$store.dispatch('finishExam');
  }

  toggleTimer(): void {
    if (this.paused) {
      this.$store.dispatch('playTimer');
    }
    else {
      this.$store.dispatch('pauseTimer');
    }
  }

  next(): void {
    if (!this.disableNext) {
      this.$store.dispatch('next');
    }
  }

}
</script>

<style scoped>
.custom-button >>> .v-btn--active {
  padding-top: 8px !important;
  font-size: 12px !important;
}

.custom-button >>> .v-btn--active .v-btn__content {
  font-size: 12px !important;
}
</style>