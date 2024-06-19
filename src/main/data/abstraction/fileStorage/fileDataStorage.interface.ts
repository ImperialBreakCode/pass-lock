interface IFileDataStorage<TData> {
	readData: () => Promise<TData>
	save: (data: TData) => Promise<void>
	ensureStorage: () => Promise<boolean>
}
export default IFileDataStorage
