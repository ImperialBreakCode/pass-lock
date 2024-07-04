import { app } from 'electron'
import path from 'path'

export const appPaths = {
	mainDataPath: path.join(app.getPath('userData'), '..'),
	passwordStorage: 'passLockStorage',
	keysStorage: 'keys'
}
