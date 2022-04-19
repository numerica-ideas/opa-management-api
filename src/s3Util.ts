import { S3 } from 'aws-sdk';
import { S3_BUCKET } from './config';

let s3Client = new S3({ region: 'ca-central-1', signatureVersion: 'v4' });


export const getPresignedUrl = (fileKey: string): Promise<string> => {
  if (!fileKey) return Promise.reject("Invalid file key provided.");

  const url = s3Client.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: `${fileKey}.tar.gz`,
    Expires: 3600
  });

  return Promise.resolve(url);
}
