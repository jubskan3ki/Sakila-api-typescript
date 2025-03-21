import type { Pool } from 'mysql2/promise';
import mysql from 'mysql2/promise';

/** Wrapper de la connexion à la SGBDR.
 * On stock une seule référence à la connexion-pool, et on va systématiquement
 * récupérer cette référence pour nos requêtes.
 */
export class DB {
	// Variable "static": une seule instance pour toutes les instances de la classe DB
	private static POOL: Pool | undefined;

	/**
	 * Récupérer ou créer la connexion-pool.
	 */
	static get Connection(): Pool {
		if (!this.POOL) {
			this.POOL = mysql.createPool({
				host: process.env.DB_HOST || 'dbms',
				user: process.env.DB_USER || 'api-dev',
				database: process.env.DB_DATABASE || 'school',
				password: process.env.DB_PASSWORD || 'api-dev-password',
			});
		}

		return this.POOL;
	}

	static async Close() {
		if (this.POOL) {
			await this.POOL.end();
			this.POOL = undefined;
		}
	}
}
