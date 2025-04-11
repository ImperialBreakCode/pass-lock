import { DependencyContainer, container } from 'tsyringe'
import IFileStorageFactory from './data/abstraction/factories/fileStorageFactory.interface'
import FileStorageFactory from './data/implementation/factories/fileStorageFactory'
import IAccountRepository from './data/abstraction/repository/accountRepository.interface'
import AccountRepository from './data/implementation/repository/accountRepository'
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
import IApplicationModelFactory from './application/abstractions/factories/applicationModelFactory.interface'
import ApplicationModelFactory from './application/implementations/factories/applicationModelFactory'

export function getDiContainer(): DependencyContainer {
	// data layer
	container.register<IFileStorageFactory>(FileStorageFactory, {
		useClass: FileStorageFactory
	})

	container.register<IAccountRepository>(AccountRepository, {
		useClass: AccountRepository
	})

	container.register<IServiceRepository>(ServiceRepository, {
		useClass: ServiceRepository
	})

	// application layer

	container.register<IApplicationModelFactory>(ApplicationModelFactory, {
		useClass: ApplicationModelFactory
	})

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

	container.register<IStartupManager>(StartupManager, {
		useClass: StartupManager
	})

	return container
}
