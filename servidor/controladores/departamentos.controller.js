//SIEMPRE PONERLO
const {departamentoModel} = require("../modelos/departamento.model.js");
//PARA LOS ERRORES
const Ajv = require("ajv").default;
const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv);
const validate = ajv.compile(departamentoModel);
const {verificarPermiso} = require('./validarpermisos.controller');

const { sqlee } = require('./controlador');

const obtenerDepartamentos = async(req,res)=>{
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,5);
   //porque es una tabla catalogo
   if(true){
        try{
            sql = 'SELECT * FROM departamento order by iddepartamento asc';
            const response = await sqlee.query(sql);
            res.status(200).json(response.rows);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
};

const crearDepartamento =  async (req, res) => {
    const { nombre } = req.body;
    var erroresC ={};
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,6);
    if(permiso){
        try{
            if(!validate({nombre:nombre})){
                erroresC.nombre = validate.errors[0].message;
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
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

   
};

const actualizarDepartamento = async (req,res)=>{
    const id = req.body.iddepartamento;
    const { nombre } = req.body;
    var erroresC ={};
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,7);
    if(permiso){
        try{
            if(validate({nombre:nombre})){
                sql = "UPDATE departamento SET departamento=$1 WHERE iddepartamento=$2";
                const response = await sqlee.query(sql,[nombre,id]);
                res.status(200).json({
                    "iddepartamento":id,
                    "nombre":nombre,
                })
            }else{
                erroresC.nombre = validate.errors[0].message;
                res.status(500).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }
            
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
};

const eliminarDepartamento =  async (req, res) => {
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,8);
    if(permiso){
        const id = parseInt(req.params.iddepartamento);
        try{
            await sqlee.query('DELETE FROM departamento where iddepartamento = $1', [
                id
            ]);
            res.json(`Eliminado satisfactoriamente`);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
};

module.exports = {
   crearDepartamento,
   obtenerDepartamentos,
   actualizarDepartamento,
   eliminarDepartamento,
};