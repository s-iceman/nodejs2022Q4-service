# Home Library Service

This is a simple service to emulate a home library of music. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites.

## Downloading

```
git clone https://github.com/s-iceman/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout dev-task3
```

## Running application

To run the application, open terminal and enter:
```
npm run docker:start
```
Feel free to modify this command in `package.json` and add the flag `-d` if you want to run the application in the background.

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

To stop the application, use hotkey `Ctrl+C` in the application terminal which is showing the logs, or open a new terminal window and enter:
```
npm run docker:stop
```


## Testing

After starting the application, open a new terminal window and enter:

```
npm run docker:test:auth
```

Or you can install all dependencies locally and run the tests outside the container:

```
npm install
npm run test:auth
```

## Check codestyle

```
npm run docker:lint
```

## Scan for vulnerabilities

To scan the application image, open a new terminal window and enter:

```
npm run scan:app
```

To scan the database image, enter:
```
npm run scan:db
```


### Debugging in VS Code

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
