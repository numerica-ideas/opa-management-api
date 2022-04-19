/**
 * Config file
 */

export const STAGE = process.env.STAGE || 'dev';   // The default stage is dev.
export const S3_BUCKET = process.env.S3_BUCKET;
export const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;
