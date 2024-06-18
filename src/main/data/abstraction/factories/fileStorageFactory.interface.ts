import ServiceInfo from '../../models/ServiceInfo.type'
import IFileDataStorage from '../fileStorage/fileDataStorage.interface'

interface IFileStorageFactory {
	createPasswordFileStorage: () => IFileDataStorage<ServiceInfo[]>
}

export default IFileStorageFactory
