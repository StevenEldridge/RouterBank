<template>
  <div>
  <v-container style="margin-bottom: 128px;">
    <v-row justify="center" class="mt-4">
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
          v-model="pass"
          label="Password:"
          hint="NOTE: DO NOT USE A REAL PASSWORD"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-lock"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="birthdate"
          label="Date of Birth:"
          hint="NOTE: DO NOT ENTER YOUR REAL DATE OF BIRTH"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-cake"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="addr"
          label="Address:"
          hint="NOTE: DO NOT ENTER YOUR REAL HOME ADDRESS"
          :rules="[function (value) { return !!value || 'Required'; }]"
          prepend-inner-icon="mdi-map-marker"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="phone"
          label="Phone Number:"
          hint="NOTE: DO NOT USE YOUR REAL PHONE NUMBER"
          :rules="amountFieldRules"
          prepend-inner-icon="mdi-cellphone"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="snn"
          label="Social Security Number:"
          hint="NOTE: DO NOT USE YOUR REAL SSN NUMBER"
          :rules="amountFieldRules"
          prepend-inner-icon="mdi-account-box"
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
  </v-container>
  <v-footer fixed color="red" class="lighten-3">
    <p><b>
      <u>WARNING</u>: Router Bank is just a demo application. DO NOT enter real information about yourself such as
      a real password, date of birth, address, phone number, or social security number. Please USE FAKE informaiton.
    </b></p>
  </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {userAccount, bankAccount} from "@/interfaces";

interface createUserData extends userAccount, bankAccount {
  messageResult: string
  amountFieldRules: any[]
  stringSavingsBalance: string
  stringCheckingBalance: string
}

export default Vue.extend({
  name: "CreateUser",
  data(): createUserData {
    return {
      name: "",
      username: "",
      pass: "",
      birthdate: "",
      addr: "",
      phone: "",
      snn: "",
      ussn: "",
      accountid: 0,
      stringSavingsBalance: "",
      savebal: 0,
      stringCheckingBalance: "",
      checkbal: 0,
      mpr: 0.05,
      mpr_enable: false,
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
    async createAccount(): Promise<void> {
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
      if (this.pass === "") {
        this.messageResult = "Error: You need to provide a password"
        return
      }
      // Ensures the user entered their date of birth
      if (this.birthdate === "") {
        this.messageResult = "Error: You need to provide a date of birth"
        return
      }
      // Ensures the user entered their address
      if (this.addr === "") {
        this.messageResult = "Error: You need to provide an address"
        return
      }
      // Ensures the user entered a phone number
      if (this.phone === "") {
        this.messageResult = "Error: You need to provide a phone number"
        return
      }
      // Ensures the user entered a ssn
      if (this.snn === "") {
        this.messageResult = "Error: You need to provide a social security number"
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
      // Ensures the phone number is a valid number
      else if (!/^[0-9]*\.?[0-9]+$/.test(this.phone)) {
        this.messageResult = "Error: You did not enter a valid phone number"
        return
      }
      // Ensures the snn is a valid ssn number
      else if (!/^[0-9]*\.?[0-9]+$/.test(this.snn)) {
        this.messageResult = "Error: You did not enter a valid social security number"
        return
      }

      this.savebal = Number.parseFloat(this.stringSavingsBalance)
      this.checkbal = Number.parseFloat(this.stringCheckingBalance)
      let hashedPass : string = await this.hashPassword(this.pass)

      let responseUser
      let responseBank
      let responseBanksOwned
      let responseGetUser
      let responseGetBank

      // Calls the API and creates a user account
      responseUser = fetch(
          this.apiBaseUrl + "/createuseraccount", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            },
            body: JSON.stringify({
              Name: this.name, Username: this.username, Pass: hashedPass,
              Birthdate: this.birthdate, Addr: this.addr, Phone: this.phone, Snn: this.snn
            })
          }
      )
      if (await responseUser.then(response => {
        return response.ok
      })) {
        await this.$store.dispatch('updateToken', await responseUser.then(
            response => {return response.json()}).then(data => {return data}))
      } else {
        this.messageResult = "ERROR: There was an issue creating the user account"
        return
      }

      // Calls the API and creates a bank account
      responseBank = fetch(
          this.apiBaseUrl + "/createbankaccount", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify({
              Ussn: this.snn, Accountid: this.accountid, Checkbal: this.checkbal,
              Savebal: this.savebal, Mpr: this.mpr, Mpr_enable: this.mpr_enable
            })
          }
      )
      if (await responseBank.then(response => {
        return response.ok
      })) {
        await this.$store.dispatch('updateToken', await responseBank.then(
            response => {return response.json()}).then(data => {return data}))
      } else {
        this.messageResult = "ERROR: There was an issue creating the bank account"
        return
      }


      //Calls the API and gets the first account a user owns
      responseBanksOwned = fetch(
        this.apiBaseUrl + "/bankaccountsowned", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain',
            'Authorization': 'Bearer ' + this.token
          }
        }
      )
      if (await responseBanksOwned.then(response => {
        return response.ok
      })) {
        await this.$store.dispatch('updateAccountId', (await responseBanksOwned.then(
            response => {return response.json()}).then(data => {return data}))[0])

      } else {
        this.messageResult = "ERROR: There was an issue finding your bank account"
        return
      }

      //Calls the API and gets the user's user account information
      responseGetUser = fetch(
          this.$store.getters.getApiBaseUrl + "/" + this.$store.getters.getAccountId + "/useraccount", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
          }
      )
      if (await responseGetUser.then(response => {
        return response.ok
      })) {
          await this.$store.dispatch('updateUserAccount', await responseGetUser.then(
              response => {return response.json()}).then(data => {return data}))
      } else {
        this.messageResult = "ERROR: There was an issue getting your user account information"
        return
      }

      // Calls theAPI and gets the user's bank account information
      responseGetBank = fetch(
          this.$store.getters.getApiBaseUrl + "/" + this.$store.getters.getAccountId + "/bankaccount", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
          }
      )
      if (await responseGetBank.then(response => {
        return response.ok
      })) {
        await this.$store.dispatch('updateBankAccount', await responseGetBank.then(
            response => {return response.json()}).then(data => {return data}))
        await this.$router.push({ path: `/user/${this.$store.getters.getAccountId}` })
      } else {
        this.messageResult = "ERROR: There was an issue getting your user account information"
        return
      }
    },
    async hashPassword(password: string) {
      const utf8 = new TextEncoder().encode(password)
      const hashedBuff = await crypto.subtle.digest('SHA-256', utf8)
      const hashedArray = Array.from(new Uint8Array(hashedBuff))
      return hashedArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  },
  computed: {
    token(): string {
      return this.$store.getters.getToken
    },
    apiBaseUrl(): string {
      return this.$store.getters.getApiBaseUrl
    }
  }
})
</script>

<style scoped>

</style>
