const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const corsConfig = require('./src/config/cors');
// const userRoutes = require('./src/routes/userRoutes');


const app = express();

app.use(corsConfig);

// const globalMiddlewares = require('./src/middlewares');
// globalMiddlewares.forEach(middleware => app.use(middleware));

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware setup
app.use(express.json()); // For parsing application/json

// Import and use routes
const routes = require('./src/routes');
app.use('/', routes);

// Sync models with database
sequelize.sync(
    {
        force: false,
        alter: false
    }
).then(() => {
    console.log('Database Connected!');
}).catch((error) => {
    console.error('Error connecting database: ', error);
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
