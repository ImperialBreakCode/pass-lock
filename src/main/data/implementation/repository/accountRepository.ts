import IFileStorageFactory from '../../abstraction/factories/fileStorageFactory.interface'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import IAccountRepository from '../../abstraction/repository/accountRepository.interface'
import AccountInfo from '../../models/AccountInfo.type'
import ServiceInfo from '../../models/ServiceInfo.type'

class AccountRepository implements IAccountRepository {
	private readonly passwordStorage: IFileDataStorage<ServiceInfo[]>

	constructor(storageFactory: IFileStorageFactory) {
		this.passwordStorage = storageFactory.createPasswordFileStorage()
	}

	public async getAllInService(serviceId: string): Promise<AccountInfo[]> {
		const data = await this.passwordStorage.readData()
		const services = data.filter((service) => service.id === serviceId)

		if (services.length !== 0) {
			return services[0].accounts
		}

		return []
	}

	public async getOne(serviceId: string, accountId: string): Promise<AccountInfo | undefined> {
		const data = await this.passwordStorage.readData()
		const service = data.find((service) => service.id === serviceId)

		if (!service) {
			return service
		}

		return service.accounts.find((account) => account.id === accountId)
	}

	public async insertOne(serviceId: string, account: AccountInfo): Promise<boolean> {
		const data = await this.passwordStorage.readData()
		const serviceIndex = data.findIndex((service) => service.id === serviceId)

		if (serviceIndex === -1) {
			return false
		}

		if (data[serviceIndex].accounts.some((a) => a.id === account.id)) {
			return false
		}

		data[serviceIndex].accounts.push(account)
		this.passwordStorage.save(data)

		return true
	}

	public async updateOne(serviceId: string, account: AccountInfo): Promise<boolean> {
		const data = await this.passwordStorage.readData()
		const serviceIndex = data.findIndex((service) => service.id === serviceId)

		if (serviceIndex === -1) {
			return false
		}

		const accountIndex = data[serviceIndex].accounts.findIndex((a) => a.id === account.id)

		if (accountIndex === -1) {
			return false
		}

		data[serviceIndex].accounts[accountIndex] = account
		this.passwordStorage.save(data)

		return true
	}

	public async deleteOne(serviceId: string, accountId: string): Promise<boolean> {
		const data = await this.passwordStorage.readData()
		const serviceIndex = data.findIndex((service) => service.id === serviceId)

		if (serviceIndex === -1) {
			return false
		}

		const accountIndex = data[serviceIndex].accounts.findIndex((a) => a.id === accountId)

		if (accountIndex === -1) {
			return false
		}

		data[serviceIndex].accounts.splice(accountIndex, 1)
		this.passwordStorage.save(data)

		return true
	}
}

export default AccountRepository
