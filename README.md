# JOIN UP SERVER

## Pay attention

All the important things you will do here will be in the functions folder.

## Install dependencies

The package.json of this project is inside functions folder, so to install dependencies, run:

```
cd functions && npm install
```

## Build project

You'll need to build the project before emulate, if you are editing the project, is better to build and watch for changes:

```
cd functions && npm run build:watch
```

But if you only want to build the project:

```
cd functions && npm run build
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