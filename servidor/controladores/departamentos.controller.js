//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerDepartamentos = async(req,res)=>{
    sql = 'SELECT * FROM departamento order by iddepartamento asc';
    const response = await sqlee.query(sql);
    res.status(200).json(response.rows);
};

const crearDepartamento =  async (req, res) => {
    const { nombre } = req.body;
    var erroresC ={};
    if(nombre==''){
        erroresC.nombre = "Este campo es obligatorio";
        res.status(200).json({
            error:'hay error',
            errores: erroresC,
        })
    }else{
        const response =  await sqlee.query('INSERT INTO departamento (departamento) VALUES ($1)', [nombre]);
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                departamento: {nombre}
            }
        })
    }
};

const actualizarDepartamento = async (req,res)=>{
    const id = req.body.iddepartamento;
    const { nombre } = req.body;
    sql = "UPDATE departamento SET departamento=$1 WHERE iddepartamento=$2";
    const response = await sqlee.query(sql,[nombre,id]);
    res.status(200).json({
        "iddepartamento":id,
        "nombre":nombre,
    })
};

const eliminarDepartamento =  async (req, res) => {
    const id = parseInt(req.params.iddepartamento);
    await sqlee.query('DELETE FROM departamento where iddepartamento = $1', [
        id
    ]);
    res.json(`Eliminado satisfactoriamente`);
};

module.exports = {
   crearDepartamento,
   obtenerDepartamentos,
   actualizarDepartamento,
   eliminarDepartamento,
};