import { DependencyContainer, container } from 'tsyringe'
import IFileStorageFactory from './data/abstraction/factories/fileStorageFactory.interface'
import FileStorageFactory from './data/implementation/factories/fileStorageFactory'
import IPasswordStorage from './data/abstraction/fileStorage/passwordStorage.interface'
import PasswordManager from './data/implementation/managers/passwordManager'
import IAccountRepository from './data/abstraction/repository/accountRepository.interface'
import AccountRepository from './data/implementation/repository/accountRepository'
import IKeyManager from './data/abstraction/managers/keyManager.interface'
import KeyManager from './data/implementation/managers/keyManager'
import IServiceRepository from './data/abstraction/repository/serviceRepository.interface'
import ServiceRepository from './data/implementation/repository/serviceRepository'
import IEncryption from './application/abstractions/encryption/encryption.interface'
import Encrypton from './application/implementations/encryption/encryption'
import IAccountEncryption from './application/abstractions/encryption/accountEncryption.interface'
import AccountEncryption from './application/implementations/encryption/accountEncryption'
import IAccountCollectionService from './application/abstractions/services/accountCollectionService.interface'
import AccountCollectionService from './application/implementations/services/accountCollectionService'
import IAccountInfoService from './application/abstractions/services/accountInfoService.interface'
import AccountInfoService from './application/implementations/services/accountInfoService'
import IStartupManager from './application/abstractions/startup/startupManager.interface'
import StartupManager from './application/implementations/startup/startupManager'
import IPasswordStorageObserver from './data/abstraction/fileStorage/passwordStorageObserver.interface'
import PasswordStorageObserver from './application/implementations/passwordStorageObserver'
import HelperService from './application/implementations/services/helperService'
import IHelperService from './application/abstractions/services/helperService.interface'

export function getDiContainer(): DependencyContainer {
	// data layer
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

	// application layer
	container.register<IEncryption>(Encrypton, {
		useClass: Encrypton
	})

	container.register<IAccountEncryption>(AccountEncryption, {
		useClass: AccountEncryption
	})

	container.register<IAccountCollectionService>(AccountCollectionService, {
		useClass: AccountCollectionService
	})

	container.register<IAccountInfoService>(AccountInfoService, {
		useClass: AccountInfoService
	})

	container.register<IPasswordStorageObserver>(PasswordStorageObserver, {
		useClass: PasswordStorageObserver
	})

	container.register<IHelperService>(HelperService, {
		useClass: HelperService
	})

	container.register<IStartupManager>(StartupManager, {
		useClass: StartupManager
	})

	return container
}
