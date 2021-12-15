<template>
  <v-container>
    <h1>Deposit and Withdraw</h1>
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
    <v-form ref="form">
      <h2 class="mt-8">What action would you like to perform?</h2>
      <v-radio-group v-model="action">
        <v-radio
            label="Deposit"
            value="Deposit"
        ></v-radio>
        <v-radio
            label="Withdraw"
            value="Withdraw"
        ></v-radio>
      </v-radio-group>
      <h2>Select an account:</h2>
      <v-radio-group v-model="account">
        <v-radio
            label="Savings"
            value="Savings"
        ></v-radio>
        <v-radio
            label="Checking"
            value="Checking"
        ></v-radio>
      </v-radio-group>
      <h2 v-if="action === 'Deposit'">Enter an amount to deposit into {{ account }}</h2>
      <h2 v-else>Enter an amount to withdraw from {{ account }}</h2>
      <v-text-field
          v-model="amount"
          label="Amount"
          hint="Only enter a number"
          prepend-inner-icon="mdi-currency-brl"
          :rules="amountFieldRules"
          style="width: 400px; font-size: 1.3em"
          class="mt-4"
          outlined
      ></v-text-field>
      <v-btn
        color="primary"
        @click="submitForm"
        large
      >{{ action }}</v-btn>
      <h3 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h3>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {savingsAndChecking, userAccount} from "@/interfaces";

interface depositWithdrawData {
  action: "Deposit" | "Withdraw"
  account: "Savings" | "Checking"
  amount: string,
  amountFieldRules: any[],
  messageResult: string
}

export default Vue.extend ({
  name: "DepositWithdraw",
  data(): depositWithdrawData {
    return {
      action: "Deposit",
      account: "Savings",
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
    // Validates the form and then dispatches deposits or withdraws to the store
    submitForm() {
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

      if (this.action === "Withdraw") {
        // Withdraws from savings if there is enough in savings
        if (this.account === "Savings") {
          if (this.userAccount.savingsBalance < amountNum) {
            this.messageResult = "Error: Not enough in savings to withdraw"
          }
          else {
            this.$store.dispatch('withdrawSavings', {userID: userID, amount: amountNum} as savingsAndChecking)
            this.messageResult = ""
          }
        }
        // Withdraws from checking if there is enough in checking
        else {
          if (this.userAccount.checkingBalance < amountNum) {
            this.messageResult = "Error: Not enough in checking to withdraw"
          }
          else {
            this.$store.dispatch('withdrawChecking', {userID: userID, amount: amountNum} as savingsAndChecking)
            this.messageResult = ""
          }
        }
      }
      else {
        // Deposits into savings
        if (this.account === "Savings") {
          this.$store.dispatch('depositSavings', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.messageResult = ""
        }
        // Deposits into checking
        else {
          this.$store.dispatch('depositChecking', {userID: userID, amount: amountNum} as savingsAndChecking)
          this.messageResult = ""
        }
      }
    }
  }
})
</script>

<style scoped>

</style>