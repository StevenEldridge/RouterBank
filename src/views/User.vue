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
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="$router.push({name: item.link})">
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
import {userAccount} from '@/interfaces'

interface drawerItem {
  title: string,
  icon: string,
  link: string
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
        {title: 'Account Overview', icon: 'mdi-account', link: 'AccountOverview'},
        {title: 'Deposit/Withdraw', icon: 'mdi-cash-multiple', link: 'DepositWithdraw'},
        {title: 'Transfer', icon: 'mdi-cash-fast', link: 'Transfer'},
        {title: 'Manage Interest', icon: 'mdi-percent', link: 'ManageInterest'},
        {title: 'Logout', icon: 'mdi-logout', link: 'About'},
      ]
    }
  },
  computed: {
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    },
    userBalance(): number {
      const account: userAccount = this.$store.getters.getUserAccount(Number.parseInt(this.$route.params.userID))
      return account.checkingBalance + account.savingsBalance
    }
  }
})
</script>

<style scoped>

</style>