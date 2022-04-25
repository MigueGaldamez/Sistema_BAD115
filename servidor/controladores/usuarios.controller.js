
//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

var CryptoJS = require('crypto-js');

generarAuthToken = function() {
    return CryptoJS.lib.WordArray.random(30).toString();
}

const obtenerUsuarios = async(req,res)=>{
    valor = req.headers.authorization;
 
    try{
        
        sql = 'SELECT * FROM usuario order by idusuario asc';
        const response = await sqlee.query(sql);
        usuarios = response.rows;

        for(const usuario of usuarios){
            sql2 = 'SELECT * FROM laboratorio where idlaboratorio=$1 limit 1';
            const responseHija = await sqlee.query(sql2,[usuario.idlaboratorio]);
            usuario.laboratorio = responseHija.rows[0].nombrelaboratorio;
            usuario.infolaboratorio = responseHija.rows[0]; 

            sql3 = 'SELECT * FROM detallerol where idusuario=$1';
            const responseHija2 = await sqlee.query(sql3,[usuario.idusuario]);
           
         
            valores =  responseHija2.rows;
            var array = Object.keys(valores)
            .map(function(key) {
                return valores[key].idrol;
            });
            usuario.roles = array; 
        }

        res.status(200).json(usuarios);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
 
};

const obtenerUsuariosLibres = async(req,res)=>{
    valor = req.headers.authorization;
 
    try{
        
        sql = 'select * from usuario where idusuario not in(SELECT idusuario FROM laboratorista) order by idusuario asc';
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

const actualizarUsuarioRoles = async (req,res)=>{
    const id = req.body.idusuario;
    const { roles } = req.body;
    try{
        sql = "DELETE from detallerol WHERE idusuario=$1";
        const response = await sqlee.query(sql,[id]);
        //console.log(response.rows);
        for (const rol of roles) {
            sql2 = "Insert into detallerol(idrol,idusuario) VALUES($1,$2)";
            const response2 = await sqlee.query(sql2,[rol,id]);
        };
        sql2 = "Select from detallerol WHERE idusuario=$1";
        const response2 = await sqlee.query(sql2,[id]);

        res.status(200).json(response2.rows);
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
   obtenerUsuariosLibres,
   actualizarUsuarioRoles,
};