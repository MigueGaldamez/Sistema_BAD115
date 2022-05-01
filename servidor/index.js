const express = require('express');
const app = express();
const cors = require('cors');
const { iniciarBaseDatos,} = require('./controladores/controlador');
const cookieParser = require('cookie-parser');
app.set('authTokens', []);
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./rutas/index'));

app.listen(3001,()=>{
    console.log("Yey, funcionaaa");
    iniciarBaseDatos();
})

