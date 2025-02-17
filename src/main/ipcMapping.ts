import { BrowserWindow, IpcMain, app, dialog, shell } from 'electron'
import { DependencyContainer } from 'tsyringe'
import HelperService from './application/implementations/services/helperService'
import AccountCollectionService from './application/implementations/services/accountCollectionService'
import ServiceInfo from './data/models/serviceInfo.type'
import AccountInfoService from './application/implementations/services/accountInfoService'
import { InsertAccount } from './application/abstractions/services/accountInfoService.interface'
import AccountInfo from './data/models/accountInfo.type'
import { appPaths } from './constants/paths'
import path from 'path'
import { type AppUpdater } from 'electron-updater'

export function mapToIpc(ipcMain: IpcMain, container: DependencyContainer) {
	mapHelperService(ipcMain, container)
	mapAccountCollection(ipcMain, container)
	mapAccountInfo(ipcMain, container)
}

function mapHelperService(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.on('checkForKeys', (e) => {
		const helperService = container.resolve(HelperService)

		e.returnValue = helperService.checkForKeys()
	})

	ipcMain.on('getAppVersion', (e) => {
		e.returnValue = app.getVersion()
	})

	ipcMain.on('getPaths', (e) => {
		const passPath = path.join(appPaths.mainDataPath, appPaths.passwordStorage)
		const keysPath = path.join(appPaths.mainDataPath, appPaths.keysStorage)

		e.returnValue = {
			passwordStorage: passPath,
			keysStorage: keysPath
		}
	})

	ipcMain.on('open-keys-folder', () => {
		const keysPath = path.join(appPaths.mainDataPath, appPaths.keysStorage)

		shell.openPath(keysPath)
	})

	ipcMain.on('open-storage-folder', () => {
		const passPath = path.join(appPaths.mainDataPath, appPaths.passwordStorage)

		shell.openPath(passPath)
	})
}

function mapAccountCollection(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle('getAllServices', async (): Promise<ServiceInfo[] | string> => {
		const accCollectionService = container.resolve(AccountCollectionService)

		try {
			return await accCollectionService.getAll()
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

	ipcMain.handle('addService', async (_, serviceName: string): Promise<string | void> => {
		const accCollectionService = container.resolve(AccountCollectionService)
		try {
			return await accCollectionService.insertOne(serviceName)
		} catch (error) {
			return (error as Error).message
		}
	})

	ipcMain.handle(
		'updateService',
		async (_, serviceId: string, serviceName: string): Promise<string | void> => {
			const accCollectionService = container.resolve(AccountCollectionService)

			try {
				return await accCollectionService.updateOne(serviceId, serviceName)
			} catch (error) {
				return (error as Error).message
			}
		}
	)

	ipcMain.handle('deleteService', async (_, serviceId: string): Promise<string | void> => {
		const accCollectionService = container.resolve(AccountCollectionService)

		try {
			return await accCollectionService.deleteOne(serviceId)
		} catch (error) {
			return (error as Error).message
		}
	})
}

function mapAccountInfo(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle(
		'addAccountInfo',
		async (_, newAccount: InsertAccount): Promise<string | void> => {
			const accInfoService = container.resolve(AccountInfoService)

			try {
				return await accInfoService.insertOneAccount(newAccount)
			} catch (error) {
				return (error as Error).message
			}
		}
	)

	ipcMain.handle('updateAccountInfo', async (_, account: AccountInfo, serviceId: string) => {
		const accInfoService = container.resolve(AccountInfoService)

		try {
			return await accInfoService.updateOneAccount(account, serviceId)
		} catch (error) {
			return (error as Error).message
		}
	})

	ipcMain.handle(
		'deleteAccountInfo',
		async (_, accountId: string, serviceId: string): Promise<string | void> => {
			const accInfoService = container.resolve(AccountInfoService)

			try {
				return await accInfoService.deleteAccount(accountId, serviceId)
			} catch (error) {
				return (error as Error).message
			}
		}
	)
}

export function mapAutoUpdater(
	activeMainWindow: BrowserWindow,
	ipcMain: IpcMain,
	autoUpdater: AppUpdater
) {
	if (activeMainWindow) {
		autoUpdater.on('update-available', () => {
			activeMainWindow.webContents.send('update-available')
		})

		autoUpdater.on('download-progress', (progress) => {
			activeMainWindow.webContents.send('update-downloading', progress.percent)
		})

		autoUpdater.on('update-downloaded', () => {
			activeMainWindow.webContents.send('update-downloaded')
		})

		autoUpdater.on('error', (error) => {
			activeMainWindow.webContents.send('update-error')

			dialog.showErrorBox('Error while updating', error.message)
		})
	}

	ipcMain.on('install-update', () => {
		autoUpdater.downloadUpdate()
	})
}
