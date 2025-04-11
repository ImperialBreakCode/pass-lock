import { injectable } from 'tsyringe'
import IApplicationModelFactory from '../../abstractions/factories/applicationModelFactory.interface'
import EncryptionKeys from '../../models/encryptionKeys.type'

@injectable()
class ApplicationModelFactory implements IApplicationModelFactory {
	public createEncryptionKeys(key: string, hmac: string): EncryptionKeys {
		return {
			key: key,
			hmac: hmac
		}
	}
}

export default ApplicationModelFactory
