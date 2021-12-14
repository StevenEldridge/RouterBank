<template>
  <div>
    <h1  class="mt-10">Welcome {{ userName }}, to Router Bank!</h1>
    <h2 class="mt-5">A bank to store all of your fake {{ currencyName }} currency!</h2>
    <p class="mt-5">
      This is a demo application that uses Vue, Vuex, Vuetify, Vue Router, and typescript.
      Router bank solely uses our custom and totally useless currency {{ currencyName }}.
      You can use the navigation to the left to traverse Router Bank and manage all of your banking needs.
      Here is what each menu option does:
    </p>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Account Overview</v-list-item-title>
          <v-list-item-subtitle>
            Allows you to see your account information and your savings and checking account balances
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Deposit/Withdraw</v-list-item-title>
          <v-list-item-subtitle>
            Allows you to deposit or withdraw {{ currencyName }} from your checking and savings accounts
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Transfer</v-list-item-title>
          <v-list-item-subtitle>Allows you to transfer {{ currencyName }} between accounts</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Manage Interest</v-list-item-title>
          <v-list-item-subtitle>
            Allows you to set up and manage an interest plan for your savings account
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
          <v-list-item-subtitle>Logs out of your account and redirects to the about page</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend ({
  name: "Home",
  computed: {
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    },
    userName(): string {
      return this.$store.getters.getUserAccount(Number.parseInt(this.$route.params.userID)).name
    }
  }
})
</script>

<style scoped>

</style>