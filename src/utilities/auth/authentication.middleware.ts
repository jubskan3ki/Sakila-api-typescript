import { ApiError } from '@error/ApiError';
import { ErrorCode } from '@utilities/enums/ErrorCode';
import type { IAccessToken } from '@utilities/interfaces/IAccessToken';
import { JWT } from '@utilities/JWT/JWT';
import { JWT_ACCESS_AUD, JWT_ISSUER } from '@utilities/JWT/JWTConstants';
import type { Request } from 'express';

export async function expressAuthentication(
	request: Request,
	securityName: string,
	scopes?: string[]
): Promise<IAccessToken | null> {
	if (securityName !== 'jwt') {
		console.warn('⚠️ Unknown security scheme:', securityName);
		return null;
	}

	const authHeader = request.headers.authorization || '';
	if (!authHeader.startsWith('Bearer ')) {
		console.warn('⚠️ Missing Bearer token in Authorization header');
		throw new ApiError(
			ErrorCode.Unauthorized,
			'auth/missing-header',
			'Missing authorization header with Bearer token'
		);
	}

	const token = authHeader.replace('Bearer ', '').trim();
	const jwt = new JWT();

	let decoded: IAccessToken;
	try {
		decoded = await jwt.decodeAndVerify<IAccessToken>(token, {
			issuer: JWT_ISSUER,
			audience: JWT_ACCESS_AUD,
		});
	} catch (error) {
		console.error('❌ Token verification failed:', error);
		throw error;
	}

	if (Array.isArray(scopes) && scopes.length > 0) {
		const userRole = decoded.role;

		if (!scopes.includes(userRole)) {
			console.warn(`⚠️ Role '${userRole}' is not authorized. Required: ${scopes.join(', ')}`);
			throw new ApiError(
				ErrorCode.Forbidden,
				'authentication/role-required',
				`User role '${userRole}' is not authorized to perform this action`
			);
		}
	}

	return decoded;
}
