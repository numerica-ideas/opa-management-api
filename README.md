# OPA Management OPA

## Getting started

This API implements the specificaiton of *OPA** regarding [Management APIs](https://www.openpolicyagent.org/docs/latest/management-introduction).
It's built using **AWS Lambda**, **TypeScript** and **Claudia** for deployment, in **ca-central-1** region.

```
$ git clone https://gitlab.com/numericaideas/opa-management-api.git
$ cd opa-management-api
$ npm install
```

## Build
The command `npm run build` compiles the **TypeScript** files and generates a vanilla JS version of the App in the **bin** folder.

## Environment Variables
Some environment variables are needed to deploy the service, sample are provided in **env.json** file.

To deploy either for **dev or prod**, you should apply these respectively:
- Create a **dev.json** file from the default one.
- Create a **prod.json** file from the default one.

## Deployments
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
