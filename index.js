const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
require('dotenv').config();
const palmasRoutes = require('./routes/palmasRoutes.routes.js');

const port = process.env.PORT;

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/palmas', palmasRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, ()=>{
    console.log(`listening at port http://localhost:${port}`);
})
