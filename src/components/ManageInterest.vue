<template>
  <v-container id="container">
    <h1>Manage Interest</h1>
    <h2 class="mt-5">Account Information</h2>
    <v-row class="mt-1">
      <v-col style="min-width: 360px">
        <v-card outlined>
          <v-card-title>Savings Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ bankAccount.savebal.toFixed(2) + " " + currencyName }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col style="min-width: 360px">
        <v-card outlined>
          <v-card-title>Minute Percentage Rate (MPR)</v-card-title>
          <v-card-subtitle class="text-h4">{{ (bankAccount.mpr * 100).toFixed(2) + "%" }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <h2 class="mt-10">Manage your MPR Rate</h2>
    <v-text-field
        v-model="mpr"
        label="Amount"
        hint="Only enter a number"
        append-icon="mdi-percent"
        :rules="mprFieldRules"
        style="width: 300px; font-size: 1.3em"
        class="mt-3"
        outlined
    ></v-text-field>
    <h2>Enable or Disable MPR</h2>
    <v-radio-group v-model="mprEnable">
      <v-radio
        label="Enabled"
        value="Enabled"
      ></v-radio>
      <v-radio
          label="Disabled"
          value="Disabled"
      ></v-radio>
    </v-radio-group>
    <v-btn
        color="primary"
        class="mt-4"
        @click="submitForm"
        large
    >Update Interest</v-btn>
    <h3 class="red--text text--darken-2 mt-4" v-if="messageResult">{{ messageResult }}</h3>
    <v-footer absolute color="secondary">
      <p>
        Router Bank values our customers and as such we offer unprecedented interest rates for your savings account.
        We give you full control over setting your interest rate as a testament of our dedication to our customers.
        Your savings account will only compound while you use our website and enable the MPR.
      </p>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {bankAccount} from "@/interfaces";

interface manageInterestData {
  mpr: string,
  mprEnable: "Enabled" | "Disabled"
  mprFieldRules: any[],
  messageResult: string
}

export default Vue.extend ({
  name: "ManageInterest",
  data(): manageInterestData {
    return {
      mpr: "",
      mprEnable: "Disabled",
      mprFieldRules: [
        function (value: string) {
          return !!value || "Required";
        },
        function (value: string) {
          return (/^[0-9]*\.?[0-9]+$/.test(value)) || "Not a valid number";
        },
        function (value: string) {
          return Number.parseFloat(value) <= 300 || "Sorry but that is too much :("
        }
      ],
      messageResult: ""
    }
  },

  computed: {
    bankAccount(): bankAccount {
      return this.$store.getters.getBankAccount
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    }
  },

  methods: {
    async submitForm(): Promise<void> {
      const amountNum: number = Number.parseFloat(this.mpr) / 100
      var enabled: string
      if (this.mprEnable === "Enabled") {
        enabled = 'true';
      }
      else {
        enabled = 'false';
      }

      // Ensures user account exists
      if (this.bankAccount == null) {
        this.messageResult = "Error: User Account does not exist"
        return
      }
      // Ensures an amount has been specified
      if (!this.mpr) {
        this.messageResult = "Error: You need to specify an amount"
        return
      }
      // Ensures the amount is a proper number
      else if (!/^[0-9]*\.?[0-9]+$/.test(this.mpr)) {
        this.messageResult = "Error: You did not enter a valid number"
        return
      }
      else if (amountNum > 300) {
        this.messageResult = "Error: Sorry but that is too much :("
        return
      }

      let fetchResults = fetch (
        this.$store.getters.getApiBaseUrl + "/" + this.$store.getters.getAccountId + "/updatempr", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, plain/text',
            'Authorization': 'Bearer ' + this.$store.getters.getToken,
            'amount': amountNum.toString(),
            'enabled': enabled
          }
        }
      )
      if (await fetchResults.then(response => {return response.ok})) {
        fetchResults = fetch (
          this.$store.getters.getApiBaseUrl + "/" + this.$store.getters.getAccountId + "/bankaccount", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, plain/text',
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
          }
        )
        if (await fetchResults.then(response => {return response.ok})) {
          await this.$store.dispatch('updateBankAccount', await fetchResults.then(response => {
            return response.json()}).then(data => {return data}))
          this.messageResult = ""
        }
        else {
          this.messageResult = "ERROR: There was an issue updating your interest rates"
        }
      }
      else {
        this.messageResult = "ERROR: There was an issue updating your interest rates"
      }
    }
  },

  mounted() {
    if (this.bankAccount != undefined) {
      this.mpr = (this.bankAccount.mpr * 100).toString()
      if (this.bankAccount.mpr_enable) {
        this.mprEnable = "Enabled"
      }
      else {
        this.mprEnable = "Disabled"
      }
    }
  }
})
</script>

<style scoped>
@media (min-width: 601px) {
  #container {
    margin-bottom: 160px;
  }
}
@media (max-width: 600px) {
  #container {
    margin-bottom: 208px;
  }
}
</style>
