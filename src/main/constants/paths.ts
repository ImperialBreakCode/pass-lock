//import { app } from 'electron'
import path from 'path'

export const appPaths = {
	mainDataPath: path.join(process.cwd(), '..', 'passlocktestdata'),
	passwordStorage: 'passLockStorage',
	keysStorage: 'keys'
}
