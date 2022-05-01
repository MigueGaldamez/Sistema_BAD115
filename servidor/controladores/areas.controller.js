//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerAreas = async(req,res)=>{
    try{
        sql = 'SELECT * FROM area order by idarea asc';
        const response = await sqlee.query(sql);
        res.status(200).json(response.rows);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearArea =  async (req, res) => {
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
};

const actualizarArea = async (req,res)=>{
    const id = req.body.idarea;
    var { nombre } = req.body;
 
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
        res.status(500).json(error);
    }
};

const eliminarArea =  async (req, res) => {
    const id = parseInt(req.params.idarea);
    try{
        await sqlee.query('DELETE FROM area where idarea = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
   crearArea,
   obtenerAreas,
   actualizarArea,
   eliminarArea,
};