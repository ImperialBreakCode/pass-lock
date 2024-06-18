import ServiceInfo from '../../models/ServiceInfo.type'
import EncyrptionKeys from '../../models/encryptionKeys.type'
import IFileDataStorage from '../fileStorage/fileDataStorage.interface'

interface IFileStorageFactory {
	createPasswordFileStorage: () => IFileDataStorage<ServiceInfo[]>
	createEncryptionKeysFileStorage: () => IFileDataStorage<EncyrptionKeys>
}

export default IFileStorageFactory
