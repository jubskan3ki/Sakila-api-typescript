import { DB } from '@orm/DB';
import * as os from 'node:os';
import { Get, Route } from 'tsoa';

/**
 * Contrôleur de la route Info
 */
@Route('/info')
export class InfoController {
	/**
	 * Récupérer les informations générales de l'API.
	 */
	@Get()
	public async get(): Promise<{
		database_status: 'healthy' | 'unhealthy';
		database_tables_count: number;
		database_table_names: string[];
	}> {
		const connection = DB.Connection;
		let database_status: 'healthy' | 'unhealthy' = 'healthy';
		let database_tables_count: number = 0;
		let database_table_names: string[] = [];

		try {
			await connection.query('SELECT 1');

			const [rows] = await connection.query(`
                SELECT table_name
                FROM information_schema.tables 
                WHERE table_schema = DATABASE();
            `);

			database_table_names = (rows as { table_name: string }[]).map((row) => row.table_name);
			database_tables_count = database_table_names.length;
		} catch (error) {
			console.error('Database connection failed:', error);
			database_status = 'unhealthy';
		}

		return {
			database_status,
			database_tables_count,
			database_table_names,
		};
	}
}
