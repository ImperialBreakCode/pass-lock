import { app } from 'electron'
//import path from 'path'

export const appPaths = {
	mainDataPath: app.getPath('userData'),
	passwordStorage: 'passLockStorage',
	keysStorage: 'keys'
}
