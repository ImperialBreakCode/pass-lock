//import { app } from 'electron'
import path from 'path'

export const appPaths = {
	mainDataPath: path.join(process.cwd(), '..'),
	passwordStorage: 'passLockStorage',
	keysStorage: 'keys'
}
