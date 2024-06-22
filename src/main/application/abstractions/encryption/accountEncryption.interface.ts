import AccountInfo from '../../../data/models/accountInfo.type'

interface IAccountEncryption {
	encryptSingleAccount: (account: AccountInfo) => Promise<void>
	decryptSingleAccount: (account: AccountInfo) => Promise<void>
	encyptMultipleAccounts: (accounts: AccountInfo[]) => Promise<void>
	decryptMultipleAccounts: (accounts: AccountInfo[]) => Promise<void>
}

export default IAccountEncryption
