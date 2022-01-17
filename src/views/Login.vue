<template>
  <v-container>
    <v-row justify="center" class="mt-16">
      <h1>Login to Router Bank</h1>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="username"
          label="Username:"
          hint="Enter your account username"
          prepend-inner-icon="mdi-account"
          style="font-size: 1.3em"
          class="mt-10"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-text-field
          v-model="password"
          label="Password:"
          hint="Enter your account password"
          prepend-inner-icon="mdi-lock"
          style="font-size: 1.3em"
          outlined
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-btn
          color="primary"
          @click="login"
          large
      >Login</v-btn>
    </v-row>
    <v-row justify="center">
      <h3 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h3>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {userAccount} from "@/interfaces";

interface loginData {
  username: string
  password: string
  messageResult: string
}

export default Vue.extend({
  name: "Login",
  data(): loginData {
    return {
      username: "",
      password: "",
      messageResult: ""
    }
  },

  methods: {
    async login(): Promise<void> {
      let responseLogin
      let responseBanksOwned
      let responseGetUser
      let responseGetBank

      //Calls the API and attempts to log the user in
      responseLogin = fetch(
        this.$store.getters.getApiBaseUrl + "/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain',
            'username': this.username,
            'password': await this.hashPassword(this.password)
          }
        }
      )
      if (await responseLogin.then(response => {
        return response.ok
      })) {
        await this.$store.dispatch('updateToken', await responseLogin.then(
            response => {return response.json()}).then(data => {return data}))
      } else {
        this.messageResult = "Error: Invalid username or password"
      }

      //Calls the API and gets the first account a user owns
      responseBanksOwned = fetch(
          this.$store.getters.getApiBaseUrl + "/bankaccountsowned", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Authorization': 'Bearer ' + this.$store.getters.getToken
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
        this.messageResult = "ERROR: Your username or password is invalid"
        return
      }
    },
    async hashPassword(password: string) {
      const utf8 = new TextEncoder().encode(password)
      const hashedBuff = await crypto.subtle.digest('SHA-256', utf8)
      const hashedArray = Array.from(new Uint8Array(hashedBuff))
      return hashedArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  }
})
</script>

<style scoped>

</style>
