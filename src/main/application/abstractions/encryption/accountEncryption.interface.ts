import AccountInfo from '../../../data/models/accountInfo.type'
import EncryptionKeys from '../../models/encryptionKeys.type'

interface IAccountEncryption {
	encryptSingleAccount: (account: AccountInfo, keys: EncryptionKeys) => Promise<void>
	decryptSingleAccount: (account: AccountInfo, keys: EncryptionKeys) => Promise<void>
	encyptMultipleAccounts: (accounts: AccountInfo[], keys: EncryptionKeys) => Promise<void>
	decryptMultipleAccounts: (accounts: AccountInfo[], keys: EncryptionKeys) => Promise<void>
}

export default IAccountEncryption
