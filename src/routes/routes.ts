/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { ExpressTemplateService, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/userController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InfoController } from './../controllers/infoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FilmController } from './../controllers/filmController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FilmActorsController } from './../controllers/filmActorsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/authController';
import { expressAuthentication } from './../utilities/auth/authentication.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (
	req: ExRequest,
	securityName: string,
	scopes?: string[],
	res?: ExResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
	IUserRole: {
		dataType: 'refAlias',
		type: {
			dataType: 'union',
			subSchemas: [
				{ dataType: 'enum', enums: ['admin'] },
				{ dataType: 'enum', enums: ['common'] },
			],
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IUser: {
		dataType: 'refObject',
		properties: {
			id: { dataType: 'double', required: true },
			first_name: { dataType: 'string', required: true },
			last_name: { dataType: 'string', required: true },
			email_address: { dataType: 'string', required: true },
			password: { dataType: 'string', required: true },
			role: { ref: 'IUserRole', required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMIndexResponse_IUser_: {
		dataType: 'refObject',
		properties: {
			page: { dataType: 'double', required: true },
			limit: { dataType: 'double', required: true },
			total: { dataType: 'double', required: true },
			rows: { dataType: 'array', array: { dataType: 'refObject', ref: 'IUser' }, required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMCreateResponse: {
		dataType: 'refObject',
		properties: {
			id: { dataType: 'double', required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	'Pick_IUser.Exclude_keyofIUser.id-or-role__': {
		dataType: 'refAlias',
		type: {
			dataType: 'nestedObjectLiteral',
			nestedProperties: {
				first_name: { dataType: 'string', required: true },
				last_name: { dataType: 'string', required: true },
				email_address: { dataType: 'string', required: true },
				password: { dataType: 'string', required: true },
			},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	'Omit_IUser.id-or-role_': {
		dataType: 'refAlias',
		type: { ref: 'Pick_IUser.Exclude_keyofIUser.id-or-role__', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IUserCreate: {
		dataType: 'refAlias',
		type: { ref: 'Omit_IUser.id-or-role_', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMUpdateResponse: {
		dataType: 'refObject',
		properties: {
			id: { dataType: 'union', subSchemas: [{ dataType: 'double' }, { dataType: 'string' }], required: true },
			rows: { dataType: 'double', required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	Partial_IUserCreate_: {
		dataType: 'refAlias',
		type: {
			dataType: 'nestedObjectLiteral',
			nestedProperties: {
				first_name: { dataType: 'string' },
				last_name: { dataType: 'string' },
				email_address: { dataType: 'string' },
				password: { dataType: 'string' },
			},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IUserUpdate: {
		dataType: 'refAlias',
		type: { ref: 'Partial_IUserCreate_', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMDeleteResponse: {
		dataType: 'refObject',
		properties: {
			id: { dataType: 'union', subSchemas: [{ dataType: 'double' }, { dataType: 'string' }], required: true },
			rows: { dataType: 'double', required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	FilmSpecialFeatures: {
		dataType: 'refAlias',
		type: {
			dataType: 'union',
			subSchemas: [
				{ dataType: 'enum', enums: ['Trailers'] },
				{ dataType: 'enum', enums: ['Commentaries'] },
				{ dataType: 'enum', enums: ['Deleted Scenes'] },
				{ dataType: 'enum', enums: ['Behind the Scenes'] },
			],
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IFilm: {
		dataType: 'refObject',
		properties: {
			film_id: { dataType: 'double', required: true },
			title: { dataType: 'string', required: true },
			description: {
				dataType: 'union',
				subSchemas: [{ dataType: 'string' }, { dataType: 'enum', enums: [null] }],
			},
			release_year: {
				dataType: 'union',
				subSchemas: [{ dataType: 'double' }, { dataType: 'enum', enums: [null] }],
			},
			language_id: { dataType: 'double', required: true },
			original_language_id: {
				dataType: 'union',
				subSchemas: [{ dataType: 'double' }, { dataType: 'enum', enums: [null] }],
			},
			rental_duration: { dataType: 'double', required: true },
			rental_rate: { dataType: 'double', required: true },
			length: { dataType: 'union', subSchemas: [{ dataType: 'double' }, { dataType: 'enum', enums: [null] }] },
			replacement_cost: { dataType: 'double', required: true },
			rating: {
				dataType: 'union',
				subSchemas: [
					{ dataType: 'enum', enums: ['G'] },
					{ dataType: 'enum', enums: ['PG'] },
					{ dataType: 'enum', enums: ['PG-13'] },
					{ dataType: 'enum', enums: ['R'] },
					{ dataType: 'enum', enums: ['NC-17'] },
				],
			},
			special_features: { dataType: 'array', array: { dataType: 'refAlias', ref: 'FilmSpecialFeatures' } },
			last_update: { dataType: 'datetime' },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMIndexResponse_IFilm_: {
		dataType: 'refObject',
		properties: {
			page: { dataType: 'double', required: true },
			limit: { dataType: 'double', required: true },
			total: { dataType: 'double', required: true },
			rows: { dataType: 'array', array: { dataType: 'refObject', ref: 'IFilm' }, required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	'Pick_IFilm.Exclude_keyofIFilm.film_id__': {
		dataType: 'refAlias',
		type: {
			dataType: 'nestedObjectLiteral',
			nestedProperties: {
				title: { dataType: 'string', required: true },
				description: { dataType: 'string' },
				release_year: { dataType: 'double' },
				language_id: { dataType: 'double', required: true },
				original_language_id: { dataType: 'double' },
				rental_duration: { dataType: 'double', required: true },
				rental_rate: { dataType: 'double', required: true },
				length: { dataType: 'double' },
				replacement_cost: { dataType: 'double', required: true },
				rating: {
					dataType: 'union',
					subSchemas: [
						{ dataType: 'enum', enums: ['G'] },
						{ dataType: 'enum', enums: ['PG'] },
						{ dataType: 'enum', enums: ['PG-13'] },
						{ dataType: 'enum', enums: ['R'] },
						{ dataType: 'enum', enums: ['NC-17'] },
					],
				},
				special_features: { dataType: 'array', array: { dataType: 'refAlias', ref: 'FilmSpecialFeatures' } },
				last_update: { dataType: 'datetime' },
			},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	'Omit_IFilm.film_id_': {
		dataType: 'refAlias',
		type: { ref: 'Pick_IFilm.Exclude_keyofIFilm.film_id__', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IFilmCreate: {
		dataType: 'refAlias',
		type: { ref: 'Omit_IFilm.film_id_', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	Partial_IFilmCreate_: {
		dataType: 'refAlias',
		type: {
			dataType: 'nestedObjectLiteral',
			nestedProperties: {
				title: { dataType: 'string' },
				description: { dataType: 'string' },
				release_year: { dataType: 'double' },
				language_id: { dataType: 'double' },
				original_language_id: { dataType: 'double' },
				rental_duration: { dataType: 'double' },
				rental_rate: { dataType: 'double' },
				length: { dataType: 'double' },
				replacement_cost: { dataType: 'double' },
				rating: {
					dataType: 'union',
					subSchemas: [
						{ dataType: 'enum', enums: ['G'] },
						{ dataType: 'enum', enums: ['PG'] },
						{ dataType: 'enum', enums: ['PG-13'] },
						{ dataType: 'enum', enums: ['R'] },
						{ dataType: 'enum', enums: ['NC-17'] },
					],
				},
				special_features: { dataType: 'array', array: { dataType: 'refAlias', ref: 'FilmSpecialFeatures' } },
				last_update: { dataType: 'datetime' },
			},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IFilmUpdate: {
		dataType: 'refAlias',
		type: { ref: 'Partial_IFilmCreate_', validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IActor: {
		dataType: 'refObject',
		properties: {
			actor_id: { dataType: 'double', required: true },
			first_name: { dataType: 'string', required: true },
			last_name: { dataType: 'string', required: true },
			last_update: { dataType: 'datetime', required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IORMIndexResponse_IActor_: {
		dataType: 'refObject',
		properties: {
			page: { dataType: 'double', required: true },
			limit: { dataType: 'double', required: true },
			total: { dataType: 'double', required: true },
			rows: { dataType: 'array', array: { dataType: 'refObject', ref: 'IActor' }, required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
	noImplicitAdditionalProperties: 'throw-on-extras',
	bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
	// ###########################################################################################################
	//  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
	//      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
	// ###########################################################################################################

	const argsUserController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {
		page: { in: 'query', name: 'page', dataType: 'string' },
		limit: { in: 'query', name: 'limit', dataType: 'string' },
	};
	app.get(
		'/users',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(UserController),
		...fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers),

		async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsUserController_getUsers,
					request,
					response,
				});

				const controller = new UserController();

				await templateService.apiHandler({
					methodName: 'getUsers',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
		body: { in: 'body', name: 'body', required: true, ref: 'IUserCreate' },
	};
	app.put(
		'/users',
		...fetchMiddlewares<RequestHandler>(UserController),
		...fetchMiddlewares<RequestHandler>(UserController.prototype.createUser),

		async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsUserController_createUser,
					request,
					response,
				});

				const controller = new UserController();

				await templateService.apiHandler({
					methodName: 'createUser',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsUserController_readUser: Record<string, TsoaRoute.ParameterSchema> = {
		userId: { in: 'path', name: 'userId', required: true, dataType: 'double' },
	};
	app.get(
		'/users/:userId',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(UserController),
		...fetchMiddlewares<RequestHandler>(UserController.prototype.readUser),

		async function UserController_readUser(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsUserController_readUser,
					request,
					response,
				});

				const controller = new UserController();

				await templateService.apiHandler({
					methodName: 'readUser',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
		userId: { in: 'path', name: 'userId', required: true, dataType: 'double' },
		body: { in: 'body', name: 'body', required: true, ref: 'IUserUpdate' },
	};
	app.patch(
		'/users/:userId',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(UserController),
		...fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser),

		async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsUserController_updateUser,
					request,
					response,
				});

				const controller = new UserController();

				await templateService.apiHandler({
					methodName: 'updateUser',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
		userId: { in: 'path', name: 'userId', required: true, dataType: 'double' },
	};
	app.delete(
		'/users/:userId',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(UserController),
		...fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser),

		async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsUserController_deleteUser,
					request,
					response,
				});

				const controller = new UserController();

				await templateService.apiHandler({
					methodName: 'deleteUser',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsInfoController_get: Record<string, TsoaRoute.ParameterSchema> = {};
	app.get(
		'/info',
		...fetchMiddlewares<RequestHandler>(InfoController),
		...fetchMiddlewares<RequestHandler>(InfoController.prototype.get),

		async function InfoController_get(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsInfoController_get, request, response });

				const controller = new InfoController();

				await templateService.apiHandler({
					methodName: 'get',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmController_index: Record<string, TsoaRoute.ParameterSchema> = {
		page: { in: 'query', name: 'page', dataType: 'string' },
		limit: { in: 'query', name: 'limit', dataType: 'string' },
	};
	app.get(
		'/films',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(FilmController),
		...fetchMiddlewares<RequestHandler>(FilmController.prototype.index),

		async function FilmController_index(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_index, request, response });

				const controller = new FilmController();

				await templateService.apiHandler({
					methodName: 'index',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmController_get: Record<string, TsoaRoute.ParameterSchema> = {
		filmId: { in: 'path', name: 'filmId', required: true, dataType: 'double' },
	};
	app.get(
		'/films/:filmId',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(FilmController),
		...fetchMiddlewares<RequestHandler>(FilmController.prototype.get),

		async function FilmController_get(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_get, request, response });

				const controller = new FilmController();

				await templateService.apiHandler({
					methodName: 'get',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmController_put: Record<string, TsoaRoute.ParameterSchema> = {
		body: { in: 'body', name: 'body', required: true, ref: 'IFilmCreate' },
	};
	app.put(
		'/films',
		authenticateMiddleware([{ jwt: ['admin'] }]),
		...fetchMiddlewares<RequestHandler>(FilmController),
		...fetchMiddlewares<RequestHandler>(FilmController.prototype.put),

		async function FilmController_put(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_put, request, response });

				const controller = new FilmController();

				await templateService.apiHandler({
					methodName: 'put',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmController_patch: Record<string, TsoaRoute.ParameterSchema> = {
		filmID: { in: 'path', name: 'filmID', required: true, dataType: 'double' },
		body: { in: 'body', name: 'body', required: true, ref: 'IFilmUpdate' },
	};
	app.patch(
		'/films/:filmID',
		authenticateMiddleware([{ jwt: ['admin'] }]),
		...fetchMiddlewares<RequestHandler>(FilmController),
		...fetchMiddlewares<RequestHandler>(FilmController.prototype.patch),

		async function FilmController_patch(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_patch, request, response });

				const controller = new FilmController();

				await templateService.apiHandler({
					methodName: 'patch',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmController_delete: Record<string, TsoaRoute.ParameterSchema> = {
		filmId: { in: 'path', name: 'filmId', required: true, dataType: 'double' },
	};
	app.delete(
		'/films/:filmId',
		authenticateMiddleware([{ jwt: ['admin'] }]),
		...fetchMiddlewares<RequestHandler>(FilmController),
		...fetchMiddlewares<RequestHandler>(FilmController.prototype.delete),

		async function FilmController_delete(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsFilmController_delete,
					request,
					response,
				});

				const controller = new FilmController();

				await templateService.apiHandler({
					methodName: 'delete',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmActorsController_index: Record<string, TsoaRoute.ParameterSchema> = {
		filmId: { in: 'path', name: 'filmId', required: true, dataType: 'double' },
		page: { in: 'query', name: 'page', dataType: 'string' },
		limit: { in: 'query', name: 'limit', dataType: 'string' },
	};
	app.get(
		'/films/:filmId/actors',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(FilmActorsController),
		...fetchMiddlewares<RequestHandler>(FilmActorsController.prototype.index),

		async function FilmActorsController_index(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsFilmActorsController_index,
					request,
					response,
				});

				const controller = new FilmActorsController();

				await templateService.apiHandler({
					methodName: 'index',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsFilmActorsController_get: Record<string, TsoaRoute.ParameterSchema> = {
		actorId: { in: 'path', name: 'actorId', required: true, dataType: 'double' },
		filmId: { in: 'path', name: 'filmId', required: true, dataType: 'double' },
	};
	app.get(
		'/films/:filmId/actors/:actorId',
		authenticateMiddleware([{ jwt: [] }]),
		...fetchMiddlewares<RequestHandler>(FilmActorsController),
		...fetchMiddlewares<RequestHandler>(FilmActorsController.prototype.get),

		async function FilmActorsController_get(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsFilmActorsController_get,
					request,
					response,
				});

				const controller = new FilmActorsController();

				await templateService.apiHandler({
					methodName: 'get',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
		body: {
			in: 'body',
			name: 'body',
			required: true,
			dataType: 'nestedObjectLiteral',
			nestedProperties: {
				password: { dataType: 'string' },
				email_address: { dataType: 'string', required: true },
			},
		},
	};
	app.post(
		'/auth/login',
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.login),

		async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

				const controller = new AuthController();

				await templateService.apiHandler({
					methodName: 'login',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	const argsAuthController_authorizeFromLink: Record<string, TsoaRoute.ParameterSchema> = {
		jwt: { in: 'query', name: 'jwt', required: true, dataType: 'string' },
	};
	app.get(
		'/auth/authorize',
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.authorizeFromLink),

		async function AuthController_authorizeFromLink(request: ExRequest, response: ExResponse, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = templateService.getValidatedArgs({
					args: argsAuthController_authorizeFromLink,
					request,
					response,
				});

				const controller = new AuthController();

				await templateService.apiHandler({
					methodName: 'authorizeFromLink',
					controller,
					response,
					next,
					validatedArgs,
					successStatus: undefined,
				});
			} catch (err) {
				return next(err);
			}
		}
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
		return async function runAuthenticationMiddleware(request: any, response: any, next: any) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			// keep track of failed auth attempts so we can hand back the most
			// recent one.  This behavior was previously existing so preserving it
			// here
			const failedAttempts: any[] = [];
			const pushAndRethrow = (error: any) => {
				failedAttempts.push(error);
				throw error;
			};

			const secMethodOrPromises: Promise<any>[] = [];
			for (const secMethod of security) {
				if (Object.keys(secMethod).length > 1) {
					const secMethodAndPromises: Promise<any>[] = [];

					for (const name in secMethod) {
						secMethodAndPromises.push(
							expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
								pushAndRethrow
							)
						);
					}

					// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

					secMethodOrPromises.push(
						Promise.all(secMethodAndPromises).then((users) => {
							return users[0];
						})
					);
				} else {
					for (const name in secMethod) {
						secMethodOrPromises.push(
							expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
								pushAndRethrow
							)
						);
					}
				}
			}

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			try {
				request['user'] = await Promise.any(secMethodOrPromises);

				// Response was sent in middleware, abort
				if (response.writableEnded) {
					return;
				}

				next();
			} catch (err) {
				// Show most recent error as response
				const error = failedAttempts.pop();
				error.status = error.status || 401;

				// Response was sent in middleware, abort
				if (response.writableEnded) {
					return;
				}
				next(error);
			}

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
		};
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
