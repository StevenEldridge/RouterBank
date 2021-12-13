<template>
  <v-container>
    <h1>Account Overview</h1>
    <h2 class="mt-5">Account Balances</h2>
    <v-row class="mt-1">
      <v-col>
        <v-card outlined>
          <v-card-title>Savings Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ userAccount.savingsBalance.toFixed(2) + " " + currencyName }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Checking Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ userAccount.checkingBalance.toFixed(2) + " " + currencyName }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <h2 class="mt-10">Account Details</h2>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Name</v-list-item-title>
          <v-list-item-subtitle>{{ userAccount.name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Username</v-list-item-title>
          <v-list-item-subtitle>{{ userAccount.username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Minute Percentage Rate</v-list-item-title>
          <v-list-item-subtitle> {{ (userAccount.minutePercentageRate * 100).toFixed(2) + '%' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Currently Making Interest</v-list-item-title>
          <v-list-item-subtitle> {{ userAccount.mPREnable }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {userAccount} from "@/interfaces";

export default Vue.extend ({
  name: "AccountOverview",
  computed: {
    userAccount(): userAccount {
      return this.$store.getters.getUserAccount(Number.parseInt(this.$route.params.userID))
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    }
  }
})
</script>

<style scoped>

</style>