<template>
  <v-fade-transition>
    <v-sheet class="code d-flex grey--text text--lighten-3 pa-4" :color="background">
      <v-layout column>
        <v-flex
          v-for="(row, index) of rows"
          :key="index"
          :class="getClass(index)"
          @mouseenter="rowEntered(index)"
          @mouseleave="rowLeft(index)"
          @click="rowClicked(index)"
        >
          <span class="orange--text text--lighten-3 mr-3 code-row">{{ getRowText(index + 1) }}</span>
          <span>{{ row }}</span>
        </v-flex>
      </v-layout>
    </v-sheet>
  </v-fade-transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class AppExamCardCode extends Vue {
  @Prop({ type: String, required: true })
  readonly code!: string;

  readonly color = 'grey';
  readonly darkenDefault = 'darken-3';
  readonly darkenSelected = 'darken-2';
  hovered = -1;
  selected: number[] = [];

  get background(): string {
    return this.color + ' ' + this.darkenDefault;
  }

  get rows(): string[] {
    return this.code.split('\n');
  }

  getRowText(index: number): string {
    return (index <= 9 ? '0' + index : '' + index);
  }

  getClass(index: number): object {
    const isDefault = (index !== this.hovered) && (this.selected.indexOf(index) === -1);
    return {
      [this.color]: true,
      [this.darkenDefault]: isDefault,
      [this.darkenSelected]: !isDefault
    };
  }

  rowEntered(index: number): void {
    this.hovered = index;
  }

  rowLeft(index: number): void {
    this.hovered = -1;
  }

  rowClicked(index: number): void {
    const i = this.selected.indexOf(index);
    if (i === -1) {
      this.selected.push(index);
    } else {
      this.selected.splice(i, 1);
    }
  }
}
</script>

<style scoped>
.code {
  border-radius: 12px;
  overflow-x: auto;
  letter-spacing: 0.5px;
  word-spacing: 1px;
  font-family: "Inconsolata", monospace;
  white-space: pre;
  font-weight: 300;
  font-size: 15px;
}

.code-row {
  letter-spacing: 0.8px;
}
</style>