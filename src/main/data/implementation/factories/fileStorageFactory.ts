import { injectable } from 'tsyringe'
import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IEncryptionKeysStorage from '../../abstraction/fileStorage/encryptionKeysStorage.interface'
import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import EncryptionKeysStorage from '../fileStorage/encryptionKeysStorage'
import PasswordStorage from '../fileStorage/passwordStorage'
import { appPaths } from '../../../constants/paths'

@injectable()
class FileStorageFactory implements IFileStorageFactory {
	private readonly storagePath: string = appPaths.mainDataPath

	public createEncryptionKeysFileStorage(): IEncryptionKeysStorage {
		return new EncryptionKeysStorage(this.storagePath, appPaths.keysStorage)
	}
	public createPasswordFileStorage(): IPasswordStorage {
		return new PasswordStorage(this.storagePath, appPaths.passwordStorage)
	}
}

export default FileStorageFactory
