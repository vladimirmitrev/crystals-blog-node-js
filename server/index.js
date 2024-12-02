const express = require('express');
const path = require('path');
require('dotenv').config();
const config = require('./config/index');
const expressInit = require('./config/express');
const databaseInit = require('./config/database');
// const cors = require('cors');

const app = express();

// app.use(cors());

expressInit(app);

const formats = ['.js', '.css', '.ico', '.jpg', '.png'];
console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        console.log('>>>Database is running<<<');

        app.get('*', (req, res) => {
            if (formats.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                res.sendFile(path.join(`/public/${req.url}`));
            } else {
                res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
            }
        });
        app.listen(config.PORT, () => console.log(`App listening in port: ${config.PORT}...`));
        
    })
    .catch(err => console.log('>>>Database init is failed!<<<', err))

    app.get('/', (req, res) => {
        res.send('Heloooooo Aliens!')
    })


// app.get('/', (req, res) => {
//     res.send('Heloooooo Aliens!')
// })

// app.listen(8088, () => console.log('App is listening on http://localhost:8088'));

