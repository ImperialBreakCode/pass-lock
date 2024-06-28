import ServiceInfo from '../../models/serviceInfo.type'

interface IServiceRepository {
	getAll: () => Promise<ServiceInfo[]>
	getOne: (serviceId: string) => Promise<ServiceInfo | undefined>
	insertOne: (service: ServiceInfo) => Promise<boolean>
	updateOne: (service: ServiceInfo) => Promise<boolean>
	deleteOne: (serviceId: string) => Promise<boolean>
}

export default IServiceRepository
