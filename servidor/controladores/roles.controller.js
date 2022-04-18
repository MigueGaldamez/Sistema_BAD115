//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerRoles = async(req,res)=>{
    try{
        sql = 'SELECT * FROM rol order by idrol asc';
        const response = await sqlee.query(sql);
        res.status(200).json(response.rows);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearRol =  async (req, res) => {
    const { nombre } = req.body;
    var erroresC ={};
    try{
        if(nombre==''){
            erroresC.nombre = "Este campo es obligatorio";
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })
        }else{
            const response = await sqlee.query('INSERT INTO rol (nombrerol) VALUES ($1)', [nombre]);
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                rol: {nombre}
                }
            })
        }
    }catch(error){
        res.status(500).json(error);
    }
};

const actualizarRol = async (req,res)=>{
    const id = req.body.idrol;
    const { nombre } = req.body;
    try{
        sql = "UPDATE rol SET nombrerol=$1 WHERE idrol=$2";
        const response = await sqlee.query(sql,[nombre,id]);
        res.status(200).json({
            "idrol":id,
            "nombre":nombre,
        })
    }catch(error){
        res.status(500).json(error);
    }
};

const eliminarRol =  async (req, res) => {
    const idrol = parseInt(req.params.idrol);
    try{
        await sqlee.query('DELETE FROM rol where idrol = $1', [
            idrol
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
};

module.exports = {
   crearRol,
   obtenerRoles,
   actualizarRol,
   eliminarRol,
};