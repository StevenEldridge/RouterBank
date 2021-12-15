<template>
  <v-container>
    <v-row justify="center" class="mt-16">
      <h1>Create New Account</h1>
    </v-row>
    <v-row justify="center">
      <p>
        Welcome to Router Bank! Please fill out the form to create a new account. We are happy to be your new bank.
      </p>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="name"
          label="Name:"
          hint="Enter your name"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-account"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="username"
          label="Username:"
          hint="Enter a username for your account"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-account"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="password"
          label="Unsecured Password:"
          hint="NOTE: THERE IS NO ACCOUNT PROTECTION. DO NOT ENTER A REAL PASSWORD"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-lock"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-text-field
            v-model="stringSavingsBalance"
            label="Savings Balance"
            hint="Enter your initial savings account balance"
            prepend-inner-icon="mdi-currency-brl"
            :rules="amountFieldRules"
            style="font-size: 1.3em"
            outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            v-model="stringCheckingBalance"
            label="Checking Balance"
            hint="Enter your initial checking account balance"
            prepend-inner-icon="mdi-currency-brl"
            :rules="amountFieldRules"
            style="font-size: 1.3em"
            outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
          color="primary"
          @click="createAccount"
          large
      >Create Account</v-btn>
    </v-row>
    <v-row justify="center">
      <h3 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h3>
    </v-row>
    <v-footer absolute color="red" class="lighten-3">
      <p><b>
        <u>WARNING</u>: There is no account security on Router Bank. This is a demo application and as such account security
        will not be implemented. You shouldn't have to worry as Router Bank does not use anything real. Please DO NOT
        USE a real username or password when making an account.
      </b></p>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {userAccount} from "@/interfaces";

interface createUserData extends userAccount {
  messageResult: string
  amountFieldRules: any[]
  stringSavingsBalance: string
  stringCheckingBalance: string
}

export default Vue.extend({
  name: "CreateUser",
  data(): createUserData {
    return {
      userID: 0,
      name: "",
      username: "",
      password: "",
      stringSavingsBalance: "",
      savingsBalance: 0,
      stringCheckingBalance: "",
      checkingBalance: 0,
      minutePercentageRate: 0.10,
      mprEnable: false,
      messageResult: "",
      amountFieldRules: [
        function (value: string) {
          return !!value || "Required";
        },
        function (value: string) {
          return (/^[0-9]*\.?[0-9]+$/.test(value)) || "Not a valid number";
        }
      ],
    }
  },

  methods: {
    createAccount(): void {
      // Ensures the user entered their name
      if (this.name === "") {
        this.messageResult = "Error: You need to provide your name"
        return
      }
      // Ensures the user entered a username
      if (this.username === "") {
        this.messageResult = "Error: You need to provide a username"
        return
      }
      // Ensures the user entered a password
      if (this.password === "") {
        this.messageResult = "Error: You need to provide a password even though there is no account security lol"
        return
      }
      // Ensures an amount has been specified
      if (!this.stringSavingsBalance || !this.stringCheckingBalance) {
        this.messageResult = "Error: You need to specify your savings and checking balances"
        return
      }
      // Ensures the amount is a proper number
      else if (!/^[0-9]*\.?[0-9]+$/.test(this.stringSavingsBalance) ||
            !/^[0-9]*\.?[0-9]+$/.test(this.stringCheckingBalance)) {
        this.messageResult = "Error: You did not enter a valid number for either your savings or checking balance"
        return
      }

      this.savingsBalance = Number.parseFloat(this.stringSavingsBalance)
      this.checkingBalance = Number.parseFloat(this.stringCheckingBalance)

      this.$store.dispatch('createUserAccount', {
        userID: this.userID,
        name: this.name,
        username: this.username,
        password: this.password,
        savingsBalance: this.savingsBalance,
        checkingBalance: this.checkingBalance,
        minutePercentageRate: this.minutePercentageRate,
        mprEnable: this.mprEnable
      } as userAccount)

      this.$router.push({ path: `/user/${this.$store.getters.getUserAccountByUsername(this.username).userID}` })
    }
  }
})
</script>

<style scoped>

</style>