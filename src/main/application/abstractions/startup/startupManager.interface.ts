import IPasswordStorageObserver from '../../../data/abstraction/fileStorage/passwordStorageObserver.interface'

interface IStartupManager {
	ensureStorages(): Promise<void>
	connectPasswordStorageObserver(observer: IPasswordStorageObserver): void
}

export default IStartupManager
