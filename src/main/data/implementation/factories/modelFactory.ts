import IModelFactory from '../../abstraction/factories/modelFactory.interface'
import AccountInfo from '../../models/accountInfo.type'
import EncyrptionKeys from '../../models/encryptionKeys.type'
import ServiceInfo from '../../models/serviceInfo.type'

class ModelFactory implements IModelFactory {
	public createAccount(username: string, password: string, moreInfo: string): AccountInfo {
		return {
			id: crypto.randomUUID(),
			username,
			password,
			moreInfo
		}
	}

	public createService(serviceName: string): ServiceInfo {
		return {
			id: crypto.randomUUID(),
			name: serviceName,
			accounts: []
		}
	}

	public createKeys(key: string, hmacSecret: string): EncyrptionKeys {
		return {
			encryptionKey: key,
			hmacKey: hmacSecret
		}
	}
}

export default ModelFactory
