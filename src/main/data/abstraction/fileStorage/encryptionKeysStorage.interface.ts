import EncyrptionKeys from '../../models/encryptionKeys.type'
import IFileDataStorage from './fileDataStorage.interface'

interface IEncryptionKeysStorage extends IFileDataStorage<EncyrptionKeys> {
	checkIfFileExists(): boolean
	ensureDirectory(): Promise<boolean>
}

export default IEncryptionKeysStorage
