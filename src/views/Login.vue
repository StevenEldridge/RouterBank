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
    login(): void {
      const account: userAccount = this.$store.getters.getUserAccountByUsername(this.username)
      if (account == null) {
        this.messageResult = "Error: Invalid username or password"
        return
      }
      if (account.password === this.password) {
        this.$router.push({ path: `/user/${account.userID}` })
      }
      else {
        this.messageResult = "Error: Invalid username or password"
        return
      }
    }
  }
})
</script>

<style scoped>

</style>