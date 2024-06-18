import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import ServiceInfo from '../../models/ServiceInfo.type'
import PasswordStorage from '../fileStorage/passwordStorage'

class FileStorageFactory implements IFileStorageFactory {
	public createPasswordFileStorage(): IFileDataStorage<ServiceInfo[]> {
		return new PasswordStorage(process.cwd(), 'password')
	}
}

export default FileStorageFactory
