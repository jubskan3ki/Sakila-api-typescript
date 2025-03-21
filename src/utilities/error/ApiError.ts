import type { ErrorCode } from '../enums/ErrorCode';
import type { IApiError } from '../interfaces/IApiError';

export class ApiError extends Error {
	constructor(
		public httpCode: ErrorCode,
		public structuredError: string,
		public errMessage: string,
		public errDetails?: any
	) {
		super();
	}

	get json(): IApiError {
		return {
			code: this.httpCode,
			structured: this.structuredError,
			message: this.errMessage,
			details: this.errDetails,
		};
	}
}
