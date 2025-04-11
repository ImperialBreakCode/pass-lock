import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			getPaths: () => { passwordStorage: string; keysStorage: string }
			getAppVersion: () => string
			deriveKeys: (masterPassword: string) => EncryptionKeys
			getAllServices: () => Promise<ServiceInfo[] | string>
			getService: (
				serviceId: string,
				keys: EncyptionKeys | null
			) => Promise<ServiceInfo | undefined | string>
			insertService: (serviceName: string) => Promise<string | void>
			updateService: (serviceId: string, serviceName: string) => Promise<string | void>
			deleteService: (serviceId: string) => Promise<string | void>
			checkIfAnyAccountsExist: () => Promise<boolean | string>
			addAccountInfo: (
				newAccount: InsertAccount,
				keys: EncryptionKeys
			) => Promise<string | void>
			updateAccountInfo: (
				account: AccountInfo,
				serviceId: string,
				keys: EncryptionKeys
			) => Promise<string | void>
			deleteAccountInfo: (accountId: string, serviceId: string) => Promise<string | void>
			tryDecription: (keys: EncryptionKeys) => Promise<string | void>
			exportData: (keys: EncryptionKeys) => Promise<string | void>
			importData: (keys: EncryptionKeys) => Promise<string | void>
			onUpdateAvailable: (callback: () => void) => void
			onUpdateDownloading: (callback: (progressPercent: number) => void) => void
			onUpdateDownloaded: (callback: () => void) => void
			onUpdateError: (callback: () => void) => void
			installUpdate: () => void
			openStorageFolder: () => void
		}
	}
}
