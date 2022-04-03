const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

//
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./rutas/index'));

app.listen(3001,()=>{
    console.log("Yey, funcionaaa");
})
