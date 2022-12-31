const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()


const mainRoutes = require('./routes/main');

app.use(cors());
app.use(bodyParser.json())
app.use('/', mainRoutes)
app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to DB');
})
    .catch(err => {
        console.log(err)
    })

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT} port`))