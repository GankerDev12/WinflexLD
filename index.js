const express = require('express');
const { dbConnection } = require('./database/config');

require('dotenv').config();

const app = express();

//Base de datos
dbConnection();


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});