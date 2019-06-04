<template>
  <div>
    <v-fade-transition>
      <v-sheet class="code d-flex grey--text text--lighten-3 pa-4" :color="background" @mouseenter="showCopy = true" @mouseleave="showCopy = false">
        <v-fade-transition>
          <v-btn v-if="showCopy" flat icon class="copy" color="success lighten-3" @click="copyCode">
            <v-icon>content_copy</v-icon>
          </v-btn>
        </v-fade-transition>
        
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

    <v-snackbar v-model="showSnackbar" color="success">
      <span>Testo copiato negli appunti!!!</span>
      <v-btn dark flat @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import copyToClipboard from 'copy-to-clipboard';

@Component({
  components: {}
})
export default class AppExamCardCode extends Vue {
  @Prop({ type: String, required: true })
  readonly code!: string;

  readonly color = 'grey';
  readonly darkenDefault = 'darken-3';
  readonly darkenSelected = 'darken-2';
  showCopy = false;
  showSnackbar = false;
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

  copyCode(): void {
    copyToClipboard(this.code);
    this.showSnackbar = true;
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

.copy {
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
}
</style>