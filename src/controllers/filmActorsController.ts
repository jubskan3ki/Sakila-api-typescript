import type { DBTable } from '@models/DBTable';
import { DB } from '@orm/DB';
import { ORM } from '@orm/ORM';
import type { IActor } from '@utilities/interfaces/IActor';
import type { IORMIndexResponse } from '@utilities/interfaces/IORM';
import type { FieldPacket, QueryResult } from 'mysql2';
import { Get, Path, Query, Route, Security } from 'tsoa';

const READ_COLUMNS = ['actor_id', 'first_name', 'last_name', 'last_update'];

/**
 * Les acteurs d'un film
 */
@Route('/films/{filmId}/actors')
@Security('jwt')
export class FilmActorsController {
	/**
	 * Récupérer tout les acteurs d'un film
	 */
	@Get()
	public async index(
		@Path() filmId: number,
		@Query() page?: string,
		@Query() limit?: string
	): Promise<IORMIndexResponse<IActor>> {
		const connection = DB.Connection;

		let options = {
			table: 'actor' as DBTable,
			columns: READ_COLUMNS,
			query: { page, limit },
			where: {},
		};

		const [queryResults]: [QueryResult, FieldPacket[]] = await connection.query(
			'SELECT actor_id FROM film_actor WHERE film_id = ?',
			[filmId]
		);
		const actorIds: number[] = (queryResults as { actor_id: number }[]).map((row) => row.actor_id);

		if (actorIds.length === 0) {
			return {
				page: page ? parseInt(page, 10) : 0,
				limit: limit ? parseInt(limit, 10) : 0,
				total: 0,
				rows: [],
			};
		}

		options.where = {
			in: {
				actor_id: actorIds,
			},
		};

		return ORM.Index<IActor>(options);
	}

	/**
	 * Récupérer un acteur d'un film
	 */
	@Get('{actorId}')
	public async get(@Path() actorId: number, @Path() filmId: number): Promise<IActor> {
		const connection = DB.Connection;
		const [queryResults]: [QueryResult, FieldPacket[]] = await connection.query(
			'SELECT actor_id FROM film_actor WHERE film_id = ? AND actor_id = ?',
			[filmId, actorId]
		);
		const actorID = (queryResults as { actor_id: number }[])[0]?.actor_id ?? null;

		return ORM.Read<IActor>({
			table: 'actor',
			idKey: 'actor_id',
			idValue: actorID,
			columns: READ_COLUMNS,
		});
	}
}
