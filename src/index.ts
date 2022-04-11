import { ENV } from './config';
import { getPresignedUrl } from './s3Util';
import ApiBuilder from 'claudia-api-builder';

const api : any = new ApiBuilder();

api.get('/ping', (req) => {
  return { message: 'OPA MANAGEMENT BUNDLE IS UP' };
});

api.get('/bundles/{branch}', async (req) => {
  console.log('The env is: ' + ENV);

  const { branch = 'master' } = req.pathParams;
  console.log('The incoming branch is : ', branch);

  // TODO: Handle file not changed by processing "If-None-Match" header
  // Check DyanomoDB ot make sure the file is the same for the specified branch, then return "304 Not Modified".

  if (branch) {
    return getPresignedUrl(branch)
      .then(presignedUrl => {
        console.log(`The presigned url is ${presignedUrl}`);
        return presignedUrl;
      })
      .catch(err => {
        console.log(`Could not get the file for "${branch}" branch`, err);
        return new ApiBuilder.ApiResponse({ message: 'File not found' }, 404);
      });
  } else {
    console.log('Incorrect branch name.');
    return new ApiBuilder.ApiResponse({ message: 'Invalid branch provided' }, 400);
  }
}, { success: 302 });

export = api;
