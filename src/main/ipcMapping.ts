import { IpcMain } from 'electron'
import { DependencyContainer } from 'tsyringe'
import HelperService from './application/implementations/services/helperService'
import AccountCollectionService from './application/implementations/services/accountCollectionService'
import ServiceInfo from './data/models/serviceInfo.type'

export function mapToIpc(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle('checkForInitialState', async (): Promise<boolean> => {
		const helperService = container.resolve(HelperService)

		return await helperService.checkForInitialState()
	})

	ipcMain.on('checkForKeys', (e) => {
		const helperService = container.resolve(HelperService)

		e.returnValue = helperService.checkForKeys()
	})

	ipcMain.handle('getAllServices', async (): Promise<ServiceInfo[] | string> => {
		const accCollectionService = container.resolve(AccountCollectionService)

		try {
			return await accCollectionService.getAll()
		} catch (error) {
			return (error as Error).message
		}
	})

	ipcMain.handle('addService', async (_, serviceName: string): Promise<string | void> => {
		const accCollectionService = container.resolve(AccountCollectionService)
		try {
			return await accCollectionService.insertOne(serviceName)
		} catch (error) {
			return (error as Error).message
		}
	})

	ipcMain.handle(
		'getService',
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
