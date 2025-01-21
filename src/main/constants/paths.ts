import { app } from 'electron'
import path from 'path'

export const appPaths = {
	mainDataPath: path.join(app.getAppPath(), 'storage'),
	passwordStorage: 'passLockStorage',
	keysStorage: 'keys'
}
