//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerOpcionesPermisos = async(req,res)=>{
    try{
        sql = 'SELECT * FROM opcionpermiso order by idopcionpermiso asc';
        const response = await sqlee.query(sql);
        res.status(200).json(response.rows);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearOpcionPermiso =  async (req, res) => {
    const { nombre} = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,50);
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
                const response = await sqlee.query('INSERT INTO opcionpermiso (accion) VALUES ($1)', [nombre]);
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

const actualizarOpcionPermiso = async (req,res)=>{
    const id = req.body.idopcionpermiso;
    var { nombre } = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,51);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM opcionpermiso where idopcionpermiso=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(nombre==''){
                nombre = registro.accion;
            }
          
            sql = "UPDATE opcionpermiso SET accion=$1 WHERE idopcionpermiso=$2";
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

const eliminarOpcionPermiso =  async (req, res) => {
    const id = parseInt(req.params.idopcionpermiso);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,52);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM opcionpermiso where idopcionpermiso = $1', [
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
   crearOpcionPermiso,
   obtenerOpcionesPermisos,
   actualizarOpcionPermiso,
   eliminarOpcionPermiso,
};