import IEncryption from '../../abstractions/encryption/encryption.interface'
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto'
import { encryptionMessages } from '../constants/messages'
import { injectable } from 'tsyringe'

export class EncryptonError extends Error {
	constructor(msg: string) {
		super(msg)

		Object.setPrototypeOf(this, EncryptonError.prototype)
	}
}

@injectable()
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
		return randomBytes(32).toString('hex').slice(0, 32)
	}

	public generateHmacSecret(): string {
		return randomBytes(64).toString('hex').slice(0, 64)
	}

	public encrypt(data: string): string {
		const iv = randomBytes(16)
		const chipher = createCipheriv('aes-256-cbc', this.key, iv)

		const ivString = iv.toString('hex')

		let encrypted = chipher.update(data, 'utf-8', 'hex')
		encrypted += chipher.final('hex')

		const hmac = createHmac('sha256', this.hmacSecret)
		const hmacDigest = hmac.update(ivString + encrypted).digest('hex')

		const final = [ivString, encrypted, hmacDigest].join('.')

		return final
	}

	public decrypt(data: string): string {
		const dataArr = data.split('.')

		if (dataArr.length !== 3) {
			throw new EncryptonError(encryptionMessages.invalidEncryptedData)
		}

		const [iv, encrypted, hmacDigest] = dataArr

		const hmac = createHmac('sha256', this.hmacSecret)
		const hmacDigestVerify = hmac.update(iv + encrypted).digest('hex')

		if (hmacDigest !== hmacDigestVerify) {
			throw new EncryptonError(encryptionMessages.dataVeryficationFailed)
		}

		const dechipher = createDecipheriv('aes-256-cbc', this.key, Buffer.from(iv, 'hex'))
		let decrypted = dechipher.update(encrypted, 'hex', 'utf-8')
		decrypted = dechipher.final('utf-8')

		return decrypted
	}
}

export default Encrypton
