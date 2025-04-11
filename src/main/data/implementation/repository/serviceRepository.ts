import { inject, injectable } from 'tsyringe'
import IServiceRepository from '../../abstraction/repository/serviceRepository.interface'
import ServiceInfo from '../../models/serviceInfo.type'
import FileStorageFactory from '../factories/fileStorageFactory'
import type IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'

@injectable()
class ServiceRepository implements IServiceRepository {
	private readonly passwordStorage: IPasswordStorage

	constructor(@inject(FileStorageFactory) storageFactory: IFileStorageFactory) {
		this.passwordStorage = storageFactory.createPasswordFileStorage()
	}

	public async getAll(): Promise<ServiceInfo[]> {
		return await this.passwordStorage.readData()
	}

	public async getOne(serviceId: string): Promise<ServiceInfo | undefined> {
		const data = await this.passwordStorage.readData()

		return data.find((service) => service.id === serviceId)
	}

	public async insertOne(service: ServiceInfo): Promise<boolean> {
		const data = await this.passwordStorage.readData()

		if (data.some((s) => s.id === service.id || s.name === service.name)) {
			return false
		}

		data.push(service)
		this.passwordStorage.save(data)

		return true
	}

	public async insertMany(services: ServiceInfo[]): Promise<boolean> {
		const data = await this.passwordStorage.readData()
		const existingIds = new Set(data.map((s) => s.id))

		if (services.some((s) => existingIds.has(s.id))) {
			return false
		}

		data.push(...services)
		this.passwordStorage.save(data)

		return true
	}

	public async updateOne(service: ServiceInfo): Promise<boolean> {
		const data = await this.passwordStorage.readData()

		const serviceIndex = data.findIndex((s) => s.id === service.id)

		if (serviceIndex === -1) {
			return false
		}

		data[serviceIndex] = service
		this.passwordStorage.save(data)

		return true
	}

	public async deleteOne(serviceId: string): Promise<boolean> {
		const data = await this.passwordStorage.readData()

		const serviceIndex = data.findIndex((s) => s.id === serviceId)

		if (serviceIndex === -1) {
			return false
		}

		data.splice(serviceIndex, 1)
		this.passwordStorage.save(data)

		return true
	}
}

export default ServiceRepository
