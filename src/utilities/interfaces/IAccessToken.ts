import type { IUserRole } from '@utilities/interfaces/IUser';

export interface IAccessToken {
	userId: number;
	role: IUserRole;
}
