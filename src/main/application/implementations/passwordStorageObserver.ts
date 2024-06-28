import { inject, injectable } from 'tsyringe'
import type IModelFactory from '../../data/abstraction/factories/modelFactory.interface'
import type IPasswordStorageObserver from '../../data/abstraction/fileStorage/passwordStorageObserver.interface'
import type IKeyManager from '../../data/abstraction/managers/keyManager.interface'
import type IEncryption from '../abstractions/encryption/encryption.interface'
import KeyManager from '../../data/implementation/managers/keyManager'
import Encrypton from './encryption/encryption'
import ModelFactory from '../../data/implementation/factories/modelFactory'

@injectable()
class PasswordStorageObserver implements IPasswordStorageObserver {
	constructor(
		@inject(KeyManager) private readonly keyManager: IKeyManager,
		@inject(Encrypton) private readonly encyrptor: IEncryption,
		@inject(ModelFactory) private readonly modelFactory: IModelFactory
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
