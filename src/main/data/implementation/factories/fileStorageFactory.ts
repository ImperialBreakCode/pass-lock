import { injectable } from 'tsyringe'
import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IEncryptionKeysStorage from '../../abstraction/fileStorage/encryptionKeysStorage.interface'
import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import EncryptionKeysStorage from '../fileStorage/encryptionKeysStorage'
import PasswordStorage from '../fileStorage/passwordStorage'

@injectable()
class FileStorageFactory implements IFileStorageFactory {
	private readonly storagePath: string = process.cwd()

	public createEncryptionKeysFileStorage(): IEncryptionKeysStorage {
		return new EncryptionKeysStorage(this.storagePath, 'encryptionKeys')
	}
	public createPasswordFileStorage(): IPasswordStorage {
		return new PasswordStorage(this.storagePath, 'password')
	}
}

export default FileStorageFactory
