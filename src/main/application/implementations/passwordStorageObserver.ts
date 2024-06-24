import IPasswordStorageObserver from '../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import IKeyManager from '../../data/abstraction/managers/keyManager.interface'

class PasswordStorageObserver implements IPasswordStorageObserver {
	constructor(private readonly keyManager: IKeyManager) {}

	passwordStorageCreated(): Promise<void> {
		throw new Error('Method not implemented.')
	}
}

export default PasswordStorageObserver
