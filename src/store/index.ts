import Vue from 'vue'
import Vuex from 'vuex'
import {mprEnablePayload, userAccount} from '@/interfaces'
import { savingsAndChecking } from '@/interfaces'

Vue.use(Vuex)

interface stateData {
  currencyName: string,
  userAccounts: Array<userAccount>
}
interface commitCheckingAndSavings {
  userAccountsIndex: number,
  amount: number
}
interface commitMPREnable {
  userAccountsIndex: number,
  mprEnable: boolean
}

export default new Vuex.Store({

  state: {
    currencyName: "Routez",
    userAccounts: new Array<userAccount>(),
  } as stateData,

  mutations: {
    addUserAccount(store, payload: userAccount): void {
      store.userAccounts.push(payload)
    },
    setSavingsBalance(store, payload: commitCheckingAndSavings): void {
      store.userAccounts[payload.userAccountsIndex].savingsBalance = payload.amount
    },
    setCheckingBalance(store, payload: commitCheckingAndSavings): void {
      store.userAccounts[payload.userAccountsIndex].checkingBalance = payload.amount
    },
    setMinutePercentageRate(store, payload: commitCheckingAndSavings): void {
      store.userAccounts[payload.userAccountsIndex].minutePercentageRate = payload.amount
    },
    setMPREnable(store, payload: commitMPREnable): void {
      store.userAccounts[payload.userAccountsIndex].mprEnable = payload.mprEnable
    }
  },

  actions: {
    createUserAccount(context, payload: userAccount): void {
      if (context.getters.getUserAccountByUsername(payload.username) == null) {
        payload.userID = context.getters.getTotalUserAccounts + 1
        context.commit('addUserAccount', payload)
      }
    },
    depositSavings(context, payload: savingsAndChecking): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.amount != undefined) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setSavingsBalance',
            { userAccountsIndex: userAccountsIndex,
                amount: userAccount.savingsBalance + payload.amount } as commitCheckingAndSavings)
      }
    },
    depositChecking(context, payload: savingsAndChecking): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.amount != undefined) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setCheckingBalance',
            { userAccountsIndex: userAccountsIndex,
                amount: userAccount.checkingBalance + payload.amount } as commitCheckingAndSavings)
      }
    },
    withdrawSavings(context, payload: savingsAndChecking): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.amount != undefined && userAccount.savingsBalance >= payload.amount) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setSavingsBalance',
            { userAccountsIndex: userAccountsIndex,
                amount: userAccount.savingsBalance - payload.amount } as commitCheckingAndSavings)
      }
    },
    withdrawChecking(context, payload: savingsAndChecking): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.amount != undefined && userAccount.checkingBalance >= payload.amount) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setCheckingBalance',
            { userAccountsIndex: userAccountsIndex,
                amount: userAccount.checkingBalance - payload.amount } as commitCheckingAndSavings)
      }
    },
    updateMinutePercentageRate(context, payload: savingsAndChecking): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.amount != undefined) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setMinutePercentageRate',
            { userAccountsIndex: userAccountsIndex,
               amount: payload.amount } as commitCheckingAndSavings)
      }
    },
    updateMPREnable(context, payload: mprEnablePayload): void {
      const userAccount = context.getters.getUserAccount(payload.userID)
      if (userAccount != null && payload.mprEnable != undefined) {
        const userAccountsIndex = context.getters.getUserAccountIndex(payload.userID)
        context.commit('setMPREnable', { userAccountsIndex: userAccountsIndex,
           mprEnable: payload.mprEnable} as commitMPREnable)
      }
    }
  },

  getters: {
    getCurrencyName(store): string {
      return store.currencyName
    },
    getUserAccount: (store) => (accountID: number) => {
      const returnedElement = store.userAccounts.find(element => element.userID === accountID)
      if (returnedElement != undefined) {
        return returnedElement
      }
      else {
        return null
      }
    },
    getUserAccountByUsername: (store) => (username: string) => {
      const returnedElement = store.userAccounts.find(element => element.username === username)
      if (returnedElement != undefined) {
        return returnedElement
      }
      else {
        return null
      }
    },
    getTotalUserAccounts(store): number {
      return store.userAccounts.length
    },
    getUserAccountIndex: (store) => (userID: number) => {
      return store.userAccounts.findIndex(element => element.userID === userID)
    }
  }
})
