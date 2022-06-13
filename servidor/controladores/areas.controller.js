//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');

const obtenerAreas = async(req,res)=>{
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,21);
    if(permiso){
        try{
            sql = 'SELECT * FROM area order by idarea asc';
            const response = await sqlee.query(sql);
            res.status(200).json(response.rows);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

    
};

const crearArea =  async (req, res) => {
    const { nombre} = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,22);
    //porque es una tabla catalogo
    if(true){
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
                const response = await sqlee.query('INSERT INTO area(nombrearea) VALUES ($1)', [nombre]);
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

const actualizarArea = async (req,res)=>{
    const id = req.body.idarea;
    var { nombre } = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,23);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM area where idarea=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(nombre==''){
                nombre = registro.nombrearea;
            }
          
            sql = "UPDATE area SET nombrearea=$1 WHERE idarea=$2";
            const response = await sqlee.query(sql,[nombre,id]);
           
            res.status(200).json({
            poblacion:{response}
            })
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

    
};

const eliminarArea =  async (req, res) => {
    const id = parseInt(req.params.idarea);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,24);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM area where idarea = $1', [
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
   crearArea,
   obtenerAreas,
   actualizarArea,
   eliminarArea,
};