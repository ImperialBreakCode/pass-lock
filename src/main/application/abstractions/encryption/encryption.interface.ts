interface IEncryption {
	setKeys: (key: string, hmacSecret: string) => void
	encrypt: (data: string) => string
	decrypt: (data: string) => string
	generateKey: () => string
	generateHmacSecret: () => string
}

export default IEncryption
