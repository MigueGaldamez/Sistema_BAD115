//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerUnidades = async(req,res)=>{
    try{
        sql = 'SELECT * FROM unidad order by idunidad asc';
        const response = await sqlee.query(sql);
        res.status(200).json(response.rows);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearUnidad =  async (req, res) => {
    const { nombre,simbolo} = req.body;
    var erroresC ={};
    var correcto = true;
    try{
        if(nombre==''){
            erroresC.nombre = "Este campo es obligatorio";  
            correcto =false;
        }
        if(simbolo==''){
            erroresC.simbolo = "Este campo es obligatorio";  
            correcto =false;
        }
        if(correcto==false)
        {
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })
        }else{
            const response = await sqlee.query('INSERT INTO unidad (nombreunidad,simbolo) VALUES ($1,$2)', [nombre,simbolo]);
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

const actualizarUnidad = async (req,res)=>{
    const id = req.body.idunidad;
    var { nombre,simbolo } = req.body;
 
    try{
        registroSQL = 'SELECT * FROM unidad where idunidad=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
        
        if(nombre==''){
            nombre = registro.nombreunidad;
        }
        if(simbolo==''){
            simbolo = registro.simbolo;
        }
      
        sql = "UPDATE unidad SET nombreunidad=$1, simbolo=$2 WHERE idunidad=$3";
        const response = await sqlee.query(sql,[nombre,simbolo,id]);
       
        res.status(200).json({
        poblacion:{response}
        })
    }catch(error){
        res.status(500).json(error);
    }
};

const eliminarUnidad =  async (req, res) => {
    const id = parseInt(req.params.idunidad);
    try{
        await sqlee.query('DELETE FROM unidad where idunidad = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
   crearUnidad,
   obtenerUnidades,
   actualizarUnidad,
   eliminarUnidad,
};