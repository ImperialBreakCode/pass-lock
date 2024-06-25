import IPasswordStorage from '../../../data/abstraction/fileStorage/passwordStorage.interface'
import IPasswordStorageObserver from '../../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import IKeyManager from '../../../data/abstraction/managers/keyManager.interface'
import IStartupManager from '../../abstractions/startup/startupManager.interface'

class StartupManager implements IStartupManager {
	constructor(
		private readonly passwordStorageObserver: IPasswordStorageObserver,
		private readonly passwordManager: IPasswordStorage,
		private readonly keyManager: IKeyManager
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
