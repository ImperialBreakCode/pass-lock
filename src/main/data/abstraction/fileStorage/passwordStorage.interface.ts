import ServiceInfo from '../../models/serviceInfo.type'
import IFileDataStorage from './fileDataStorage.interface'

interface IPasswordStorage extends IFileDataStorage<ServiceInfo[]> {}

export default IPasswordStorage
