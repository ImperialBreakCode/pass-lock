import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import IPasswordStorageObserver from '../../abstraction/fileStorage/passwordStorageObserver.interface'
import ServiceInfo from '../../models/serviceInfo.type'

class PasswordManager implements IPasswordStorage {
	private readonly passwordStorage: IPasswordStorage

	constructor(storageFactory: IFileStorageFactory) {
		this.passwordStorage = storageFactory.createPasswordFileStorage()
	}

	public attach(observer: IPasswordStorageObserver): void {
		this.passwordStorage.attach(observer)
	}

	public async readData(): Promise<ServiceInfo[]> {
		return await this.passwordStorage.readData()
	}

	public async save(data: ServiceInfo[]): Promise<void> {
		await this.passwordStorage.save(data)
	}

	public async ensureStorage(): Promise<boolean> {
		return await this.passwordStorage.ensureStorage()
	}
}

export default PasswordManager
