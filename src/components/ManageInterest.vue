<template>
  <v-container>
    <h1>Manage Interest</h1>
    <h2 class="mt-5">Account Information</h2>
    <v-row class="mt-1">
      <v-col>
        <v-card outlined>
          <v-card-title>Savings Account</v-card-title>
          <v-card-subtitle class="text-h4">{{ userAccount.savingsBalance.toFixed(2) + " " + currencyName }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Minute Percentage Rate (MPR)</v-card-title>
          <v-card-subtitle class="text-h4">{{ (userAccount.minutePercentageRate * 100).toFixed(2) + "%" }}</v-card-subtitle>
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
      </p>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {mprEnablePayload, savingsAndChecking, userAccount} from "@/interfaces";

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
    userAccount(): userAccount | null {
      return this.$store.getters.getUserAccount(Number.parseInt(this.$route.params.userID))
    },
    currencyName(): string {
      return this.$store.getters.getCurrencyName
    }
  },

  methods: {
    submitForm() {
      const amountNum: number = Number.parseFloat(this.mpr)
      const userID: number = Number.parseInt(this.$route.params.userID)

      // Ensures user account exists
      if (this.userAccount == null) {
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

      this.$store.dispatch('updateMinutePercentageRate',
            {userID: userID, amount: (amountNum / 100)} as savingsAndChecking)
      if (this.mprEnable === "Enabled") {
        this.$store.dispatch('updateMPREnable', {userID: userID, mprEnable: true} as mprEnablePayload)
      }
      else {
        this.$store.dispatch('updateMPREnable', {userID: userID, mprEnable: false} as mprEnablePayload)
      }
      this.messageResult = ""

    }
  },

  mounted() {
    if (this.userAccount != undefined) {
      this.mpr = (this.userAccount.minutePercentageRate * 100).toString()
      if (this.userAccount.mprEnable) {
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

</style>