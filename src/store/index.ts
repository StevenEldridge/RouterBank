import Vue from 'vue'
import Vuex from 'vuex'
import {mprEnablepayload, userAccount} from '@/interfaces'
import { savingsAndChecking } from '@/interfaces'

Vue.use(Vuex)

interface stateData {
  currencyName: string,
  userAccounts: Array<userAccount>
}

export default new Vuex.Store({

  state: {
    currencyName: "Routez",
    userAccounts: new Array<userAccount>(),
  } as stateData,

  mutations: {
    createUserAccount(store, payload: userAccount): void {
      // Will only create a new user if the username does not yet exist
      const userIndex = store.userAccounts.findIndex(element => element.username === payload.username)
      if (userIndex === -1 && payload != undefined) {
        payload.userID = store.userAccounts.length + 1
        store.userAccounts.push(payload)
      }
    },
    depositSavings(store, payload: savingsAndChecking): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1 && payload.amount != undefined) {
        store.userAccounts[userIndex].savingsBalance += payload.amount
      }
    },
    depositChecking(store, payload: savingsAndChecking): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1 && payload.amount != undefined) {
        store.userAccounts[userIndex].checkingBalance += payload.amount
      }
    },
    withdrawSavings(store, payload: savingsAndChecking): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1  && payload.amount != undefined
            && store.userAccounts[userIndex].savingsBalance >= payload.amount) {
        store.userAccounts[userIndex].savingsBalance -= payload.amount
      }
    },
    withdrawChecking(store, payload: savingsAndChecking): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1 && payload.amount != undefined
            && store.userAccounts[userIndex].checkingBalance >= payload.amount) {
        store.userAccounts[userIndex].checkingBalance -= payload.amount
      }
    },
    setMinutePercentageRate(store, payload: savingsAndChecking): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1 && payload.amount != undefined) {
        store.userAccounts[userIndex].minutePercentageRate = payload.amount
      }
    },
    setMPREnable(store, payload: mprEnablepayload): void {
      const userIndex = store.userAccounts.findIndex(element => element.userID === payload.userID)
      if (userIndex !== -1 && payload.mprEnable != undefined) {
        store.userAccounts[userIndex].mprEnable = payload.mprEnable
      }
    }
  },

  actions: {
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
    }
  }
})
