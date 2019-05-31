<template>
  <app-exam :exam="exam"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import AppExam from '@/components/exam/Exam.vue';

@Component({
  components: {
    AppExam
  }
})
export default class Exam extends Vue {
  @Prop({ type: String, required: true })
  exam!: string;
}
</script>
