# Home Library Service

This is a simple service to emulate a home library of music. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites.

## Downloading

```
git clone https://github.com/s-iceman/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

To run the application, open terminal and enter:
```
npm start
```
Before starting the application you can create `.env` file and set your preferred port for the server (see `.env.example`). By default the application uses port 4000.

After starting the app you can open the API documentation in Swagger Editor: https://editor.swagger.io/. Copy content from `doc/api.yaml` to editor field and change the server address to `http://localhost:{your port}`.

For more information about OpenAPI/Swagger, please visit https://swagger.io/.

Routes:
- `/user`
- `/track`
- `/artist`
- `/album`
- `/favs`

Details are provided in `doc/api.yaml`.

## Testing

After starting the application, open a new terminal window and enter:

```
npm run test
```

To run a specific test suite:

```
npm run test -- <path to suite>
```

### Check codestyle

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
