import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			checkForInitialState: () => Promise<boolean>
			checkForKeys: () => boolean
			getAllServices: () => Promise<ServiceInfo[] | string>
			insertService: (serviceName: string) => Promise<string | void>
			getService: (serviceId: string) => Promise<ServiceInfo | undefined | string>
			addAccountInfo: (newAccount: InsertAccount) => Promise<string | void>
		}
	}
}
