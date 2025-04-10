interface IEncryption {
	setKeys: (key: string, hmacSecret: string) => void
	encrypt: (data: string) => string
	decrypt: (data: string) => string
	generateFinalKey: (key: string, saltBuffer: Buffer) => Buffer
}

export default IEncryption
