import Vue from 'vue'
import Vuex from 'vuex'
import { userAccount } from '@/interfaces'

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
      store.userAccounts.push(payload)
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
    }
  }
})
