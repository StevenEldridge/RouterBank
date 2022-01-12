<template>
  <v-container>
    <h1>Deposit and Withdraw</h1>
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
import {bankAccount} from "@/interfaces";

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
    bankAccount(): bankAccount {
      return this.$store.getters.getBankAccount
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    }
  },

  methods: {
    // Validates the form and then makes an API request for a deposit or withdraw
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

      if (this.action === "Withdraw") {
        // Withdraws from savings if there is enough in savings
        if (this.account === "Savings") {
          if (this.bankAccount.savebal < amountNum) {
            this.messageResult = "Error: Not enough in savings to withdraw"
          }
          else {
            await this.depositWithdrawApiCall("withdrawsavings", amountNum)
          }
        }
        // Withdraws from checking if there is enough in checking
        else {
          if (this.bankAccount.checkbal < amountNum) {
            this.messageResult = "Error: Not enough in checking to withdraw"
          }
          else {
            await this.depositWithdrawApiCall("withdrawchecking", amountNum)
          }
        }
      }
      else {
        // Deposits into savings
        if (this.account === "Savings") {
          await this.depositWithdrawApiCall("depositsavings", amountNum)
        }
        // Deposits into checking
        else {
          await this.depositWithdrawApiCall("depositchecking", amountNum)
        }
      }
    },
    async depositWithdrawApiCall(action: string, amount: number): Promise<void> {
      let fetchResults = fetch(
          this.$store.getters.getApiBaseUrl + "/" + this.bankAccount.accountid + "/" + action, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.$store.getters.getToken,
              'amount': amount.toString()
            },
          }
      )
      if (await fetchResults.then(response => {
        return response.ok
      })) {
        fetchResults = fetch(
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
          this.messageResult = "ERROR: There was an error processing your transaction"
        }
      }
    }
  }
})
</script>

<style scoped>

</style>