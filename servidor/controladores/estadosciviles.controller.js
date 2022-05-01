//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerEstadosCiviles = async(req,res)=>{
    try{
        sql = 'SELECT * FROM estadocivil order by idestado asc';
        const response = await sqlee.query(sql);
        res.status(200).json(response.rows);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearEstadoCivil =  async (req, res) => {
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
            const response = await sqlee.query('INSERT INTO estadocivil (estadocivil) VALUES ($1)', [nombre]);
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

const actualizarEstadoCivil = async (req,res)=>{
    const id = req.body.idestado;
    var { nombre } = req.body;
 
    try{
        registroSQL = 'SELECT * FROM estadocivil where idestado=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
        
        if(nombre==''){
            nombre = registro.estadocivil;
        }
      
        sql = "UPDATE estadocivil SET estadocivil=$1 WHERE idestado=$2";
        const response = await sqlee.query(sql,[nombre,id]);
       
        res.status(200).json({
        poblacion:{response}
        })
    }catch(error){
        res.status(500).json(error);
    }
};

const eliminarEstadoCivil =  async (req, res) => {
    const id = parseInt(req.params.idestado);
    try{
        await sqlee.query('DELETE FROM estadocivil where idestado = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
   crearEstadoCivil,
   obtenerEstadosCiviles,
   actualizarEstadoCivil,
   eliminarEstadoCivil,
};