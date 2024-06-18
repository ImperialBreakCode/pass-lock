import AccountInfo from '../../models/AccountInfo.type'

interface IAccountRepository {
	getAllInService: (serviceId: string) => Promise<AccountInfo[]>
	getOne: (serviceId: string, accountId: string) => Promise<AccountInfo | undefined>
	insertOne: (serviceId: string, account: AccountInfo) => Promise<boolean>
	updateOne: (serviceId: string, account: AccountInfo) => Promise<boolean>
	deleteOne: (serviceId: string, accountId: string) => Promise<boolean>
}

export default IAccountRepository
