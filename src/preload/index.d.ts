import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			getPaths: () => { passwordStorage: string; keysStorage: string }
			getAppVersion: () => string
			checkForKeys: () => boolean
			getAllServices: () => Promise<ServiceInfo[] | string>
			getService: (serviceId: string) => Promise<ServiceInfo | undefined | string>
			insertService: (serviceName: string) => Promise<string | void>
			updateService: (serviceId: string, serviceName: string) => Promise<string | void>
			deleteService: (serviceId: string) => Promise<string | void>
			addAccountInfo: (newAccount: InsertAccount) => Promise<string | void>
			updateAccountInfo: (account: AccountInfo, serviceId: string) => Promise<string | void>
			deleteAccountInfo: (accountId: string, serviceId: string) => Promise<string | void>
			onUpdateAvailable: (callback: () => void) => void
			onUpdateDownloading: (callback: (progressPercent: number) => void) => void
			onUpdateDownloaded: (callback: () => void) => void
			onUpdateError: (callback: () => void) => void
			installUpdate: () => void
			openKeysFolder: () => void
			openStorageFolder: () => void
		}
	}
}
