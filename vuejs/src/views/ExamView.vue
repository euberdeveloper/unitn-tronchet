<template>
    <app-exam :exam="exam" :show="show" :type="type" :next="next" @hide="show = false"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ConfirmDialogType } from '../components/confirm-dialog/ConfirmDialog.enum';

import AppExam from '@/components/exam/Exam.vue';

Component.registerHooks([
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

@Component({
  components: {
    AppExam
  }
})
export default class Exam extends Vue {
  @Prop({ type: String, required: true })
  exam!: string;

  show = false;
  // tslint:disable-next-line:no-empty
  next = (answer: boolean) => {};

  get type(): ConfirmDialogType {
    return ConfirmDialogType.EXIT;
  }

  get user() {
    return this.$store.state.user;
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.exit(next);
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    this.exit(next);
  }

  exit(next: (answer: boolean) => void): void {
    if (this.user) {
      this.show = true;
      this.next = next;
    }
    else {
      next(true);
    }
  }
}
</script>
