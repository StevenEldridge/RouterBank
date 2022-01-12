<template>
  <div>
    <h1>Account Overview</h1>
    <h2 class="mt-5">Account Balances</h2>
    <v-row class="mt-1">
      <v-col>
        <v-card outlined>
          <v-card-title>Savings Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ bankAccount.savebal.toFixed(2) + " " + currencyName }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Checking Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ bankAccount.checkbal.toFixed(2) + " " + currencyName }}</v-card-subtitle>
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
          <v-list-item-title>Birthdate</v-list-item-title>
          <v-list-item-subtitle>{{ birthdate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Address</v-list-item-title>
          <v-list-item-subtitle>{{ userAccount.addr }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Phone Number</v-list-item-title>
          <v-list-item-subtitle>{{ userAccount.phone }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Minute Percentage Rate</v-list-item-title>
          <v-list-item-subtitle> {{ (bankAccount.mpr * 100).toFixed(2) + '%' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Interest Enabled/Disabled</v-list-item-title>
          <v-list-item-subtitle v-if="bankAccount.mpr_enable">Enabled</v-list-item-subtitle>
          <v-list-item-subtitle v-else>Disabled</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {bankAccount, userAccount} from "@/interfaces";

export default Vue.extend ({
  name: "AccountOverview",
  computed: {
    userAccount(): userAccount {
      return this.$store.getters.getUserAccount
    },
    bankAccount(): bankAccount {
      return this.$store.getters.getBankAccount
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    },
    birthdate(): string {
      return this.userAccount.birthdate.substring(0, 10)
    }
  }
})
</script>

<style scoped>

</style>