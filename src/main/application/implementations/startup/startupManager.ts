import IPasswordStorage from '../../../data/abstraction/fileStorage/passwordStorage.interface'
import IPasswordStorageObserver from '../../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import IStartupManager from '../../abstractions/startup/startupManager.interface'

class StartupManager implements IStartupManager {
	constructor(
		private readonly passwordStorageObserver: IPasswordStorageObserver,
		private readonly passwordManager: IPasswordStorage
	) {}

	public async ensureStorages(): Promise<void> {
		this.passwordManager.ensureStorage()
	}

	public connectPasswordStorageObserver(): void {
		this.passwordManager.attach(this.passwordStorageObserver)
	}
}

export default StartupManager
