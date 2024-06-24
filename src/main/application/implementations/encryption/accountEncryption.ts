import IEncryptionKeysStorage from '../../../data/abstraction/fileStorage/encryptionKeysStorage.interface'
import AccountInfo from '../../../data/models/accountInfo.type'
import IAccountEncryption from '../../abstractions/encryption/accountEncryption.interface'
import IEncryption from '../../abstractions/encryption/encryption.interface'
import { encryptionMessages } from '../constants/messages'
import { EncryptonError } from './encryption'

class AccountEncryption implements IAccountEncryption {
	constructor(
		private readonly encryptor: IEncryption,
		private readonly encryptionKeysStorage: IEncryptionKeysStorage
	) {}

	public async encryptSingleAccount(account: AccountInfo): Promise<void> {
		await this.accountCipherAction(account, this.encryptor.encrypt)
	}

	public async encyptMultipleAccounts(accounts: AccountInfo[]): Promise<void> {
		for (let i = 0; i < accounts.length; i++) {
			await this.encryptSingleAccount(accounts[i])
		}
	}

	public async decryptSingleAccount(account: AccountInfo): Promise<void> {
		await this.accountCipherAction(account, this.encryptor.decrypt)
	}

	public async decryptMultipleAccounts(accounts: AccountInfo[]): Promise<void> {
		if (!this.encryptionKeysStorage.checkIfFileExists()) {
			return
		}

		for (let i = 0; i < accounts.length; i++) {
			await this.decryptSingleAccount(accounts[i])
		}
	}

	private async accountCipherAction(account: AccountInfo, action: (data: string) => string) {
		if (this.encryptionKeysStorage.checkIfFileExists()) {
			const keys = await this.encryptionKeysStorage.readData()
			this.encryptor.setKeys(keys.encryptionKey, keys.hmacKey)

			account.username = action(account.username)
			account.password = action(account.password)
			account.moreInfo = action(account.moreInfo)
		} else if (action === this.encryptor.encrypt) {
			throw new EncryptonError(encryptionMessages.noEncryptionKeysFound)
		}
	}
}

export default AccountEncryption
