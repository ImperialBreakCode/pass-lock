import IEncryption from '../../abstractions/encryption/encryption.interface'
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto'

class Encrypton implements IEncryption {
	private key: string
	private hmacSecret: string

	constructor() {
		this.key = ''
		this.hmacSecret = ''
	}

	public setKeys(key: string, hmacSecret: string): void {
		this.key = key
		this.hmacSecret = hmacSecret
	}

	public generateKey(): string {
		return randomBytes(32).toString('hex')
	}

	public generateHmacSecret(): string {
		return randomBytes(64).toString('hex')
	}

	public encrypt(data: string): string {
		const iv = randomBytes(16)
		const chipher = createCipheriv('aes-256-cbc', this.key, iv)

		let encrypted = chipher.update(data, 'utf-8', 'hex')
		encrypted += chipher.final('hex')

		const hmac = createHmac('sha256', this.hmacSecret)
		const hmacDigest = hmac.update(iv + encrypted).digest('hex')

		const final = [iv, encrypted, hmacDigest].join('.')

		return final
	}

	public decrypt(data: string): string {
		const dataArr = data.split('.')

		if (data.length !== 3) {
			throw new Error('Invalid encrypted data')
		}

		const [iv, encrypted, hmacDigest] = dataArr

		const hmac = createHmac('sha256', this.hmacSecret)
		const hmacDigestVerify = hmac.update(iv + encrypted).digest('hex')

		if (hmacDigest !== hmacDigestVerify) {
			throw new Error('Data verification failed')
		}

		const dechipher = createDecipheriv('aes-256-cbc', this.key, iv)
		let decrypted = dechipher.update(encrypted, 'hex', 'utf-8')
		decrypted = dechipher.final('utf-8')

		return decrypted
	}
}

export default Encrypton
