import ServiceInfo from '../../models/ServiceInfo.type'
import JsonFileStorage from './jsonFileStorage'

class PasswordStorage extends JsonFileStorage<ServiceInfo[]> {
	protected initialData: ServiceInfo[] = []
}

export default PasswordStorage
