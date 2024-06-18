import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import ServiceInfo from '../../models/ServiceInfo.type'
import EncyrptionKeys from '../../models/encryptionKeys.type'
import EncryptionKeysStorage from '../fileStorage/encryptionKeysStorage'
import PasswordStorage from '../fileStorage/passwordStorage'

class FileStorageFactory implements IFileStorageFactory {
	public createEncryptionKeysFileStorage(): IFileDataStorage<EncyrptionKeys> {
		return new EncryptionKeysStorage(process.cwd(), 'encryptionKeys')
	}
	public createPasswordFileStorage(): IFileDataStorage<ServiceInfo[]> {
		return new PasswordStorage(process.cwd(), 'password')
	}
}

export default FileStorageFactory
