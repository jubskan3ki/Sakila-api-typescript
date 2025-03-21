import { ApiError } from '@error/ApiError';
import { DB } from '@orm/DB';
import { ORM } from '@orm/ORM';
import { ErrorCode } from '@utilities/enums/ErrorCode';
import type { IFilm, IFilmCreate, IFilmUpdate } from '@utilities/interfaces/IFilm';
import type {
	IORMCreateResponse,
	IORMDeleteResponse,
	IORMIndexResponse,
	IORMUpdateResponse,
} from '@utilities/interfaces/IORM';
import { Body, Delete, Get, Patch, Path, Put, Query, Route, Security } from 'tsoa';

const READ_COLUMNS = [
	'film_id',
	'title',
	'description',
	'release_year',
	'language_id',
	'original_language_id',
	'rental_duration',
	'rental_rate',
	'length',
	'replacement_cost',
	'rating',
	'special_features',
	'last_update',
];

/**
 * Un utilisateur de la plateforme.
 */
@Route('/films')
@Security('jwt')
export class FilmController {
	/**
	 * Récupérer une page de films.
	 */
	@Get()
	public async index(@Query() page?: string, @Query() limit?: string): Promise<IORMIndexResponse<IFilm>> {
		return ORM.Index<IFilm>({
			table: 'film',
			columns: READ_COLUMNS,
			query: { page, limit },
		});
	}

	/**
	 * Récupérer une film avec le ID passé dans le URL
	 */
	@Get('{filmId}')
	public async get(@Path() filmId: number): Promise<IFilm> {
		return ORM.Read<IFilm>({
			table: 'film',
			idKey: 'film_id',
			idValue: filmId,
			columns: READ_COLUMNS,
		});
	}

	/**
	 * Créer un nouveau
	 */
	@Security('jwt', ['admin'])
	@Put()
	public async put(@Body() body: IFilmCreate): Promise<IORMCreateResponse> {
		type FilmSpecialFeatures = 'Trailers' | 'Commentaries' | 'Deleted Scenes' | 'Behind the Scenes';

		const validSpecialFeatures: FilmSpecialFeatures[] = [
			'Trailers',
			'Commentaries',
			'Deleted Scenes',
			'Behind the Scenes',
		];

		if (Array.isArray(body.special_features)) {
			body.special_features = body.special_features
				.filter((feature): feature is FilmSpecialFeatures =>
					validSpecialFeatures.includes(feature as FilmSpecialFeatures)
				)
				.join(',') as unknown as FilmSpecialFeatures[];
		} else if (typeof body.special_features !== 'undefined') {
			body.special_features = [];
		}

		return ORM.Create<IFilmCreate>({
			table: 'film',
			body,
		});
	}

	@Security('jwt', ['admin'])
	@Patch('{filmID}')
	public async patch(@Path() filmID: number, @Body() body: IFilmUpdate): Promise<IORMUpdateResponse> {
		return ORM.Update<IFilmUpdate>({
			table: 'film',
			idKey: 'film_id',
			idValue: filmID,
			body,
		});
	}

	/**
	 * Supprimer un film
	 */
	@Security('jwt', ['admin'])
	@Delete('{filmId}')
	public async delete(@Path() filmId: number): Promise<IORMDeleteResponse> {
		const connection = DB.Connection;

		try {
			await connection.query(
				`
                DELETE FROM film_actor
                WHERE film_id = ?
            `,
				[filmId]
			);

			await connection.query(
				`
                DELETE FROM film_category
                WHERE film_id = ?
            `,
				[filmId]
			);

			const [rows] = await connection.query(
				`
                SELECT inventory_id
                FROM inventory
                WHERE film_id = ?
            `,
				[filmId]
			);

			const inventoryIds = (rows as { inventory_id: number }[]).map((row) => row.inventory_id);

			if (inventoryIds.length > 0) {
				await connection.query(`DELETE FROM rental WHERE inventory_id in (?)`, [inventoryIds]);
				await connection.query(`DELETE FROM inventory WHERE inventory_id in (?)`, [inventoryIds]);
			}

			return ORM.Delete({
				table: 'film',
				idKey: 'film_id',
				idValue: filmId,
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Une erreur interne est survenue';

			throw new ApiError(ErrorCode.InternalError, 'controller/delete-film', errorMessage);
		}
	}
}
