const express = require('express');
const app = express();
const cors = require('cors');
const { iniciarBaseDatos,} = require('./controladores/controlador');
const cookieParser = require('cookie-parser');
const path = require('path');
app.set('authTokens', []);
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Routes
app.use(require('./rutas/index'));

app.listen(3001,()=>{
    console.log("Yey, funcionaaa");
    iniciarBaseDatos();
})

