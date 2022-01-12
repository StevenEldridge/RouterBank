import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import User from '../views/User.vue'
import Home from '../components/Home.vue'
import CreateUser from '../views/CreateUser.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import AccountOverview from "@/components/AccountOverview.vue";
import DepositWithdraw from "@/components/DepositWithdraw.vue";
import Transfer from "@/components/Transfer.vue";
import ManageInterest from "@/components/ManageInterest.vue";
import TransactionHistory from "@/components/TransactionHistory.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/user/:userID',
    component: User,
    children: [
      { path: '', name: 'UserHome', component: Home },
      { path: 'home', name: 'Home', component: Home },
      { path: 'accountoverview', name: 'AccountOverview', component: AccountOverview },
      { path: 'depositwithdraw', name: 'DepositWithdraw', component: DepositWithdraw },
      { path: 'transfer', name: 'Transfer', component: Transfer },
      { path: 'manageinterest', name: 'ManageInterest', component: ManageInterest },
      { path: 'transactionhistory', name: 'TransactionHistory', component: TransactionHistory}
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
