interface IStartupManager {
	ensureStorages(): Promise<void>
	connectPasswordStorageObserver(): void
}

export default IStartupManager
