export interface userAccount {
    userID: number,
    name: string,
    username: string,
    password: string,
    savingsBalance: number,
    checkingBalance: number,
    minutePercentageRate: number,
    mprEnable: boolean
}

export interface savingsAndChecking {
    userID: number,
    amount: number
}

export interface mprEnablePayload {
    userID: number,
    mprEnable: boolean
}
