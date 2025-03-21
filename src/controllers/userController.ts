import { ORM } from '@orm/ORM';
import type {
	IORMCreateResponse,
	IORMDeleteResponse,
	IORMIndexResponse,
	IORMUpdateResponse,
} from '@utilities/interfaces/IORM';
import type { IUser, IUserCreate, IUserUpdate } from '@utilities/interfaces/IUser';
import { Body, Delete, Get, Patch, Path, Put, Query, Route, Security } from 'tsoa';

const READ_COLUMNS = ['id', 'first_name', 'last_name', 'email_address', 'role'];

/**
 * Un utilisateur de la plateforme.
 */
@Route('/users')
@Security('jwt')
export class UserController {
	/**
	 * Récupérer une page d'utilisateurs.
	 */
	@Get()
	public async getUsers(
		/** La page (zéro-index) à récupérer */
		@Query() page?: string,
		/** Le nombre d'éléments à récupérer (max 50) */
		@Query() limit?: string
	): Promise<IORMIndexResponse<IUser>> {
		return ORM.Index<IUser>({
			table: 'users',
			columns: READ_COLUMNS,
			query: { page, limit },
		});
	}

	/**
	 * Créer un nouvel utilisateur
	 */
	@Put()
	public async createUser(@Body() body: IUserCreate): Promise<IORMCreateResponse> {
		return ORM.Create<IUserCreate>({
			table: 'users',
			body,
		});
	}

	/**
	 * Récupérer une utilisateur avec le ID passé dans le URL
	 */
	@Get('{userId}')
	public async readUser(@Path() userId: number): Promise<IUser> {
		return ORM.Read<IUser>({
			table: 'users',
			idKey: 'id',
			idValue: userId,
			columns: READ_COLUMNS,
		});
	}

	/**
	 * Mettre à jour un utilisateur avec le ID passé dans le URL
	 */
	@Patch('{userId}')
	public async updateUser(@Path() userId: number, @Body() body: IUserUpdate): Promise<IORMUpdateResponse> {
		return ORM.Update<IUserUpdate>({
			table: 'users',
			idKey: 'id',
			idValue: userId,
			body,
		});
	}

	/**
	 * Supprimer un utilisateur
	 */
	@Delete('{userId}')
	public async deleteUser(@Path() userId: number): Promise<IORMDeleteResponse> {
		return ORM.Delete({
			table: 'users',
			idKey: 'id',
			idValue: userId,
		});
	}
}
