export type IUserRole = 'admin' | 'common'; // ✅ Définition des valeurs autorisées

export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	email_address: string;
	password: string;
	role: IUserRole;
}

// Outils de manipulation des types :
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Ici, on rend tous les champs "lecture seul". Typescript ne va pas autoriser l'affectation des champs
export type IUserRO = Readonly<IUser>;

export type IUserCreate = Omit<IUser, 'id' | 'role'>;

export type IUserUpdate = Partial<IUserCreate>;
