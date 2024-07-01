import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ServiceInfo from '../main/data/models/serviceInfo.type'
import { InsertAccount } from '../main/application/abstractions/services/accountInfoService.interface'
import { ipcEventNames } from '../main/ipcMapping'

const checkForInitialState = async (): Promise<boolean> => {
	return await ipcRenderer.invoke(ipcEventNames.checkForInitialState)
}

const checkForKeys = (): boolean => {
	return ipcRenderer.sendSync(ipcEventNames.checkForKeys)
}

const getAllServices = async (): Promise<ServiceInfo[] | string> => {
	return await ipcRenderer.invoke(ipcEventNames.getAllServices)
}

const insertService = async (serviceName: string): Promise<string | void> => {
	return await ipcRenderer.invoke(ipcEventNames.addService, serviceName)
}

const getService = async (serviceId: string): Promise<ServiceInfo | undefined | string> => {
	return await ipcRenderer.invoke(ipcEventNames.getService, serviceId)
}

const addAccountInfo = async (newAccount: InsertAccount): Promise<string | void> => {
	return await ipcRenderer.invoke(ipcEventNames.addAccountInfo, newAccount)
}

// Custom APIs for renderer
const api = {
	checkForInitialState,
	checkForKeys,
	getAllServices,
	insertService,
	getService,
	addAccountInfo
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error(error)
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI
	// @ts-ignore (define in dts)
	window.api = api
}
