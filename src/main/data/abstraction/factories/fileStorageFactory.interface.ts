import IEncryptionKeysStorage from '../fileStorage/encryptionKeysStorage.interface'
import IPasswordStorage from '../fileStorage/passwordStorage.interface'

interface IFileStorageFactory {
	createPasswordFileStorage: () => IPasswordStorage
	createEncryptionKeysFileStorage: () => IEncryptionKeysStorage
}

export default IFileStorageFactory
