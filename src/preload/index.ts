import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ServiceInfo from '../main/data/models/serviceInfo.type'

const checkForInitialState = async (): Promise<boolean> => {
	return await ipcRenderer.invoke('checkForInitialState')
}

const checkForKeys = (): boolean => {
	return ipcRenderer.sendSync('checkForKeys')
}

const getAllServices = async (): Promise<ServiceInfo[] | string> => {
	return await ipcRenderer.invoke('getAllServices')
}

const insertService = async (serviceName: string): Promise<string | void> => {
	return await ipcRenderer.invoke('addService', serviceName)
}

// Custom APIs for renderer
const api = { checkForInitialState, checkForKeys, getAllServices, insertService }

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
