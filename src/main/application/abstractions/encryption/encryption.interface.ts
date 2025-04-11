import EncryptionKeys from "../../models/encryptionKeys.type"

interface IEncryption {
	setKeys: (key: string, hmacSecret: string) => void
	encrypt: (data: string) => string
	decrypt: (data: string) => string
	generateFinalKey: (key: string, saltBuffer: Buffer) => Buffer
	deriveKeys: (masterPassword: string) => EncryptionKeys
}

export default IEncryption
