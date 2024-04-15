import { promisify } from 'util';
import crypto from 'crypto';

const pbkdf2 = promisify(crypto.pbkdf2);

class Password {
	private static iterations = 100000;
	private static keyLength = 64;

	static async toHash(password: string) {
		const salt = crypto.randomBytes(16).toString('hex');
		const derivedKey = await pbkdf2(password, salt, this.iterations, this.keyLength, 'sha512');
		return `${derivedKey.toString('hex')}.${salt}`;
	}

	static async compare(storedPassword: string, suppliedPassword: string) {
		const [hashedPassword, salt] = storedPassword.split('.');
		const derivedKey = (await pbkdf2(suppliedPassword, salt, this.iterations, this.keyLength, 'sha512')).toString(
			'hex',
		);
		return (
			hashedPassword.length === derivedKey.length &&
			crypto.timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(derivedKey))
		);
	}
}

export default Password;
