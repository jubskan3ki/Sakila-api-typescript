import { ApiError } from '@error/ApiError';
import { ORM } from '@orm/ORM';
import { ErrorCode } from '@utilities/enums/ErrorCode';
import type { IAccessToken } from '@utilities/interfaces/IAccessToken';
import type { IUserRO } from '@utilities/interfaces/IUser';
import { JWT } from '@utilities/JWT/JWT';
import { JWT_ACCESS_AUD, JWT_EMAIL_LINK_AUD, JWT_ISSUER } from '@utilities/JWT/JWTConstants';
import { Body, Get, Post, Query, Route } from 'tsoa';

@Route('/auth')
export class AuthController {
	@Post('/login')
	public async login(
		@Body()
		body: {
			/**
			 * Identifiant de l'utilisateur.
			 */
			email_address: string;
			/**
			 * Mot de passe de l'utilisateur
			 */
			password?: string;
		}
	): Promise<{ ok: boolean; token?: string; error?: string }> {
		if (!body.password) {
			throw new ApiError(
				ErrorCode.UnprocessableEntity,
				'auth/missing-password',
				'missing password in request body'
			);
		}

		const user = await ORM.Read<IUserRO>({
			table: 'users',
			idKey: 'email_address',
			idValue: body.email_address,
			columns: ['id', 'email_address', 'password', 'role'],
		});

		//TODO: le mot de passe n'est pas crypté par conséquent on ne fait qu'une vérification simple ici.
		// Dans un vrai projet, ce code n'a pas lieu d'être et doit implémenter une vérification correct
		if (body.password !== user.password) {
			throw new ApiError(ErrorCode.UnprocessableEntity, 'auth/credentials-missmatch', 'Credentials mismatch');
		}

		const jwt = new JWT();
		const token = await jwt.create(
			{
				userId: user.id,
				role: user.role,
			},
			{
				expiresIn: '30 minutes',
				audience: JWT_ACCESS_AUD,
				issuer: JWT_ISSUER,
			}
		);

		return {
			ok: true,
			token: token,
		};
	}

	@Get('/authorize')
	public async authorizeFromLink(@Query() jwt: string): Promise<{
		access: string;
		redirectTo: string;
		message: string;
	}> {
		const helper = new JWT();
		const decoded = await helper.decodeAndVerify(jwt, {
			issuer: JWT_ISSUER,
			audience: JWT_EMAIL_LINK_AUD,
		});

		if (!decoded.userId) {
			throw new ApiError(
				ErrorCode.Unauthorized,
				'auth/invalid-authorize-link-token',
				'userId was not found in the payload for token'
			);
		}

		// Vérifier que l'utilisateur existe toujours
		const user = await ORM.Read<IUserRO>({
			table: 'users',
			idKey: 'id',
			idValue: decoded.userId,
			columns: ['id', 'role'],
		});

		let payload: IAccessToken = {
			userId: user.id,
			role: user.role,
		};

		const access = (await helper.create(payload, {
			expiresIn: '12 hours',
			issuer: JWT_ISSUER,
			audience: JWT_ACCESS_AUD,
		})) as string;

		return {
			access: access,
			redirectTo: 'https://lien.vers.mon.front',
			message: 'Normalement ce endpoint va demander au navigateur de rediriger vers votre site ou ressource',
		};
	}
}
