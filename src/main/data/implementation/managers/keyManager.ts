import { inject, injectable, singleton } from 'tsyringe'
import type IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IEncryptionKeysStorage from '../../abstraction/fileStorage/encryptionKeysStorage.interface'
import IKeyManager from '../../abstraction/managers/keyManager.interface'
import EncyrptionKeys from '../../models/encryptionKeys.type'
import FileStorageFactory from '../factories/fileStorageFactory'

@injectable()
@singleton()
class KeyManager implements IKeyManager {
	private readonly keyStorage: IEncryptionKeysStorage

	constructor(@inject(FileStorageFactory) storageFactory: IFileStorageFactory) {
		this.keyStorage = storageFactory.createEncryptionKeysFileStorage()
	}

	public async ensureDir(): Promise<void> {
		await this.keyStorage.ensureDirectory()
	}

	public async getKeys(): Promise<EncyrptionKeys> {
		return await this.keyStorage.readData()
	}

	public async saveKeys(keys: EncyrptionKeys): Promise<void> {
		await this.keyStorage.save(keys)
	}

	public checkIfFileExists(): boolean {
		return this.keyStorage.checkIfFileExists()
	}
}

export default KeyManager
