import { inject, injectable } from 'tsyringe'
import IDataManagementService from '../../abstractions/services/dataManagementService.interface'
import EncryptionKeys from '../../models/encryptionKeys.type'
import AccountEncryption from '../encryption/accountEncryption'
import type IAccountEncryption from '../../abstractions/encryption/accountEncryption.interface'
import AccountRepository from '../../../data/implementation/repository/accountRepository'
import type IAccountRepository from '../../../data/abstraction/repository/accountRepository.interface'
import { EncryptonError } from '../encryption/encryption'
import ServiceRepository from '../../../data/implementation/repository/serviceRepository'
import type IServiceRepository from '../../../data/abstraction/repository/serviceRepository.interface'
import { writeFile } from 'fs/promises'

@injectable()
class DataManagementService implements IDataManagementService {
	constructor(
		@inject(AccountEncryption) private readonly encryptor: IAccountEncryption,
		@inject(AccountRepository) private readonly accountRepo: IAccountRepository,
		@inject(ServiceRepository) private readonly serviceRepo: IServiceRepository
	) {}

	public async exportAndDecryptData(
		keys: EncryptionKeys,
		fullPath: string
	): Promise<string | void> {
		const data = await this.serviceRepo.getAll()

		for (let i = 0; i < data.length; i++) {
			await this.encryptor.decryptMultipleAccounts(data[i].accounts, keys)
		}

		await writeFile(fullPath, JSON.stringify(data))

		return
	}

	public async tryDecription(keys: EncryptionKeys): Promise<string | void> {
		const data = await this.accountRepo.getFirst()

		if (!data) {
			return 'No data found'
		}

		try {
			await this.encryptor.decryptSingleAccount(data, keys)
		} catch (error) {
			if (error instanceof EncryptonError) {
				return error.message
			} else {
				throw error
			}
		}
	}
}

export default DataManagementService
