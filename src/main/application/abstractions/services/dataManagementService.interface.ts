import EncryptionKeys from '../../models/encryptionKeys.type'

interface IDataManagementService {
	tryDecription: (keys: EncryptionKeys) => Promise<string | void>
}

export default IDataManagementService
