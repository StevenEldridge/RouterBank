import Vue from 'vue'
import Vuex from 'vuex'
import {userAccount, bankAccount, transact} from '@/interfaces'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    currencyName: "Routez",
    apiBaseUrl: "https://localhost:7259",
    token: "",
    accountId: 0,
    userAccount: {} as userAccount,
    bankAccount: {} as bankAccount,
    transactions: new Array<transact>()
  },

  mutations: {
    setToken(store, payload: string): void {
      store.token = payload
    },
    setAccountId(store, payload: number): void {
      store.accountId = payload
    },
    setUserAccount(store, payload: userAccount): void {
      store.userAccount = payload
    },
    setBankAccount(store, payload: bankAccount): void {
      store.bankAccount = payload
    },
    setTransactions(store, payload: transact[]): void {
      store.transactions = payload
    }
  },

  actions: {
    updateToken(context, payload: string): void {
      context.commit('setToken', payload)
    },
    updateAccountId(context, payload: number): void {
      context.commit('setAccountId', payload)
    },
    updateUserAccount(context, payload: userAccount): void {
      context.commit('setUserAccount', payload)
    },
    updateBankAccount(context, payload: bankAccount): void {
      context.commit('setBankAccount', payload)
    },
    updateTransactions(context, payload: transact[]): void {
      context.commit('setTransactions', payload)
    }
  },

  getters: {
    getCurrencyName(store): string {
      return store.currencyName
    },
    getApiBaseUrl(store): string {
      return store.apiBaseUrl
    },
    getToken(store): string {
      return store.token
    },
    getAccountId(store): number {
      return store.accountId
    },
    getUserAccount(store): userAccount {
      return store.userAccount
    },
    getBankAccount(store): bankAccount {
      return store.bankAccount
    },
    getTransactions(store): transact[] {
      return store.transactions
    }
  }
})

/*
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
 */
