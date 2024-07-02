import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ServiceInfo from '../main/data/models/serviceInfo.type'
import { InsertAccount } from '../main/application/abstractions/services/accountInfoService.interface'
import AccountInfo from '../main/data/models/accountInfo.type'

const checkForInitialState = async (): Promise<boolean> => {
	return await ipcRenderer.invoke('checkForInitialState')
}

const checkForKeys = (): boolean => {
	return ipcRenderer.sendSync('checkForKeys')
}

const getAllServices = async (): Promise<ServiceInfo[] | string> => {
	return await ipcRenderer.invoke('getAllServices')
}

const getService = async (serviceId: string): Promise<ServiceInfo | undefined | string> => {
	return await ipcRenderer.invoke('getService', serviceId)
}

const insertService = async (serviceName: string): Promise<string | void> => {
	return await ipcRenderer.invoke('addService', serviceName)
}

const updateService = async (serviceId: string, serviceName: string): Promise<string | void> => {
	return await ipcRenderer.invoke('updateService', serviceId, serviceName)
}

const deleteService = async (serviceId: string): Promise<string | void> => {
	return await ipcRenderer.invoke('deleteService', serviceId)
}

const addAccountInfo = async (newAccount: InsertAccount): Promise<string | void> => {
	return await ipcRenderer.invoke('addAccountInfo', newAccount)
}

const updateAccountInfo = async (
	account: AccountInfo,
	serviceId: string
): Promise<string | void> => {
	return await ipcRenderer.invoke('updateAccountInfo', account, serviceId)
}

const deleteAccountInfo = async (accountId: string, serviceId: string): Promise<string | void> => {
	return await ipcRenderer.invoke('deleteAccountInfo', accountId, serviceId)
}

// Custom APIs for renderer
const api = {
	checkForInitialState,
	checkForKeys,
	getAllServices,
	getService,
	insertService,
	updateService,
	deleteService,
	addAccountInfo,
	updateAccountInfo,
	deleteAccountInfo
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
