import { ApiError } from '@error/ApiError';
import { existsSync, readFileSync } from 'fs';
import type { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { join } from 'path';
import { ErrorCode } from '../enums/ErrorCode';
import { JWT_ACCESS_AUD, JWT_ISSUER } from './JWTConstants';

export class JWT {
	private static PRIVATE_KEY: string;
	private static PUBLIC_KEY: string;

	constructor() {
		if (!JWT.PRIVATE_KEY) {
			const privateKeyPath = process.env.PRIVATE_KEY_FILE || join('config', 'signing', 'signing.key');
			if (!existsSync(privateKeyPath)) {
				throw new Error(`Private key file not found at ${privateKeyPath}`);
			}
			JWT.PRIVATE_KEY = readFileSync(privateKeyPath, 'ascii');
			console.log(`✅ Loaded PRIVATE_KEY from ${privateKeyPath}`);
		}

		if (!JWT.PUBLIC_KEY) {
			const publicKeyPath = process.env.PUBLIC_KEY_FILE || join('config', 'signing', 'signing.pub');
			if (!existsSync(publicKeyPath)) {
				throw new Error(`Public key file not found at ${publicKeyPath}`);
			}
			JWT.PUBLIC_KEY = readFileSync(publicKeyPath, 'ascii');
			console.log(`✅ Loaded PUBLIC_KEY from ${publicKeyPath}`);
		}
	}

	async create<T extends object>(payload: T, options: SignOptions = {}) {
		return new Promise<string>((resolve, reject) => {
			const signOptions: SignOptions = Object.assign(
				{
					algorithm: 'RS256',
					issuer: JWT_ISSUER,
					audience: JWT_ACCESS_AUD,
					expiresIn: '2h',
				},
				options
			);

			console.log(`📝 Creating JWT with options:`, signOptions);

			sign(payload, JWT.PRIVATE_KEY, signOptions, (err, encoded) => {
				if (err) {
					console.error('❌ JWT creation failed:', err);
					return reject(err);
				}

				console.log('✅ JWT successfully created:', encoded);
				resolve(encoded!);
			});
		});
	}

	async decodeAndVerify<T extends JwtPayload>(token: string, options: VerifyOptions = {}) {
		return new Promise<T>((resolve, reject) => {
			const verifyOptions: VerifyOptions = Object.assign(
				{
					algorithms: ['RS256'],
					issuer: JWT_ISSUER,
					audience: JWT_ACCESS_AUD,
				},
				options
			);

			console.log(`🔍 Verifying JWT with options:`, verifyOptions);

			verify(token, JWT.PUBLIC_KEY, verifyOptions, (err, decoded) => {
				if (err) {
					if (err instanceof TokenExpiredError) {
						console.error('❌ JWT expired:', err);
						return reject(new ApiError(ErrorCode.Unauthorized, 'token/expired', 'Token expired'));
					}

					console.error('❌ JWT invalid:', err);
					return reject(new ApiError(ErrorCode.Unauthorized, 'token/invalid', 'Token invalid'));
				}

				console.log('✅ JWT successfully verified:', decoded);
				resolve(decoded as T);
			});
		});
	}
}
