import IModelFactory from '../../../data/abstraction/factories/modelFactory.interface'
import IAccountRepository from '../../../data/abstraction/repository/accountRepository.interface'
import AccountInfo from '../../../data/models/accountInfo.type'
import IAccountEncryption from '../../abstractions/encryption/accountEncryption.interface'
import IAccountInfoService, {
	InsertAccount
} from '../../abstractions/services/accountInfoService.interface'
import { encryptionMessages } from '../constants/messages'
import { EncryptonError } from '../encryption/encryption'

class AccountInfoService implements IAccountInfoService {
	constructor(
		private readonly modelFactory: IModelFactory,
		private readonly accountInfoRepo: IAccountRepository,
		private readonly encryptor: IAccountEncryption
	) {}

	public async getOneAccount(
		serviceId: string,
		accountId: string
	): Promise<AccountInfo | undefined> {
		const encryptedAccount = await this.accountInfoRepo.getOne(serviceId, accountId)

		if (encryptedAccount) {
			await this.encryptor.decryptSingleAccount(encryptedAccount)
		}

		return encryptedAccount
	}

	public async insertOneAccount(account: InsertAccount): Promise<string | void> {
		const testDecryption = await this.accountInfoRepo.getFirst()
		const testResult = await this.testEncyrption(testDecryption)
		if (testResult) {
			return testResult
		}

		const newAccount = this.modelFactory.createAccount(
			account.username,
			account.password,
			account.moreInfo
		)

		await this.encryptor.encryptSingleAccount(newAccount)

		const isInserted = await this.accountInfoRepo.insertOne(account.serviceId, newAccount)

		if (!isInserted) {
			return 'Could not insert account.'
		}
	}

	public async updateOneAccount(account: AccountInfo, serviceId: string): Promise<string | void> {
		const accountForUpdate = await this.accountInfoRepo.getOne(serviceId, account.id)

		if (!accountForUpdate) {
			return 'Account does not exist.'
		}

		const testResult = await this.testEncyrption(accountForUpdate)
		if (testResult) {
			return testResult
		}

		await this.encryptor.encryptSingleAccount(account)

		const isUpdated = await this.accountInfoRepo.updateOne(serviceId, account)
		if (!isUpdated) {
			return 'Could not update account.'
		}
	}

	public async deleteAccount(accountId: string, serviceId: string): Promise<string | void> {
		const isDeleted = await this.accountInfoRepo.deleteOne(serviceId, accountId)

		if (!isDeleted) {
			return 'Could not delete account.'
		}
	}

	private async testEncyrption(testDecryption: AccountInfo | undefined): Promise<string | void> {
		try {
			if (testDecryption) {
				await this.encryptor.decryptSingleAccount(testDecryption)
			}
		} catch (error) {
			if (error instanceof EncryptonError) {
				return error.message
			}

			return encryptionMessages.invalidKeys
		}
	}
}

export default AccountInfoService
