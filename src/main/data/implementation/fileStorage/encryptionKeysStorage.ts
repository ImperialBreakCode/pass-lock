import EncyrptionKeys from '../../models/encryptionKeys.type'
import JsonFileStorage from './jsonFileStorage'

class EncryptionKeysStorage extends JsonFileStorage<EncyrptionKeys> {
	protected initialData: EncyrptionKeys = {
		hmacKey: '',
		encryptionKey: ''
	}
}

export default EncryptionKeysStorage
