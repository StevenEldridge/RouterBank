export interface userAccount {
    name: string,
    username: string,
    pass: string,
    birthdate: string,
    addr: string,
    phone: string,
    snn: string
}

export interface bankAccount {
    ussn: string,
    accountid: number,
    checkbal: number,
    savebal: number,
    mpr: number,
    mpr_enable: boolean
}

export interface transact {
    acntid: number,
    act: string,
    amount: number,
    account: string,
    newbal: number,
    tDate: string
}

export interface savingsAndChecking {
    userID: number,
    amount: number
}

export interface mprEnablePayload {
    userID: number,
    mprEnable: boolean
}
