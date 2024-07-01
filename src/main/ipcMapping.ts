import { IpcMain } from 'electron'
import { DependencyContainer } from 'tsyringe'
import HelperService from './application/implementations/services/helperService'
import AccountCollectionService from './application/implementations/services/accountCollectionService'
import ServiceInfo from './data/models/serviceInfo.type'
import AccountInfoService from './application/implementations/services/accountInfoService'
import { InsertAccount } from './application/abstractions/services/accountInfoService.interface'

export const ipcEventNames = {
	checkForInitialState: 'checkForInitialState',
	checkForKeys: 'checkForKeys',
	getAllServices: 'getAllServices',
	addService: 'addService',
	getService: 'getService',
	addAccountInfo: 'addAccountInfo'
}

export function mapToIpc(ipcMain: IpcMain, container: DependencyContainer) {
	mapHelperService(ipcMain, container)
	mapAccountCollection(ipcMain, container)
	mapAccountInfo(ipcMain, container)
}

function mapHelperService(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle(ipcEventNames.checkForInitialState, async (): Promise<boolean> => {
		const helperService = container.resolve(HelperService)

		return await helperService.checkForInitialState()
	})

	ipcMain.on(ipcEventNames.checkForKeys, (e) => {
		const helperService = container.resolve(HelperService)

		e.returnValue = helperService.checkForKeys()
	})
}

function mapAccountCollection(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle(ipcEventNames.getAllServices, async (): Promise<ServiceInfo[] | string> => {
		const accCollectionService = container.resolve(AccountCollectionService)

		try {
			return await accCollectionService.getAll()
		} catch (error) {
			return (error as Error).message
		}
	})

	ipcMain.handle(
		ipcEventNames.addService,
		async (_, serviceName: string): Promise<string | void> => {
			const accCollectionService = container.resolve(AccountCollectionService)
			try {
				return await accCollectionService.insertOne(serviceName)
			} catch (error) {
				return (error as Error).message
			}
		}
	)

	ipcMain.handle(
		ipcEventNames.getService,
		async (_, serviceId: string): Promise<ServiceInfo | undefined | string> => {
			const accCollectionService = container.resolve(AccountCollectionService)
			try {
				return await accCollectionService.getOne(serviceId)
			} catch (error) {
				return (error as Error).message
			}
		}
	)
}

function mapAccountInfo(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle(
		ipcEventNames.addAccountInfo,
		async (_, newAccount: InsertAccount): Promise<string | void> => {
			const accInfoService = container.resolve(AccountInfoService)

			try {
				return await accInfoService.insertOneAccount(newAccount)
			} catch (error) {
				return (error as Error).message
			}
		}
	)
}
