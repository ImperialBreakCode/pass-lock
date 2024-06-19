interface IPasswordStorageObserver {
	passwordStorageCreated(): Promise<void>
}

export default IPasswordStorageObserver
