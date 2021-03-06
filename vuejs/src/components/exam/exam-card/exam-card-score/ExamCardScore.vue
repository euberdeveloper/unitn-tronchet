<template>
  <v-layout column>
      <v-flex>
        <h1>{{ title }}</h1>
      </v-flex>
      <v-flex pt-5 :px-5="!isPhone" :px-2="isPhone">
        <v-layout column>
            <v-flex class="my-3">
                <v-layout :row="!isPhone" :column="isPhone" :align-center="isPhone">
                    <v-flex xs12>
                        <strong>{{ $t('exam.used_time') }}</strong>
                    </v-flex>
                    <v-flex>
                        <span class="achived">{{ minutes }}:{{ seconds }}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider />
            <v-flex class="my-3">
                <v-layout :row="!isPhone" :column="isPhone" :align-center="isPhone">
                    <v-flex xs12>
                        <strong>{{ $t('exam.percentual_used_time') }}</strong>
                    </v-flex>
                    <v-flex>
                        <span class="achived">{{ usedTime }}%</span>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider />
            <v-flex class="my-3">
                <v-layout :row="!isPhone" :column="isPhone" :align-center="isPhone">
                    <v-flex xs12>
                        <strong>{{ $t('exam.score') }}</strong>
                    </v-flex>
                    <v-flex>
                        <span class="achived">{{ score }} / {{ totalScore }}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider />
            <v-flex class="my-3">
                <v-layout :row="!isPhone" :column="isPhone" :align-center="isPhone">
                    <v-flex xs12>
                        <strong>{{ $t('exam.percentual_score') }}</strong>
                    </v-flex>
                    <v-flex>
                        <span class="achived">{{ percentualScore }}%</span>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider />
        </v-layout>
      </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Outcome } from '@/utils/valutation';

@Component
export default class AppExamCard extends Vue {
  $vuetify: any;
  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }

  get outcome(): Outcome {
    return this.$store.getters.outcome;
  }

  get title(): string {
    switch (this.outcome) {
      case Outcome.INDECENTE:
        return this.$root.$i18n.t('exam.hopeless').toString();
      case Outcome.PESSIMO:
        return this.$root.$i18n.t('exam.terrible').toString();
      case Outcome.BOCCIATO:
        return this.$root.$i18n.t('exam.not_passed').toString();
      case Outcome.PROMOSSO:
        return this.$root.$i18n.t('exam.passed').toString();
      case Outcome.GRANDE:
        return this.$root.$i18n.t('exam.excellent').toString();
    }
  }

  get time(): number {
      return this.$store.state.test.timer.time;
  }

  get duration(): number {
      return this.$store.state.test.timer.duration;
  }

  get seconds(): string {
      return this.addNull(this.time % 60);
  }

  get minutes(): string {
      return this.addNull(Math.floor(this.time / 60));
  }

  get score(): number {
      return this.$store.state.test.valutation.score;
  }

  get totalScore(): number {
      return this.$store.getters.totalScore;
  }

  get usedTime(): number {
      return this.getPercentual(this.time / this.duration);
  }

  get percentualScore(): number {
      return this.getPercentual(this.score / this.totalScore);
  }

  getPercentual(x: number): number {
      return Math.floor(x * 100);
  }

  addNull(x: number): string {
      return x <= 9 ? '0' + x : '' + x;
  }

}
</script>

<style scoped>
* {
    font-family: Roboto, sans-serif;
}

h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 400;
}

strong {
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
}

.achived {
    white-space: nowrap;
    font-size: 16px;
}

</style>