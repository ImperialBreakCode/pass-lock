import ServiceInfo from '../../models/serviceInfo.type'
import AccountInfo from '../../models/accountInfo.type'

interface IModelFactory {
	createAccount: (username: string, password: string, moreInfo: string) => AccountInfo
	createService: (serviceName: string) => ServiceInfo
}

export default IModelFactory
