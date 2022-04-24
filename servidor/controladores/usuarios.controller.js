
//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

var CryptoJS = require('crypto-js');

generarAuthToken = function() {
    return CryptoJS.lib.WordArray.random(30).toString();
}

const obtenerUsuarios = async(req,res)=>{
    /*tokens = req.app.get("authTokens");*/
    valor = req.headers.authorization;
    //console.log(valor);
    /*console.log(tokens);
    usuario = tokens.find(x => x.token == valor);
    console.log(usuario);
    //console.log(tokens);/*/
   
    try{
        
        sql = 'SELECT * FROM usuario order by idusuario asc';
        const response = await sqlee.query(sql);
        usuarios = response.rows;

        for(const usuario of usuarios){
            sql2 = 'SELECT * FROM laboratorio where idlaboratorio=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[usuario.idlaboratorio]);
            usuario.laboratorio = responseHija.rows[0].nombrelaboratorio;
            usuario.infolaboratorio = responseHija.rows[0]; 
        
        }

        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json(error);
    }
 
};

const iniciarSesion = async(req,res)=>{
   
    const { correo,contrasenia} = req.body;
    try{
        sql = 'select * from usuario where correoUsuario=$1 and contrasenia =$2 limit 1';
        
        const response = await sqlee.query(sql, [
            correo,contrasenia
        ]);
      
        if(response.rowCount>0){
            if(response.rows[0].estado == false){
                res.status(400).send('Usuario desahbilitado');
            }else{
                res.status(200).json(response.rows);
            }
        }else{
            res.status(400).send('Usuario o contraseña incorrectos');
        }
    }catch(error){
        res.status(500).json(error);
    }
};

const crearUsuario =  async (req, res) => {
    const { nombre,correo,contrasenia,confirmarC,estado,laboratorio} = req.body;
    var erroresC ={};
    var correcto = true;
    try{
        if(nombre==''){
            erroresC.nombre = "Este campo es obligatorio";  
            correcto =false;
        }
        if(laboratorio<=0){
            erroresC.laboratorio = "Este campo es obligatorio";  
            correcto =false;
        }
        if(correo==""){
            erroresC.correo = "Este campo es obligatorio";  
            correcto =false;
        }
        if(contrasenia==""){
            erroresC.contrasenia = "Este campo es obligatorio";  
            correcto =false;
        }
        if(confirmarC==""){
            erroresC.confirmarC = "Este campo es obligatorio";  
            correcto =false;
        }
        if(contrasenia!=confirmarC){
            erroresC.confirmarC = "Contraseñas no coinciden";  
            correcto =false;
        }
        if(correcto==false)
        {
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })
        }else{
            const response = await sqlee.query('INSERT INTO usuario (idlaboratorio,contrasenia,estado,nombreusuario,correousuario) VALUES ($1,$2,$3,$4,$5)', 
            [laboratorio,contrasenia,estado,nombre,correo]);
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                poblacion: {response}
                }
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const actualizarUsuario = async (req,res)=>{
    const id = req.body.idusuario;
    var { nombre,laboratorio,correo,estado } = req.body;
 
    try{
        registroSQL = 'SELECT * FROM usuario where idusuario=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
        
        if(nombre==''){
            nombre = registro.nombreusuario;
        }
        if(laboratorio<=0){
            laboratorio = registro.idlaboratorio
        }
        if(correo==""){
           correo = registro.correousuario
        }
        if(estado==null){
            estado = registro.estado
         }
        sql = "UPDATE usuario SET nombreusuario=$1, correousuario=$2, idlaboratorio=$3,estado=$4 WHERE idusuario=$5";
        const response = await sqlee.query(sql,[nombre,correo,laboratorio,estado,id]);
       
        res.status(200).json({
        poblacion:{response}
        })
    }catch(error){
        res.status(500).json(error);
    }
};

const eliminarUsuario =  async (req, res) => {
    const id = parseInt(req.params.idusuario);
    try{
        await sqlee.query('DELETE FROM usuario where idusuario = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};
const validarPermiso =  async (req, res) => {

}
module.exports = {
   obtenerUsuarios,
   iniciarSesion,
   crearUsuario,
   actualizarUsuario,
   eliminarUsuario,
   generarAuthToken,
};