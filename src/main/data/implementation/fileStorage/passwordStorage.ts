import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import IPasswordStorageObserver from '../../abstraction/fileStorage/passwordStorageObserver.interface'
import ServiceInfo from '../../models/serviceInfo.type'
import JsonFileStorage from './jsonFileStorage'

class PasswordStorage extends JsonFileStorage<ServiceInfo[]> implements IPasswordStorage {
	private readonly observers: IPasswordStorageObserver[] = []
	protected initialData: ServiceInfo[] = []

	public attach(observer: IPasswordStorageObserver): void {
		this.observers.push(observer)
	}

	public override async save(data: ServiceInfo[]): Promise<void> {
		await this.ensureStorage()
		return await super.save(data)
	}

	public override async readData(): Promise<ServiceInfo[]> {
		await this.ensureStorage()
		return await super.readData()
	}

	public override async ensureStorage(): Promise<boolean> {
		const storageCreated = await super.ensureStorage()

		if (storageCreated) {
			await this.notifyStorageCreated()
		}

		return storageCreated
	}

	private async notifyStorageCreated(): Promise<void> {
		for (const observer of this.observers) {
			await observer.passwordStorageCreated()
		}
	}
}

export default PasswordStorage
