import { inject, injectable } from 'tsyringe'
import type IModelFactory from '../../../data/abstraction/factories/modelFactory.interface'
import type IServiceRepository from '../../../data/abstraction/repository/serviceRepository.interface'
import ServiceInfo from '../../../data/models/serviceInfo.type'
import type IAccountEncryption from '../../abstractions/encryption/accountEncryption.interface'
import IAccountCollectionService from '../../abstractions/services/accountCollectionService.interface'
import ServiceRepository from '../../../data/implementation/repository/serviceRepository'
import ModelFactory from '../../../data/implementation/factories/modelFactory'
import AccountEncryption from '../encryption/accountEncryption'

@injectable()
class AccountCollectionService implements IAccountCollectionService {
	constructor(
		@inject(ServiceRepository) private readonly accountCollectionRepo: IServiceRepository,
		@inject(ModelFactory) private readonly modelFactory: IModelFactory,
		@inject(AccountEncryption) private readonly accountEncryptor: IAccountEncryption
	) {}

	public async getAll(): Promise<ServiceInfo[]> {
		return await this.accountCollectionRepo.getAll()
	}

	public async getOne(serviceId: string): Promise<ServiceInfo | undefined> {
		const service = await this.accountCollectionRepo.getOne(serviceId)

		if (service) {
			await this.accountEncryptor.decryptMultipleAccounts(service.accounts)
		}

		return service
	}

	public async insertOne(serviceName: string): Promise<string | void> {
		const isInserted = await this.accountCollectionRepo.insertOne(
			this.modelFactory.createService(serviceName)
		)

		if (!isInserted) {
			return 'Service with the same name already exists.'
		}
	}

	public async updateOne(serviceId: string, serviceName: string): Promise<string | void> {
		const serviceInfo = await this.accountCollectionRepo.getOne(serviceId)

		if (!serviceInfo) {
			return 'Could not find service to update.'
		}

		serviceInfo.name = serviceName
		const isUpdated = await this.accountCollectionRepo.updateOne(serviceInfo)

		if (!isUpdated) {
			return 'Could not update service.'
		}
	}

	public async deleteOne(serviceId: string): Promise<string | void> {
		const isDeleted = await this.accountCollectionRepo.deleteOne(serviceId)

		if (!isDeleted) {
			return 'Could not delete service.'
		}
	}
}

export default AccountCollectionService
