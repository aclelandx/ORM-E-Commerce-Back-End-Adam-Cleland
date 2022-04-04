// import required npm packages for the functionality of the application
const express = require('express');
// import the routes from the routes folder to direct the connection to here
const routes = require('./routes');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
