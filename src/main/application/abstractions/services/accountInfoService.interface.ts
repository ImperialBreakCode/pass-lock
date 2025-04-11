import AccountInfo from '../../../data/models/accountInfo.type'
import EncryptionKeys from '../../models/encryptionKeys.type'

export type InsertAccount = {
	serviceId: string
	username: string
	password: string
	moreInfo: string
}

interface IAccountInfoService {
	checkIfAnyAccountsExist: () => Promise<boolean>
	getOneAccount: (
		serviceId: string,
		accountId: string,
		keys: EncryptionKeys | null
	) => Promise<AccountInfo | undefined>
	insertOneAccount: (account: InsertAccount, keys: EncryptionKeys) => Promise<void | string>
	updateOneAccount: (
		account: AccountInfo,
		serviceId: string,
		keys: EncryptionKeys
	) => Promise<void | string>
	deleteAccount: (accountId: string, serviceId: string) => Promise<void | string>
}

export default IAccountInfoService
