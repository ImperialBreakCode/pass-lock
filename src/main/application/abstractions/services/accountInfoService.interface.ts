import AccountInfo from '../../../data/models/accountInfo.type'

export type InsertAccount = {
	serviceId: string
	username: string
	password: string
	moreInfo: string
}

interface IAccountInfoService {
	getOneAccount: (serviceId: string, accountId: string) => Promise<AccountInfo | undefined>
	insertOneAccount: (account: InsertAccount) => Promise<void | string>
	updateOneAccount: (account: AccountInfo, serviceId: string) => Promise<void | string>
	deleteAccount: (accountId: string, serviceId: string) => Promise<void | string>
}

export default IAccountInfoService
