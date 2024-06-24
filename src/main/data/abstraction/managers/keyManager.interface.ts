import EncyrptionKeys from '../../models/encryptionKeys.type'

interface IKeyManager {
	getKeys(): Promise<EncyrptionKeys>
	saveKeys(keys: EncyrptionKeys): Promise<void>
	checkIfFileExists(): boolean
	ensureDir(): Promise<void>
}

export default IKeyManager
