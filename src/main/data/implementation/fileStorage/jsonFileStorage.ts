import { mkdir, readFile, writeFile } from 'fs/promises'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import path from 'path'
import { existsSync } from 'fs'

abstract class JsonFileStorage<TData> implements IFileDataStorage<TData> {
	private readonly fileName: string = 'data.json'
	protected abstract readonly initialData: TData

	constructor(
		private readonly filePath: string,
		private readonly fileStorageName: string
	) {}

	protected get fullPath(): string {
		return path.join(this.filePath, this.fileStorageName)
	}

	protected get fullFilePathAndName(): string {
		return path.join(this.fullPath, this.fileName)
	}

	public async readData(): Promise<TData> {
		const smth = await readFile(this.fullFilePathAndName, 'utf8')
		return JSON.parse(smth) as TData
	}

	public async save(data: TData): Promise<void> {
		return await writeFile(this.fullFilePathAndName, JSON.stringify(data))
	}

	public async ensureStorage(): Promise<boolean> {
		const storageNotCreated = await this.ensureDir()
		//const storageNotCreated = !existsSync(this.fullFilePathAndName)

		if (storageNotCreated) {
			await writeFile(this.fullFilePathAndName, JSON.stringify(this.initialData))
		}

		return storageNotCreated
	}

	protected async ensureDir(): Promise<boolean> {
		const dirNotCreated = !existsSync(this.fullPath)

		if (dirNotCreated) {
			await mkdir(this.fullPath)
		}

		return dirNotCreated
	}
}

export default JsonFileStorage
