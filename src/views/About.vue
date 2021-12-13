<template>
  <v-container style="text-align: center; font-size: 1.2em" class="mt-16">
    <h1>Welcome to Router Bank!</h1>
    <h2 class="mt-5">A bank to store all of your fake {{ currencyName }} currency!</h2>
    <p class="ma-5">
      This is a demo application that uses Vue, Vuex, Vuetify, Vue Router, and typescript.
      You can use the navigation to the left to traverse Router Bank and manage all of your banking needs.
      Router bank solely uses our custom and totally useless currency {{ currencyName }}
    </p>
    <v-btn x-large color="primary" class="mr-16" @click="$router.push('login')">Login</v-btn>
    <v-btn x-large color="primary" @click="$router.push('createuser')">Create Account</v-btn>
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