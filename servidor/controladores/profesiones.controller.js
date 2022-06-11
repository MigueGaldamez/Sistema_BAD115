//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerProfesiones = async(req,res)=>{
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,17);
   //porque es una tabla catalogo
   if(true){
        try{
            sql = 'SELECT * FROM profesion order by idprofesion asc';
            const response = await sqlee.query(sql);
            res.status(200).json(response.rows);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

const crearProfesion =  async (req, res) => {
    const { nombre} = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,18);
    if(permiso){
        try{
            if(nombre==''){
                erroresC.nombre = "Este campo es obligatorio";  
                correcto =false;
            }
            if(correcto==false)
            {
                res.status(200).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }else{
                const response = await sqlee.query('INSERT INTO profesion (nombreprofesion) VALUES ($1)', [nombre]);
                res.status(200).json({
                    message: 'Añadido con Exito',
                    body: {
                    poblacion: {response}
                    }
                })
            }
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
  
};

const actualizarProfesion = async (req,res)=>{
    const id = req.body.idprofesion;
    var { nombre } = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,19);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM profesion where idprofesion=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(nombre==''){
                nombre = registro.nombreprofesion;
            }
          
            sql = "UPDATE profesion SET nombreprofesion=$1 WHERE idprofesion=$2";
            const response = await sqlee.query(sql,[nombre,id]);
           
            res.status(200).json({
            poblacion:{response}
            })
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

const eliminarProfesion =  async (req, res) => {
    const id = parseInt(req.params.idprofesion);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,20);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM profesion where idprofesion = $1', [
                id
            ]);
            res.status(200).json('Eliminado satisfactoriamente');
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

module.exports = {
   crearProfesion,
   obtenerProfesiones,
   actualizarProfesion,
   eliminarProfesion,
};