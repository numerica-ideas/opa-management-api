# OPA Management API [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fnumerica-ideas%2Fopa-management-api&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://blog.numericaideas.com)

## Getting started

This API implements the specificaiton of **OPA** regarding [Management APIs](https://www.openpolicyagent.org/docs/latest/management-introduction).
It's built using **AWS Lambda**, **TypeScript** and **Claudia** for deployment, in **ca-central-1** region.

```
$ git clone https://gitlab.com/numericaideas/opa-management-api.git
$ cd opa-management-api
$ npm install
```

## AWS Resources
The API uses two important AWS resources:
- **NI_OPA_BUNDLES**: the DynamoDB table for caching and/or saving some API's data.
- **ni-opa-bundles**: S3 bucket where the bundle files are fetched from, the save operations should be performed from another thread (preferably CI/CD pipelines).

According to your environment, the resources are to be changed both in the `policies` folder and the `env JSON file`.

## Build
The command `npm run build` compiles the **TypeScript** files and generates a vanilla JS version of the App in the **bin** folder.

## Environment Variables
Some environment variables are needed to deploy the service, sample are provided in **env.json** file.

To deploy either for **dev or prod**, you should apply these respectively:
- Create a **dev.json** file from the sample one.
- Create a **prod.json** file from the sample one.

## API Deployment
Run the following commands prior to delete **claudia.json** file if necessary.

Function creation
```
$ npm run create
```

Pushing recent changes
```
$ npm run deploy:dev
$ npm run deploy:prod
```

Once deployed, the service will be accessible for both stages at:
- https://xxxxxxxxxx.execute-api.ca-central-1.amazonaws.com/dev
- https://xxxxxxxxxx.execute-api.ca-central-1.amazonaws.com/prod

## OPA Instance
Run your OPA instance using the following command and configurations:

`opa run -s -c config.yaml  --log-format=json-pretty`

```
# OPA instance config.yaml file

services:
  - name: ni_management_api
    url: https://xxxxxxxxx.execute-api.ca-central-1.amazonaws.com/stage

bundles:
  authz:
    service: ni_management_api
    resource: bundles/master
    persist: true
    polling:
      min_delay_seconds: 10
      max_delay_seconds: 20

labels:
  app: ni_management_api
  region: ca_central_1
  environment: master
```

**Note**: You have to use your own deployment URL in the config.yaml file.
