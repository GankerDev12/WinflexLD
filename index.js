const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

//Base de datos
dbConnection();
//CORS
app.use(cors());
app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/maquinas', require('./routes/maquinas'));
app.use('/api/fabricantes', require('./routes/fabricantes'));
app.use('/api/operadores', require('./routes/operadores'));
app.use('/api/productos', require('./routes/productos'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});