import { existsSync } from 'fs'
import IEncryptionKeysStorage from '../../abstraction/fileStorage/encryptionKeysStorage.interface'
import EncyrptionKeys from '../../models/encryptionKeys.type'
import JsonFileStorage from './jsonFileStorage'

class EncryptionKeysStorage
	extends JsonFileStorage<EncyrptionKeys>
	implements IEncryptionKeysStorage
{
	protected initialData: EncyrptionKeys = {
		hmacKey: '',
		encryptionKey: ''
	}

	public async ensureDirectory(): Promise<boolean> {
		return await this.ensureDir()
	}

	public checkIfFileExists(): boolean {
		return existsSync(this.fullFilePathAndName)
	}

	public override async save(data: EncyrptionKeys): Promise<void> {
		await this.ensureStorage()
		return await super.save(data)
	}

	public override async readData(): Promise<EncyrptionKeys> {
		await this.ensureDir()
		return await super.readData()
	}
}

export default EncryptionKeysStorage
