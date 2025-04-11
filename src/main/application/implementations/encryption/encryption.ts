import IEncryption from '../../abstractions/encryption/encryption.interface'
import {
	createCipheriv,
	createDecipheriv,
	createHash,
	createHmac,
	pbkdf2Sync,
	randomBytes
} from 'crypto'
import { encryptionMessages } from '../../../constants/messages'
import { inject, injectable } from 'tsyringe'
import EncryptionKeys from '../../models/encryptionKeys.type'
import type IApplicationModelFactory from '../../abstractions/factories/applicationModelFactory.interface'
import ApplicationModelFactory from '../factories/applicationModelFactory'

export class EncryptonError extends Error {
	constructor(msg: string) {
		super(msg)

		Object.setPrototypeOf(this, EncryptonError.prototype)
	}
}

@injectable()
class Encrypton implements IEncryption {
	private readonly modelFactory: IApplicationModelFactory

	private readonly SALT_LENGTH = 16
	private readonly IV_LENGTH = 16
	private readonly KEY_LENGTH = 32
	private readonly ITERATIONS = 100_000
	private readonly DIGEST = 'sha256'

	private key: string
	private hmacSecret: string

	constructor(@inject(ApplicationModelFactory) modelFactory: IApplicationModelFactory) {
		this.modelFactory = modelFactory
		this.key = ''
		this.hmacSecret = ''
	}

	public deriveKeys(masterPassword: string): EncryptionKeys {
		const passwordBuffer = Buffer.from(masterPassword, 'utf8')
		const salt = createHash('sha256').update(masterPassword).digest()

		const derived = pbkdf2Sync(passwordBuffer, salt, 150_000, 64, 'sha512')
		const key = derived.subarray(0, 32).toString('base64')
		const hmacSecret = derived.subarray(32, 64).toString('base64')

		return this.modelFactory.createEncryptionKeys(key, hmacSecret)
	}

	public generateFinalKey(key: string, saltBuffer: Buffer): Buffer {
		return pbkdf2Sync(key, saltBuffer, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST)
	}

	public setKeys(key: string, hmacSecret: string): void {
		this.key = key
		this.hmacSecret = hmacSecret
	}

	public encrypt(data: string): string {
		const salt = randomBytes(this.SALT_LENGTH)
		const hmacSalt = randomBytes(this.SALT_LENGTH)
		const iv = randomBytes(this.IV_LENGTH)

		const keyBuffer = this.generateFinalKey(this.key, salt)
		const hmacKeyBuffer = this.generateFinalKey(this.hmacSecret, hmacSalt)

		const cipher = createCipheriv('aes-256-cbc', keyBuffer, iv)

		let encrypted = cipher.update(data, 'utf8', 'base64')
		encrypted += cipher.final('base64')

		const hmac = createHmac(this.DIGEST, hmacKeyBuffer)
		const hmacDigest = hmac.update(iv.toString('base64') + encrypted).digest()

		const final = Buffer.concat([
			salt,
			hmacSalt,
			iv,
			Buffer.from(encrypted, 'base64'),
			hmacDigest
		])

		return final.toString('base64')
	}

	public decrypt(data: string): string {
		const dataBuffer = Buffer.from(data, 'base64')

		const saltBuffer = dataBuffer.subarray(0, this.SALT_LENGTH)
		const hmacSaltBuffer = dataBuffer.subarray(this.SALT_LENGTH, this.SALT_LENGTH * 2)
		const ivBuffer = dataBuffer.subarray(
			this.SALT_LENGTH * 2,
			this.SALT_LENGTH * 2 + this.IV_LENGTH
		)
		const encryptedBuffer = dataBuffer.subarray(
			this.SALT_LENGTH * 2 + this.IV_LENGTH,
			dataBuffer.length - this.KEY_LENGTH
		)
		const hmacDigest = dataBuffer.subarray(
			dataBuffer.length - this.KEY_LENGTH,
			dataBuffer.length
		)

		const keyBuffer = this.generateFinalKey(this.key, saltBuffer)
		const hmacKeyBuffer = this.generateFinalKey(this.hmacSecret, hmacSaltBuffer)

		const hmac = createHmac(this.DIGEST, hmacKeyBuffer)
		const hmacDigestVerify = hmac
			.update(ivBuffer.toString('base64') + encryptedBuffer.toString('base64'))
			.digest()

		if (hmacDigest.toString('base64') !== hmacDigestVerify.toString('base64')) {
			throw new EncryptonError(encryptionMessages.dataVeryficationFailed)
		}

		const decipher = createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer)
		let decrypted = decipher.update(encryptedBuffer, undefined, 'utf8')
		decrypted += decipher.final('utf8')

		return decrypted
	}
}

export default Encrypton
