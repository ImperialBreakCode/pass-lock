import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IEncryptionKeysStorage from '../../abstraction/fileStorage/encryptionKeysStorage.interface'
import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import EncryptionKeysStorage from '../fileStorage/encryptionKeysStorage'
import PasswordStorage from '../fileStorage/passwordStorage'

class FileStorageFactory implements IFileStorageFactory {
	public createEncryptionKeysFileStorage(): IEncryptionKeysStorage {
		return new EncryptionKeysStorage(process.cwd(), 'encryptionKeys')
	}
	public createPasswordFileStorage(): IPasswordStorage {
		return new PasswordStorage(process.cwd(), 'password')
	}
}

export default FileStorageFactory
