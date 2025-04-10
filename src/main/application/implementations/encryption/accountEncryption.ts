import { inject, injectable } from 'tsyringe'
import AccountInfo from '../../../data/models/accountInfo.type'
import IAccountEncryption from '../../abstractions/encryption/accountEncryption.interface'
import type IEncryption from '../../abstractions/encryption/encryption.interface'
import Encrypton from './encryption'
import EncryptionKeys from '../../models/encryptionKeys.type'

@injectable()
class AccountEncryption implements IAccountEncryption {
	constructor(@inject(Encrypton) private readonly encryptor: IEncryption) {}

	public async encryptSingleAccount(account: AccountInfo, keys: EncryptionKeys): Promise<void> {
		await this.accountCipherAction(account, keys, (data: string) =>
			this.encryptor.encrypt(data)
		)
	}

	public async encyptMultipleAccounts(
		accounts: AccountInfo[],
		keys: EncryptionKeys
	): Promise<void> {
		for (let i = 0; i < accounts.length; i++) {
			await this.encryptSingleAccount(accounts[i], keys)
		}
	}

	public async decryptSingleAccount(account: AccountInfo, keys: EncryptionKeys): Promise<void> {
		await this.accountCipherAction(account, keys, (data: string) =>
			this.encryptor.decrypt(data)
		)
	}

	public async decryptMultipleAccounts(
		accounts: AccountInfo[],
		keys: EncryptionKeys
	): Promise<void> {
		for (let i = 0; i < accounts.length; i++) {
			await this.decryptSingleAccount(accounts[i], keys)
		}
	}

	private async accountCipherAction(
		account: AccountInfo,
		keys: EncryptionKeys,
		action: (data: string) => string
	) {
		this.encryptor.setKeys(keys.key, keys.hmac)

		account.username = action(account.username)
		account.password = action(account.password)
		account.moreInfo = action(account.moreInfo)
	}
}

export default AccountEncryption
