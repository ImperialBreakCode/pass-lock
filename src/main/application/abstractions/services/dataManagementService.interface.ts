import EncryptionKeys from '../../models/encryptionKeys.type'

interface IDataManagementService {
	tryDecription: (keys: EncryptionKeys) => Promise<string | void>
	exportAndDecryptData: (keys: EncryptionKeys, fullPath: string) => Promise<void>
	importAndEncryptData: (keys: EncryptionKeys, fullPath: string) => Promise<void>
}

export default IDataManagementService
