import IPasswordStorage from '../fileStorage/passwordStorage.interface'

interface IFileStorageFactory {
	createPasswordFileStorage: () => IPasswordStorage
}

export default IFileStorageFactory
