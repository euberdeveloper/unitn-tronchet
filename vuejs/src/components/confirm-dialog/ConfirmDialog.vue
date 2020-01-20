<template>
  <v-dialog v-model="dialog" :persistent="persistent" width="400">
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
        <v-btn color="primary" outline @click="action(true)">{{ $t('confirm_dialog.yes') }}</v-btn>
        <v-btn color="error" outline @click="action(false)">{{ $t('confirm_dialog.no') }}</v-btn>
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

  @Prop({ type: Boolean, default: false })
  persistent!: boolean;

  @Prop({ type: Boolean })
  show!: boolean;

  dialog = false;

  get text(): string {
    switch (this.type) {
      case ConfirmDialogType.REFRESH:
        return this.$root.$i18n.t('confirm_dialog.refresh').toString();
      case ConfirmDialogType.FINISH:
        return this.$root.$i18n.t('confirm_dialog.finish').toString();
      case ConfirmDialogType.REPEAT:
        return this.$root.$i18n.t('confirm_dialog.repeat').toString();
      case ConfirmDialogType.EXIT:
        return this.$root.$i18n.t('confirm_dialog.exit').toString();
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