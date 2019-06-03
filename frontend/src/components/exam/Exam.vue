<template>
  <v-layout align-center justify-center>
    <v-flex xs11 sm10>
      <app-exam-card :key="exam"/>
      <app-confirm-dialog :show="show" :callback="next" :type="type" @hide="$emit('hide')"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { ConfirmDialogType } from '../confirm-dialog/ConfirmDialog.enum';

import AppExamCard from '@/components/exam/exam-card/ExamCard.vue';
import AppConfirmDialog from '@/components/confirm-dialog/ConfirmDialog.vue';

@Component({
  components: {
    AppExamCard,
    AppConfirmDialog
  }
})
export default class AppExam extends Vue {
  @Prop({ type: String, required: true })
  exam!: string;

  @Prop({ type: Boolean, required: true })
  show!: boolean;

  @Prop({ type: Number, required: true })
  type!: ConfirmDialogType;

  @Prop({ type: Function, required: true })
  next!: (answer: boolean) => void;

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