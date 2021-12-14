<template>
  <v-container>
    <h1>Transfer</h1>
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
import {savingsAndChecking, userAccount} from "@/interfaces";

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
    userAccount(): userAccount | null {
      return this.$store.getters.getUserAccount(Number.parseInt(this.$route.params.userID))
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
    submitForm(): void {
      const amountNum: number = Number.parseFloat(this.amount)
      const userID: number = Number.parseInt(this.$route.params.userID)

      // Ensures user account exists
      if (this.userAccount == null) {
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
      if (this.buttonDirection === "Left") {
        if (this.userAccount.checkingBalance < amountNum ) {
          this.messageResult = "Error: Not enough in checking to complete transfer"
        }
        else {
          this.$store.commit('withdrawChecking', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.$store.commit('depositSavings', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.messageResult= ""
        }
      }
      // Transfers money from savings to checking
      else {
        if (this.userAccount.savingsBalance < amountNum ) {
          this.messageResult = "Error: Not enough in savings to complete transfer"
        }
        else {
          this.$store.commit('withdrawSavings', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.$store.commit('depositChecking', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.messageResult= ""
        }
      }
    }
  }
})
</script>

<style scoped>

</style>