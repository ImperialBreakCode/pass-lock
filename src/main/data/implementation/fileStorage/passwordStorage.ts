import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import ServiceInfo from '../../models/serviceInfo.type'
import JsonFileStorage from './jsonFileStorage'

class PasswordStorage extends JsonFileStorage<ServiceInfo[]> implements IPasswordStorage {
	protected initialData: ServiceInfo[] = []

	public override async save(data: ServiceInfo[]): Promise<void> {
		await this.ensureStorage()
		return await super.save(data)
	}

	public override async readData(): Promise<ServiceInfo[]> {
		await this.ensureStorage()
		return await super.readData()
	}
}

export default PasswordStorage
