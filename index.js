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

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Cris281172:Rozarios1998@cluster0.bb15bhp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     console.log(err)
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT} port`))