import AccountInfo from '../../models/accountInfo.type'

interface IAccountRepository {
	getAllInService: (serviceId: string) => Promise<AccountInfo[]>
	getOne: (serviceId: string, accountId: string) => Promise<AccountInfo | undefined>
	getFirst: () => Promise<AccountInfo | undefined>
	insertOne: (serviceId: string, account: AccountInfo) => Promise<boolean>
	updateOne: (serviceId: string, account: AccountInfo) => Promise<boolean>
	deleteOne: (serviceId: string, accountId: string) => Promise<boolean>
}

export default IAccountRepository
