import { mkdir, readFile, writeFile } from 'fs/promises'
import IFileDataStorage from '../../abstraction/fileStorage/fileDataStorage.interface'
import path from 'path'
import { existsSync } from 'fs'

class JsonFileStorage<TData> implements IFileDataStorage<TData> {
	private readonly fileName: string = 'data.json'

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
		await this.ensureStorage()

		const smth = await readFile(this.fullFilePathAndName, 'utf8')

		return JSON.parse(smth) as TData
	}

	public async save(data: TData): Promise<void> {
		await this.ensureStorage()
		return await writeFile(this.fullFilePathAndName, JSON.stringify(data))
	}

	public async ensureStorage(): Promise<void> {
		if (!existsSync(this.fullPath)) {
			await mkdir(this.fullPath)
		}

		if (!existsSync(this.fullFilePathAndName)) {
			await writeFile(this.fullFilePathAndName, JSON.stringify([]))
		}
	}
}

export default JsonFileStorage
