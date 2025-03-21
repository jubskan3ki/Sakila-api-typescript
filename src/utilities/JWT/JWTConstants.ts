/**
 * Pour le champ 'issuer' de tous nos JWT
 */
export const JWT_ISSUER = process.env.JWT_ISSUER || 'api-auth';
export const JWT_ACCESS_AUD = process.env.JWT_ACCESS_AUD || 'api-access';

/**
 * Pour le champe 'aud' selon le cas
 */
export const JWT_EMAIL_LINK_AUD = process.env.JWT_EMAIL_LINK_AUD || 'api-email-link';
export const JWT_RENEW_AUD = 'api-renew';
