<template>
  <div>
    <app-confirm-dialog v-slot="{on}" :callback="confirmCallback" :type="confirmType">

      <v-bottom-nav v-show="!isFinished || !showScore" class="custom-button" color="primary" :value="true" absolute dark>
        <v-btn color="white" v-if="!isPhone" :disabled="disableBack" @click="back" flat>
          <span>Back</span>
          <v-icon>chevron_left</v-icon>
        </v-btn>

        <v-btn color="white" @click="action = isFinished ? 'REPEAT' : 'REFRESH'" v-on="on" flat>
          <span>Refresh</span>
          <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn color="white" @click="action = 'FINISH'" :disabled="isFinished" v-on="on" flat>
          <span>Finish</span>
          <v-icon>done</v-icon>
        </v-btn>

        <v-btn color="white" :disabled="isFinished" @click="toggleTimer" flat>
          <span>{{ toggleTimerLayout.text }}</span>
          <v-icon>{{ toggleTimerLayout.icon }}</v-icon>
        </v-btn>

        <v-btn color="white" v-if="!isPhone" :disabled="disableNext" @click="next" flat>
          <span>Next</span>
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-bottom-nav>

      <v-btn v-show="isFinished && showScore" block color="primary" round large @click="action = 'REPEAT'" v-on="on">RIPETI</v-btn>

    </app-confirm-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TestStatus } from '../../../../store';

import AppConfirmDialog from '@/components/confirm-dialog/ConfirmDialog.vue';
import { ConfirmDialogType } from '../../../confirm-dialog/ConfirmDialog.enum';

@Component({
  components: { AppConfirmDialog }
})
export default class AppExamCardBottom extends Vue {

  action: 'REFRESH' | 'FINISH' | 'REPEAT' = 'REFRESH';

  $vuetify: any;

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
      text: (this.paused ? 'Play' : 'Pause'),
    };
  }

  get isFinished(): boolean {
    return this.$store.state.test.status === TestStatus.FINISHED;
  }

  get showScore(): boolean {
    return this.$store.state.test.showScore;
  }

  get confirmCallback(): (answer: boolean) => void {
    switch (this.action) {
      case 'REFRESH':
      case 'REPEAT':
        return this.refresh;
      case 'FINISH':
        return this.finish;
    }
  }

  get confirmType(): ConfirmDialogType {
    switch (this.action) {
      case 'REFRESH':
        return ConfirmDialogType.REFRESH;
      case 'FINISH':
        return ConfirmDialogType.FINISH;
      case 'REPEAT':
        return ConfirmDialogType.REPEAT;
    }
  }

  back(): void {
    if (!this.disableBack) {
      this.$store.dispatch('back');
    }
  }

  refresh(answer: boolean): void {
    if (answer) {
      this.$store.dispatch('refreshExam');
    }
  }

  finish(answer: boolean): void {
    if (answer) {
      this.$store.dispatch('finishExam');
    }
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

  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
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