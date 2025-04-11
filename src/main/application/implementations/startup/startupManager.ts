import { inject, injectable } from 'tsyringe'
import type IPasswordStorage from '../../../data/abstraction/fileStorage/passwordStorage.interface'
import FileStorageFactory from '../../../data/implementation/factories/fileStorageFactory'
import type IFileStorageFactory from '../../../data/abstraction/factories/fileStorageFactory.interface'
import IStartupManager from '../../abstractions/startup/startupManager.interface';

@injectable()
class StartupManager implements IStartupManager {
	
	private passwordStorage: IPasswordStorage;

	constructor(
		@inject(FileStorageFactory) storageFactory: IFileStorageFactory
	) {
		this.passwordStorage = storageFactory.createPasswordFileStorage();
	}

	public async init(): Promise<void> {
		await this.ensureStorages()
	}

	private async ensureStorages(): Promise<void> {
		this.passwordStorage.ensureStorage()
	}
}

export default StartupManager
