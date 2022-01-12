<template>
  <v-container style="font-size: 1.2em" class="mt-16">
    <v-row justify="center">
      <h1>Welcome to Router Bank!</h1>
    </v-row>
    <v-row justify="center">
      <h2 class="mt-5">A bank to store all of your fake {{ currencyName }} currency!</h2>
    </v-row>
    <v-row justify="center">
      <p class="ma-5">
        Router bank solely uses our custom and totally useless currency {{ currencyName }}.
        This is a demo application that uses Vue, Vuex, Vuetify, Vue Router, and Typescript for the front end.
        Router Bank also uses a custom built .net core API written in C# that connects to an SQL database to store
        all user data. Login or create a new user account to get started.


      </p>
    </v-row>
    <v-row justify="space-around">
      <v-btn x-large color="primary" @click="$router.replace('login')">Login</v-btn>
      <v-btn x-large color="primary" @click="$router.replace('createuser')">Create Account</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "About",
  computed: {
    currencyName(): void {
      return this.$store.getters.getCurrencyName
    }
  }
})
</script>

<style scoped>

</style>