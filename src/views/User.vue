<template>
  <div id="user">
    <v-app-bar
        color="primary"
        dark
    >
      <v-app-bar-nav-icon @click="openNavDrawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ currencyName }}: {{ userBalance.toFixed(2) }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="openNavDrawer"
        absolute
        temporary
    >
      <v-list nav>
        <v-list-item
            v-for="item in navDrawerItems"
            :key = item.title
            @click="item.func"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {bankAccount, userAccount} from '@/interfaces'

interface drawerItem {
  title: string,
  icon: string,
  func: any
}

interface userComponentData {
  openNavDrawer: boolean,
  navDrawerItems : drawerItem[]
}

export default Vue.extend({
  name: 'user',
  data(): userComponentData {
    return {
      openNavDrawer: false,
      navDrawerItems: [
        {title: 'Account Overview', icon: 'mdi-account', func:() => {this.$router.push({name: 'AccountOverview'})}},
        {title: 'Deposit/Withdraw', icon: 'mdi-cash-multiple', func:() => {this.$router.push({name: 'DepositWithdraw'})}},
        {title: 'Transfer', icon: 'mdi-cash-fast', func:() => {this.$router.push({name: 'Transfer'})}},
        {title: 'Manage Interest', icon: 'mdi-percent', func:() => {this.$router.push({name: 'ManageInterest'})}},
        {title: 'Transaction History', icon: 'mdi-history', func:() => {this.$router.push({name: 'TransactionHistory'})}},
        {title: 'Logout', icon: 'mdi-logout', func:() => {location.reload()}},
      ]
    }
  },
  computed: {
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    },
    userBalance(): number {
      const account: bankAccount = this.bankAccount
      return account.savebal + account.checkbal
    },
    userAccount(): userAccount | null {
      return this.$store.getters.getUserAccount
    },
    bankAccount(): bankAccount {
      return this.$store.getters.getBankAccount
    }
  },

  methods: {
    calculateMPR(): void {
      if (this.bankAccount != null && this.bankAccount.mpr_enable) {
        const interest = this.bankAccount.savebal * this.bankAccount.mpr / 6
        this.depositApiCall(Math.round(interest * 100) / 100)
      }
      setTimeout(() => this.calculateMPR(), 10000)
    },

    async depositApiCall(amount: number): Promise<void> {
      let fetchResults = fetch(
          this.$store.getters.getApiBaseUrl + "/" + this.bankAccount.accountid + "/depositsavings", {
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
        }
      }
    }
  },

  beforeMount() {
    if (this.$store.getters.getAccountId != this.$route.params.userID) {
      this.$router.replace({ path: `/` })
    }
    setTimeout(() => this.calculateMPR(), 10000)
  },
  watch: {
    $route(to, from) {
      if (this.$store.getters.getAccountId != this.$route.params.userID) {
        this.$router.replace({ path: `/` })
      }
    }
  }
})
</script>

<style scoped>

</style>