[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# SyRéeN

## Local development

If you want to connect to the existing middleware (https://data.syreen.fr), you can go directly to the "Frontend" section.


### Triple store

Launch the [Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) triplestore on port 3030:

```bash
docker-compose up -d fuseki
```


### Mailcatcher

Mailcatcher is used to check emails sent without going through a SMTP server.

```bash
docker-compose up -d mailcatcher
```

It is now available on http://localhost:1080


### Middleware

Add a `.env.local` file in the `/middleware` directory and fill the required configurations (ask a developer if needed):

```dotenv
SEMAPPS_BATIPRIX_IMPORT_URL=
```

Launch the middleware on port 3000:

```bash
cd middleware
yarn install
yarn run dev
```

This will launch Moleculer in [REPL mode](https://moleculer.services/docs/0.14/moleculer-repl.html), allowing you to call actions directly.


### Initialize the data

In Moleculer REPL, enter these actions to import all data:

```bash
call importers.batiprix.freshImport
call importers.cstb.freshImport
call importers.project-types.freshImport
call importers.stages.freshImport
call importers.units.freshImport
```


### Frontend

Add a `.env.local` file in the `/frontend` directory and fill the required configurations (ask a developer if needed):

```dotenv
REACT_APP_MAPBOX_ACCESS_TOKEN=
REACT_APP_POD_PROVIDER_DOMAIN_NAME=mypod.store
REACT_APP_AGGREGATOR_BASE_URL=http://localhost:3000 # Comment this if you want to use https://data.syreen.fr
```

Launch the frontend on port 4000:

```bash
cd frontend
yarn install
yarn start
```


## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published, we recommend to use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

### Linking middleware packages

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /ARCHIPELAGO_REPO/middleware
yarn run link-semapps-packages
```

### Linking frontend packages

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run link-all
cd /ARCHIPELAGO_REPO/frontend
yarn run link-semapps-packages
```

Additionally, frontend packages need to be rebuilt, or your changes will not be taken into account by Archipelago. 
You can use `yarn run build` to build a package once, or `yarn run dev` to rebuild a package on every change.
