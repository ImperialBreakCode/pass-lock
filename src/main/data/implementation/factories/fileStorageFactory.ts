import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import ServiceInfo from '../../models/ServiceInfo.type'
import JsonFileStorage from '../fileStorage/jsonFileStorage'

class FileStorageFactory implements IFileStorageFactory {
	public createPasswordFileStorage(): IFileDataStorage<ServiceInfo[]> {
		return new JsonFileStorage<ServiceInfo[]>(process.cwd(), 'password')
	}
}

export default FileStorageFactory
