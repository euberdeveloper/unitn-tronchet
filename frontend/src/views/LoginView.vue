<template>
  <app-login />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppLogin from '@/components/login/Login.vue';

@Component({
  components: {
    AppLogin
  },
})
export default class Login extends Vue {}
</script>
