# Directory structure

```
|- app.js - Main server file
|- webpack.config.js - Configuration for admin front end
|- tailwind.config.js - Configuration for admin styles
|
|- controllers - Groups of routes
|      |
|      |- admin-api - api endpoints
|      |- admin-views - endpoints for admin templates and form submissions
|      |- install - installation endpoints
|      |- theme - theme endpoints
|
|- routes - Individual routes
|
|- models - Mongoose database model schemas
|
|- client - All user facing files
|     |
|     |- admin - Admin front end
|     |_ theme - Website front end
|
|_ src - Admin build files
```

# Scripts

`yarn start:nodemon`: Start development server

`yarn fed:dev`: Webpack hot module reloading

`yarn log`: Output production logs

`yarn build`: Build admin webpack bundles
