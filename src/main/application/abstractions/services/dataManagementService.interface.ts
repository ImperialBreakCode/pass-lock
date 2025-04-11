import EncryptionKeys from '../../models/encryptionKeys.type'

interface IDataManagementService {
	tryDecription: (keys: EncryptionKeys) => Promise<string | void>
	exportAndDecryptData: (keys: EncryptionKeys, fullPath: string) => Promise<string | void>
}

export default IDataManagementService
