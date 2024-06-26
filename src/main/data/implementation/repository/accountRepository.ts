import IAccountRepository from '../../abstraction/repository/accountRepository.interface'
import AccountInfo from '../../models/accountInfo.type'
import type IPasswordStorage from '../../abstraction/fileStorage/passwordStorage.interface'
import { autoInjectable, inject } from 'tsyringe'
import PasswordManager from '../managers/passwordManager'

@autoInjectable()
class AccountRepository implements IAccountRepository {
	constructor(@inject(PasswordManager) private readonly passwordStorage: IPasswordStorage) {}

	public async getFirst(): Promise<AccountInfo | undefined> {
		const data = await this.passwordStorage.readData()

		if (data.length > 0 && data[0].accounts.length > 0) {
			return data[0].accounts[0]
		}

		return undefined
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
