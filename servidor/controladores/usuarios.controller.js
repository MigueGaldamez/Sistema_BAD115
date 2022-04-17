//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerUsuarios = async(req,res)=>{
    sql = 'SELECT * FROM usuario';
    const response = await sqlee.query(sql);
    res.status(200).json(response.rows);
};

const iniciarSesion = async(req,res)=>{
    const { correo,contrasenia} = req.body;
    sql = 'select * from usuario where correoUsuario=$1 and contrasenia =$2 limit 1';
    
    const response = await sqlee.query(sql, [
        correo,contrasenia
    ]);
    if(response.rowCount>0){
        res.status(200).json(response.rows);
    }else{
        res.status(400).send('Usuario o contraseña incorrectos');
    }
};

module.exports = {
   obtenerUsuarios,
   iniciarSesion,
};