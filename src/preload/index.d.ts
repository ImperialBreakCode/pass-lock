import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			getAppVersion: () => string
			checkForInitialState: () => Promise<boolean>
			checkForKeys: () => boolean
			getAllServices: () => Promise<ServiceInfo[] | string>
			getService: (serviceId: string) => Promise<ServiceInfo | undefined | string>
			insertService: (serviceName: string) => Promise<string | void>
			updateService: (serviceId: string, serviceName: string) => Promise<string | void>
			deleteService: (serviceId: string) => Promise<string | void>
			addAccountInfo: (newAccount: InsertAccount) => Promise<string | void>
			updateAccountInfo: (account: AccountInfo, serviceId: string) => Promise<string | void>
			deleteAccountInfo: (accountId: string, serviceId: string) => Promise<string | void>
		}
	}
}
