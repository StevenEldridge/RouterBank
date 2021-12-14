<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {userAccount} from "@/interfaces";

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  beforeMount(): void {
    this.$store.commit('createUserAccount', {
      userID: 1,
      name: 'Test Account',
      username: 'testAccount',
      password: 'pass123',
      savingsBalance: 100.00,
      checkingBalance: 50.00,
      minutePercentageRate: 0.1,
      mprEnable: false
    } as userAccount)
  }
});


</script>
