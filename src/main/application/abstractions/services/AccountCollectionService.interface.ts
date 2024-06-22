import ServiceInfo from '../../../data/models/serviceInfo.type'

interface IAccountCollectionService {
	getAll: () => Promise<ServiceInfo[]>
	getOne: (serviceId: string) => Promise<ServiceInfo | undefined>
	insertOne: (serviceName: string) => Promise<string | void>
	updateOne: (serviceId: string, serviceName: string) => Promise<string | void>
	deleteOne: (serviceId: string) => Promise<string | void>
}

export default IAccountCollectionService
