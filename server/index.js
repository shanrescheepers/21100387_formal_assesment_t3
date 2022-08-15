const express = require('express')
const mongoose = require('mongoose')
const stindereeRoute = require('./routes/stinderee');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(stindereeRoute);


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'stinder',
}).then(() => console.log("Connected to Stinder DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });