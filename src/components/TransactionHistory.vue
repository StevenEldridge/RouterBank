<template>
  <v-container>
    <h1 class="mb-8">Transaction History</h1>
    <v-data-table
      v-if="messageResult === ''"
      :headers="headers"
      :items="tableArray"
      class="elevation-3"
    ></v-data-table>
    <h1 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {transact} from "@/interfaces";

interface transactTable {
  TDate: string,
  Act: string,
  Amount: number,
  Account: string,
  Newbal: number
}

export default Vue.extend ({
  name: "TransactionHistory",
  data() {
    return {
      messageResult: "",
      tableArray: [] as transactTable[]
    }
  },
  computed: {
    transact(): transact[] {
      return this.$store.getters.getTransactions
    },
    headers() {
      return [
        { text: 'Transaction Timestamp', align: 'center', sortable: false, value: 'TDate' },
        { text: 'Withdraw/Deposit', align: 'center', sortable: false, value: 'Act' },
        { text: 'Amount', align: 'center', sortable: false, value: 'Amount' },
        { text: 'Account', align: 'center', sortable: false, value: 'Account' },
        { text: 'New Balance', align: 'center', sortable: false, value: 'Newbal' }
      ]
    }
  },
  async beforeMount() {
    let fetchResults = fetch (
      this.$store.getters.getApiBaseUrl + "/" + this.$store.getters.getAccountId + "/transactionhistory", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, plain/text',
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }
    )
    if (await fetchResults.then(response => {return response.ok})) {
      await this.$store.dispatch('updateTransactions', await fetchResults.then(response => {
        return response.json()}).then(data => {return data}))

      let transactions = [] as transactTable[]
      for (let i =this.transact.length - 1; i >= 0; i--) {
        transactions.push({
          TDate: this.transact[i].tDate,
          Act: this.transact[i].act,
          Amount: this.transact[i].amount,
          Account: this.transact[i].account,
          Newbal: this.transact[i].newbal
        })
      }
      this.tableArray = transactions
      this.messageResult = ""
    }
    else {
      this.messageResult = "ERROR: Your transaction history could not be loaded"
    }
  }
})
</script>

<style scoped>

</style>
