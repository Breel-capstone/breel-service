# breel-capstone

[API Docs](https://breel-service-67fn7hvfma-as.a.run.app/swagger/)

## Pre-Requisite
- Node v19.0.1
- PostgreSQL v15



## How to Prepare the Environment

Before you can start `breel-service` up, you need to prepare the environment. First one you should set up is the configuration file. To create the configuration file, you need to create `.env` file. The `.env` file will looks like this:
```shell
ENVIRONMENT=development
GCP_PROJECT_ID=
GCP_SECRET_NAME=
GCP_SECRET_VERSION=
GCP_SERVICE_ACCOUNT_EMAIL=
GCP_SERVICE_ACCOUNT_PRIVATE_KEY=
```
You can ask this repository owner for credentials to fill the `.env` file.

Next, you need to prepare the database for `breel-service`. You can create the PostgreSQL database using this following credential:
```shell
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=breel_service
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

After you create the database. You can run the following command:
```shell
npm run migrate && npm run seed
```
This command is to populate the local databases.

After the local populate the database. You should run the query at `etc/query`.

After that, now you're ready to run the service by run the following command
```shell
npm install && npm run start
```
This will install all the dependencies required and run the service

## Installation
- Ask me for the .env file
- Install all tthe dependencies with `npm install`
- Run the server with `npm run start`

