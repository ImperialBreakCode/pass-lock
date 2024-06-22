interface IEncryption {
	encrypt: (data: string, key: string, hmacSecret: string) => string
	decrypt: (data: string, key: string, hmacSecret: string) => string
	generateKey: () => string
	generateHmacSecret: () => string
}

export default IEncryption
