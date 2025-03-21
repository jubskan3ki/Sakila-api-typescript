import { IUser, IUserCreate } from '@utilities/interfaces/IUser';

export interface IFilm {
	film_id: number;
	title: string;
	description?: string | null;
	release_year?: number | null;
	language_id: number;
	original_language_id?: number | null;
	rental_duration: number;
	rental_rate: number;
	length?: number | null;
	replacement_cost: number;
	rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
	special_features?: FilmSpecialFeatures[];
	last_update?: Date; // timestamp with auto-update
}

export type FilmSpecialFeatures = 'Trailers' | 'Commentaries' | 'Deleted Scenes' | 'Behind the Scenes';

export type IFilmRO = Readonly<IFilm>;

export type IFilmCreate = Omit<IFilm, 'film_id'>;

export type IFilmUpdate = Partial<IFilmCreate>;
