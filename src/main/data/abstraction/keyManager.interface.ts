import EncyrptionKeys from '../models/encryptionKeys.type'

interface IKeyManager {
	getKeys(): Promise<EncyrptionKeys>
	saveKeys(keys: EncyrptionKeys): Promise<void>
	checkIfFileExists(): boolean
}

export default IKeyManager
