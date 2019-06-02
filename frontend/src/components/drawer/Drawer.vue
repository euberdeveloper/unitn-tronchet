<template>
  <v-navigation-drawer class="pb-3" v-model="show" clipped fixed app>
    <v-list dense>

      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs12>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
        </v-layout>

        <v-list-group
          class="pa-1"
          v-model="item.model"
          v-else-if="item.children"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          
          <v-list-tile class="ml-3" :class="{ 'current-exam': child.selected }" v-for="(child, i) in item.children" :key="i" @click="$router.push(child.link)">
            <v-list-tile-action v-if="child.icon">
              <v-icon color="primary">{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else class="pa-1" :key="item.text" @click="$router.push(item.link)">
          <v-list-tile-action>
            <v-icon color="warning">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Exam } from '../../schema/types/exam.interface';

@Component
export default class AppDrawer extends Vue {

  get exams(): Exam[] {
    return this.$store.state.exams;
  }

  get items() {
    return [
      { icon: 'description', text: 'Rules', link: '/rules' },
      { icon: 'group', text: 'Advices', link: '/advices' },
      {
        'icon': 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        'text': 'Exams',
        'model': false,
        'children': this.exams.map((exam, index) => ({
          icon: 'create',
          text: exam.name,
          link: `/exam/${exam.id}`,
          selected: index === this.currentExam
        }))
      }
    ];
  }

  get show(): boolean {
    return this.$store.getters.showDrawer;
  }
  set show(value: boolean) {
    if (value) {
      this.$store.dispatch('showDrawer');
    }
    else {
      this.$store.dispatch('hideDrawer');
    }
  }

  get currentExam(): number {
    return this.$store.state.test.exam;
  }

}
</script>

<style>
.v-list__group__header__prepend-icon .v-icon {
    color: #fb8c00 !important;
}

.current-exam {
  background: #d4d4d4;
}
</style>

<style scoped>
</style>