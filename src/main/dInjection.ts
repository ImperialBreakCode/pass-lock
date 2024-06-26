import { DependencyContainer, container } from 'tsyringe'
import IFileStorageFactory from './data/abstraction/factories/fileStorageFactory.interface'
import FileStorageFactory from './data/implementation/factories/fileStorageFactory'
import IPasswordStorage from './data/abstraction/fileStorage/passwordStorage.interface'
import PasswordManager from './data/implementation/managers/passwordManager'
import IAccountRepository from './data/abstraction/repository/accountRepository.interface'
import AccountRepository from './data/implementation/repository/accountRepository'
import IKeyManager from './data/abstraction/managers/keyManager.interface'
import KeyManager from './data/implementation/managers/keyManager'
import 'reflect-metadata'
import IServiceRepository from './data/abstraction/repository/serviceRepository.interface'
import ServiceRepository from './data/implementation/repository/serviceRepository'

export function getDiContainer(): DependencyContainer {
	container.register<IFileStorageFactory>(FileStorageFactory, {
		useClass: FileStorageFactory
	})

	container.register<IPasswordStorage>(PasswordManager, {
		useClass: PasswordManager
	})

	container.register<IKeyManager>(KeyManager, {
		useClass: KeyManager
	})

	container.register<IAccountRepository>(AccountRepository, {
		useClass: AccountRepository
	})

	container.register<IServiceRepository>(ServiceRepository, {
		useClass: ServiceRepository
	})

	return container
}
