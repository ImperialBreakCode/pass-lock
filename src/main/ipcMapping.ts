import { IpcMain } from 'electron'
import { DependencyContainer } from 'tsyringe'
import HelperService from './application/implementations/services/helperService'

export function mapToIpc(ipcMain: IpcMain, container: DependencyContainer) {
	ipcMain.handle('checkForInitialState', async (): Promise<boolean> => {
		const helperService = container.resolve(HelperService)

		return await helperService.checkForInitialState()
	})
}
