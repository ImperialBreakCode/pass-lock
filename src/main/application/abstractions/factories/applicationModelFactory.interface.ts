import EncryptionKeys from '../../models/encryptionKeys.type'

interface IApplicationModelFactory {
	createEncryptionKeys: (key: string, hmac: string) => EncryptionKeys
}

export default IApplicationModelFactory
