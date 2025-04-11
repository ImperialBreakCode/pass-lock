import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ServiceInfo from '../main/data/models/serviceInfo.type'
import { InsertAccount } from '../main/application/abstractions/services/accountInfoService.interface'
import AccountInfo from '../main/data/models/accountInfo.type'
import EncryptionKeys from '../main/application/models/encryptionKeys.type'

const getAppVersion = (): string => {
	return ipcRenderer.sendSync('getAppVersion')
}

const getPaths = (): { passwordStorage: string; keysStorage: string } => {
	return ipcRenderer.sendSync('getPaths')
}

const deriveKeys = (masterPassword: string): EncryptionKeys => {
	return ipcRenderer.sendSync('getEncryptionKeys', masterPassword)
}

const getAllServices = async (): Promise<ServiceInfo[] | string> => {
	return await ipcRenderer.invoke('getAllServices')
}

const getService = async (
	serviceId: string,
	keys: EncryptionKeys | null
): Promise<ServiceInfo | undefined | string> => {
	return await ipcRenderer.invoke('getService', serviceId, keys)
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

const checkIfAnyAccountsExist = async (): Promise<boolean | string> => {
	return await ipcRenderer.invoke('checkIfAnyAccountsExist')
}

const addAccountInfo = async (
	newAccount: InsertAccount,
	keys: EncryptionKeys
): Promise<string | void> => {
	return await ipcRenderer.invoke('addAccountInfo', newAccount, keys)
}

const updateAccountInfo = async (
	account: AccountInfo,
	serviceId: string,
	keys: EncryptionKeys
): Promise<string | void> => {
	return await ipcRenderer.invoke('updateAccountInfo', account, serviceId, keys)
}

const deleteAccountInfo = async (accountId: string, serviceId: string): Promise<string | void> => {
	return await ipcRenderer.invoke('deleteAccountInfo', accountId, serviceId)
}

const tryDecription = async (keys: EncryptionKeys): Promise<string | void> => {
	return await ipcRenderer.invoke('tryDecryption', keys)
}

const installUpdate = (): void => {
	ipcRenderer.send('install-update')
}

const openStorageFolder = (): void => {
	ipcRenderer.send('open-storage-folder')
}

// Custom APIs for renderer
const api = {
	getPaths,
	getAppVersion,
	deriveKeys,
	getAllServices,
	getService,
	insertService,
	updateService,
	deleteService,
	checkIfAnyAccountsExist,
	addAccountInfo,
	updateAccountInfo,
	deleteAccountInfo,
	tryDecription,

	onUpdateAvailable: (callback: () => void) => ipcRenderer.on('update-available', callback),

	onUpdateDownloading: (callback: (progressPercent: number) => void) =>
		ipcRenderer.on('update-downloading', (_, progress) => callback(progress)),

	onUpdateDownloaded: (callback: () => void) => ipcRenderer.on('update-downloaded', callback),

	onUpdateError: (callback: () => void) => ipcRenderer.on('update-error', callback),

	installUpdate,
	openStorageFolder
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
