# JOIN UP SERVER

## Install dependencies

The package.json of this project is inside functions folder, so to install dependencies, run:

```
cd functions && npm install
```

## Run in development mode

To run this project in development mode, you can only emulate the endpoints, 
so all your requests will run localy but will affect the cloud database:

```
cd functions && npm run serve:functions
```

Or you can emulate the endpoints and the database, by running:

```
cd functions && npm run serve:database
```