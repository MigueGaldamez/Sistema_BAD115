//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerDepartamentos = async(req,res)=>{
    sql = 'SELECT * FROM departamento order by iddepartamento asc';
    const response = await sqlee.query(sql);
    res.status(200).json(response.rows);
};

const crearDepartamento =  async (req, res) => {
    const { nombre } = req.body;
    const response = await sqlee.query('INSERT INTO departamento (nombre) VALUES ($1)', [nombre]);
    res.json({
        message: 'Añadido con Exito',
        body: {
            user: {nombre}
        }
    })
};

const actualiarDepartamento = async (req,res)=>{
    const id = req.body.iddepartamento;
    const { nombre } = req.body;
    sql = "UPDATE departamento SET nombre=$1 WHERE iddepartamento=$2";
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
   actualiarDepartamento,
   eliminarDepartamento,
};