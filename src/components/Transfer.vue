<template>
  <v-container>
    <h1>Transfer</h1>
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
    <v-row justify="center">
      <v-btn
          @click="changeDirection"
          color="primary"
          class="mt-10"
          fab
          depressed
      >
        <v-icon large v-if="buttonDirection === 'Left'">mdi-arrow-left-thick</v-icon>
        <v-icon large v-else>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center" class="mt-14">
      <h2 v-if="buttonDirection === 'Left'">Amount to transfer from Checking to Savings</h2>
      <h2 v-else>Amount to transfer from Savings to Checking</h2>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="amount"
          label="Amount"
          hint="Only enter a number"
          prepend-inner-icon="mdi-currency-brl"
          :rules="amountFieldRules"
          style="font-size: 1.3em"
          class="mt-4"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-btn
          color="primary"
          @click="submitForm"
          large
      >Transfer</v-btn>
    </v-row>
    <v-row justify="center">
      <h3 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h3>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {bankAccount} from "@/interfaces";

interface transferData {
  buttonDirection: "Left" | "Right"
  amount: string
  amountFieldRules: any[]
  messageResult: string
}

export default Vue.extend ({
  name: "Transfer",
  data(): transferData {
    return {
      buttonDirection: "Right",
      amount: "",
      amountFieldRules: [
        function (value: string) {
          return !!value || "Required";
        },
        function (value: string) {
          return (/^[0-9]*\.?[0-9]+$/.test(value)) || "Not a valid number";
        }
      ],
      messageResult: ""
    }
  },

  computed: {
    bankAccount(): bankAccount {
      return this.$store.getters.getBankAccount
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    }
  },

  methods: {
    changeDirection(): void {
      if (this.buttonDirection === "Left") {
        this.buttonDirection = "Right"
      } else {
        this.buttonDirection = "Left"
      }
    },
    async submitForm(): Promise<void> {
      const amountNum: number = Number.parseFloat(this.amount)

      // Ensures user account exists
      if (this.bankAccount == null) {
        this.messageResult = "Error: User Account does not exist"
        return
      }
      // Ensures an amount has been specified
      if (!this.amount) {
        this.messageResult = "Error: You need to specify an amount"
        return
      }
      // Ensures the amount is a proper number
      else if (!/^[0-9]*\.?[0-9]+$/.test(this.amount)) {
        this.messageResult = "Error: You did not enter a valid number"
        return
      }

      // Transfers money from checking to savings
      if (this.buttonDirection === "Left" && this.bankAccount.checkbal >= amountNum) {
        await this.transferApiCall("savings", amountNum)
      }
      // Transfers money from savings to checking
      else if (this.buttonDirection === "Right" && this.bankAccount.savebal >= amountNum) {
        await this.transferApiCall("checking", amountNum)
      }
      else {
        this.messageResult = "Error: You do not have enough funds for the transfer"
      }
    },
    async transferApiCall(action: string, amount: number): Promise<void> {
      let fetchResults = fetch (
          this.$store.getters.getApiBaseUrl + "/" + this.bankAccount.accountid + "/transfer", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.$store.getters.getToken,
              'amount': amount.toString(),
              'transferto': action
            }
          }
      )
      if (await fetchResults.then(response => {return response.ok})) {
        fetchResults = fetch (
            this.$store.getters.getApiBaseUrl + "/" + this.bankAccount.accountid + "/bankaccount", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain',
                'Authorization': 'Bearer ' + this.$store.getters.getToken
              }
            }
        )
        if (await fetchResults.then(response => {return response.ok})) {
          await this.$store.dispatch('updateBankAccount', await fetchResults.then(response => {
            return response.json()}).then(data => {return data}))
          this.messageResult = ""
        }
        else {
          this.messageResult = "ERROR: There was an issue submitting your transfer request"
        }
      }
      else {
        this.messageResult = "ERROR: There was an issue submitting your transfer request"
      }
    }
  }
})
</script>

<style scoped>

</style>