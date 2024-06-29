interface IHelperService {
	checkForInitialState(): Promise<boolean>
	checkForKeys(): boolean
}

export default IHelperService
