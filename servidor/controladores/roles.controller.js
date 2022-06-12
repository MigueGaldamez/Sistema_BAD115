//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerRoles = async(req,res)=>{
    try{
        sql = 'SELECT * FROM rol order by idrol asc';
        const response = await sqlee.query(sql);
        roles = response.rows;
        for(const rol of roles){
            sql2 = 'SELECT * FROM permiso where idrol = ($1)';
            const responseHija = await sqlee.query(sql2,[rol.idrol]);
            valores =  responseHija.rows;
            var array = Object.keys(valores)
            .map(function(key) {
                return valores[key].idopcionpermiso;
            });
            rol.permisos = array;       
        }
        res.status(200).json(roles);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearRol =  async (req, res) => {
    const { nombre } = req.body;
    var erroresC ={};
    
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,42);
    if(permiso){
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
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

   
};

const actualizarRol = async (req,res)=>{
    const id = req.body.idrol;
    const { nombre } = req.body;
    
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,43);
    if(permiso){
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
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

    
};

const actualizarRolPermisos = async (req,res)=>{
    const id = req.body.idrol;
    const { permisos } = req.body;

    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,43);
    if(permiso){
        try{
            sql = "DELETE from permiso WHERE idrol=$1";
            const response = await sqlee.query(sql,[id]);
            //console.log(response.rows);
            for (const permiso of permisos) {
                sql2 = "Insert into permiso(idopcionpermiso,idrol) VALUES($1,$2)";
                const response2 = await sqlee.query(sql2,[permiso,id]);
            };
            sql2 = "Select from permiso WHERE idrol=$1";
            const response2 = await sqlee.query(sql2,[id]);
    
            res.status(200).json(response2.rows);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

    
};


const eliminarRol =  async (req, res) => {
    const idrol = parseInt(req.params.idrol);
    
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,44);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM rol where idrol = $1', [
                idrol
            ]);
            res.status(200).json(`Eliminado satisfactoriamente`);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

  
   
};

module.exports = {
   crearRol,
   obtenerRoles,
   actualizarRol,
   eliminarRol,
   actualizarRolPermisos,
};