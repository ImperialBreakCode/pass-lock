import IModelFactory from '../../data/abstraction/factories/modelFactory.interface'
import IPasswordStorageObserver from '../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import IKeyManager from '../../data/abstraction/managers/keyManager.interface'
import IEncryption from '../abstractions/encryption/encryption.interface'

class PasswordStorageObserver implements IPasswordStorageObserver {
	constructor(
		private readonly keyManager: IKeyManager,
		private readonly encyrptor: IEncryption,
		private readonly modelFactory: IModelFactory
	) {}

	public async passwordStorageCreated(): Promise<void> {
		const keys = this.modelFactory.createKeys(
			this.encyrptor.generateKey(),
			this.encyrptor.generateHmacSecret()
		)

		this.keyManager.saveKeys(keys)
	}
}

export default PasswordStorageObserver
