//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

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
};

const actualizarOpcionPermiso = async (req,res)=>{
    const id = req.body.idopcionpermiso;
    var { nombre } = req.body;
 
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
};

const eliminarOpcionPermiso =  async (req, res) => {
    const id = parseInt(req.params.idopcionpermiso);
    try{
        await sqlee.query('DELETE FROM opcionpermiso where idopcionpermiso = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
   crearOpcionPermiso,
   obtenerOpcionesPermisos,
   actualizarOpcionPermiso,
   eliminarOpcionPermiso,
};