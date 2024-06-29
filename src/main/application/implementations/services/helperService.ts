import { inject, injectable } from 'tsyringe'
import type IKeyManager from '../../../data/abstraction/managers/keyManager.interface'
import KeyManager from '../../../data/implementation/managers/keyManager'
import type IServiceRepository from '../../../data/abstraction/repository/serviceRepository.interface'
import ServiceRepository from '../../../data/implementation/repository/serviceRepository'
import IHelperService from '../../abstractions/services/helperService.interface'

@injectable()
class HelperService implements IHelperService {
	constructor(
		@inject(KeyManager) private readonly keyManager: IKeyManager,
		@inject(ServiceRepository) private readonly serviceRepo: IServiceRepository
	) {}

	public checkForKeys(): boolean {
		return this.keyManager.checkIfFileExists()
	}

	public async checkForInitialState(): Promise<boolean> {
		const allData = await this.serviceRepo.getAll()

		return allData.length === 0 && this.keyManager.checkIfFileExists()
	}
}

export default HelperService
