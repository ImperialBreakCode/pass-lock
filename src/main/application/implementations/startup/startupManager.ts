import { inject, injectable } from 'tsyringe'
import type IPasswordStorage from '../../../data/abstraction/fileStorage/passwordStorage.interface'
import type IPasswordStorageObserver from '../../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import type IKeyManager from '../../../data/abstraction/managers/keyManager.interface'
import IStartupManager from '../../abstractions/startup/startupManager.interface'
import PasswordStorageObserver from '../passwordStorageObserver'
import PasswordManager from '../../../data/implementation/managers/passwordManager'
import KeyManager from '../../../data/implementation/managers/keyManager'

@injectable()
class StartupManager implements IStartupManager {
	constructor(
		@inject(PasswordStorageObserver)
		private readonly passwordStorageObserver: IPasswordStorageObserver,
		@inject(PasswordManager) private readonly passwordManager: IPasswordStorage,
		@inject(KeyManager) private readonly keyManager: IKeyManager
	) {}

	public async init(): Promise<void> {
		this.connectPasswordStorageObserver()
		await this.ensureStorages()
	}

	private async ensureStorages(): Promise<void> {
		this.passwordManager.ensureStorage()
		this.keyManager.ensureDir()
	}

	private connectPasswordStorageObserver(): void {
		this.passwordManager.attach(this.passwordStorageObserver)
	}
}

export default StartupManager
