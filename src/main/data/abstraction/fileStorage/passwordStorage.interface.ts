import ServiceInfo from '../../models/serviceInfo.type'
import IFileDataStorage from './fileDataStorage.interface'
import IPasswordStorageObserver from './passwordStorageObserver.interface'

interface IPasswordStorage extends IFileDataStorage<ServiceInfo[]> {
	attach(observer: IPasswordStorageObserver): void
}

export default IPasswordStorage
