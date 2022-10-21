const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/api/users'))


const server = app.listen(3000, function () {
    console.log(`Server inicializado on port: ${process.env.PORT}`);
});

//module.exports = app;
