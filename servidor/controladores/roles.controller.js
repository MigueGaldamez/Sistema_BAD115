//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerRoles = async(req,res)=>{
    sql = 'SELECT * FROM rol order by idrol asc';
    const response = await sqlee.query(sql);
    res.status(200).json(response.rows);
};

const crearRol =  async (req, res) => {
    const { nombre } = req.body;
    var erroresC ={};
    if(nombre==''){
        erroresC.nombre = "Este campo es obligatorio";
        res.status(200).json({
            error:'hay error',
            errores: erroresC,
        })
    }else{
        const response = await sqlee.query('INSERT INTO rol (nombre) VALUES ($1)', [nombre]);
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                user: {nombre}
            }
        })
    }

};

const actualizarRol = async (req,res)=>{
    const id = req.body.idrol;
    const { nombre } = req.body;
    sql = "UPDATE rol SET nombre=$1 WHERE idrol=$2";
    const response = await sqlee.query(sql,[nombre,id]);
    res.status(200).json({
        "idrol":id,
        "nombre":nombre,
    })
};

const eliminarRol =  async (req, res) => {
    const idrol = parseInt(req.params.idrol);
    await sqlee.query('DELETE FROM rol where idrol = $1', [
        idrol
    ]);
    res.json(`Eliminado satisfactoriamente`);
};

module.exports = {
   crearRol,
   obtenerRoles,
   actualizarRol,
   eliminarRol,
};