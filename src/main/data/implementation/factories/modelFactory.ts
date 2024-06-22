import IModelFactory from '../../abstraction/factories/modelFactory.interface'
import AccountInfo from '../../models/accountInfo.type'
import ServiceInfo from '../../models/ServiceInfo.type'

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
}

export default ModelFactory
