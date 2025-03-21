import type { ErrorCode } from '../enums/ErrorCode';

export interface IApiError {
	code: ErrorCode;
	structured: string;
	message?: string;
	details?: any;
}
