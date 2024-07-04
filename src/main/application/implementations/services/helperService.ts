import { inject, injectable } from 'tsyringe'
import type IKeyManager from '../../../data/abstraction/managers/keyManager.interface'
import KeyManager from '../../../data/implementation/managers/keyManager'
import IHelperService from '../../abstractions/services/helperService.interface'

@injectable()
class HelperService implements IHelperService {
	constructor(@inject(KeyManager) private readonly keyManager: IKeyManager) {}

	public checkForKeys(): boolean {
		return this.keyManager.checkIfFileExists()
	}
}

export default HelperService
