const express = require('express');
const path = require('path');
const config = require('./config/index');
const expressInit = require('./config/express');
const mongoose = require('mongoose');
// const databaseInit = require('./config/database');
// const cors = require('cors');

const app = express();

// app.use(cors());

expressInit(app);
mongoose.connect('mongodb://localhost:27017/crystal-blog');
mongoose.connection.on('connected', () => console.log('DB is connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is DISconnected!'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3030, () =>
    console.log('App is listening on http://localhost:3030')
  );
// // Function to initialize the database
// const databaseInit = async (connectionString) => {
//     // Simulated database initialization logic
//     return new Promise((resolve, reject) => {
//         if (connectionString) {
//             resolve(); // Assume database connection succeeds
//         } else {
//             reject('Connection string is missing');
//         }
//     });
// };
// // Initialize database and start the server
// databaseInit(config.DB_CONNECTION_STRING)
//     .then(() => {
//         console.log('>>> Database is connected <<<');
        
//         // Start the server
//         app.listen(config.PORT, () =>
//             console.log(`App listening on port: ${config.PORT}...`)
//         );

//         // app.get('/', (req, res) => {
//         //     res.send('Heloooooo Aliens!')
//         // })

//     })
//     .catch(err => console.error('>>> Database initialization failed! <<<', err));
