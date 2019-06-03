<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <slot :on="on">
        <!-- <v-btn color="red lighten-2" dark v-on="on">CONFERMA</v-btn> -->
      </slot>
    </template>

    <v-card>
      <v-card-title :class="['title', 'headline', 'white--text', 'text--darken-5', color, colorModificator]">
        <v-spacer />
        <span>{{ title }}</span>
        <v-spacer />
      </v-card-title>

      <v-card-text class="confirmText">
        <span>{{ text }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" outline @click="action(true)">SI</v-btn>
        <v-btn color="error" outline @click="action(false)">NO</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ConfirmDialogType } from './ConfirmDialog.enum';

@Component
export default class AppConfirmDialog extends Vue {
  @Prop({ type: String, default: 'error' })
  color!: string;

  @Prop({ type: String, default: 'lighten-1'})
  colorModificator!: string;

  @Prop({ type: String, default: 'Attenzione'})
  title!: string;

  @Prop({ type: Number, default: ConfirmDialogType.EXIT })
  type!: ConfirmDialogType;

  @Prop({ type: Function, required: true })
  callback!: (answer: boolean) => void;

  @Prop({ type: Boolean })
  show!: boolean;

  dialog = false;

  get text(): string {
    switch (this.type) {
      case ConfirmDialogType.REFRESH:
        return 'Sicuro di voler ricaricare l\'esame? Il tempo e le risposte inserite saranno resettate.';
      case ConfirmDialogType.FINISH:
        return 'Sicuro di voler finire l\'esame? Il tempo non è ancora terminato e non potrai più tornare indietro.';
      case ConfirmDialogType.REPEAT:
        return 'Sicuro di voler ripetere l\'esame? Le precedenti risposte saranno resettate e non potrai più vedere il tuo risultato.';
      case ConfirmDialogType.EXIT:
        return 'Sicuro di voler uscire? Le risposte inserite saranno cancellate e non potrai più tornare indietro.';
    }
  }

  @Watch('show')
  watchShow(newValue: boolean): void {
    if (typeof this.show === 'boolean') {
      this.dialog = this.show;
    }
  }

  action(answer: boolean): void {
    this.dialog = false;
    this.$emit('hide');
    this.callback(answer);
  }
}
</script>

<style scoped>
.confirmText {
  text-align: justify;
  font-size: 16px;
  margin: 30px 0;
}
</style>