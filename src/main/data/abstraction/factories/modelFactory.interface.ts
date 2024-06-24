import ServiceInfo from '../../models/serviceInfo.type'
import AccountInfo from '../../models/accountInfo.type'
import EncyrptionKeys from '../../models/encryptionKeys.type'

interface IModelFactory {
	createAccount: (username: string, password: string, moreInfo: string) => AccountInfo
	createService: (serviceName: string) => ServiceInfo
	createKeys: (key: string, hmacSecret: string) => EncyrptionKeys
}

export default IModelFactory
