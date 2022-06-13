//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerPoblaciones = async(req,res)=>{
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,13);
    //porque es una tabla catalogo
    if(true){
        try{
            sql = 'SELECT * FROM poblacion order by idpoblacion asc';
            const response = await sqlee.query(sql);
            res.status(200).json(response.rows);
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
  
};

const crearPoblacion =  async (req, res) => {
    const { nombre,edadminimo,edadmaximo } = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,14);
    if(permiso){
        try{
            if(nombre==''){
                erroresC.nombre = "Este campo es obligatorio";  
                correcto =false;
            }
            if(edadminimo<0){
                erroresC.edadminimo = "Debe ingresar un valor mayor o igual que 0";
                correcto =false;  
            }
            if(edadmaximo<=0){
                erroresC.edadmaximo = "Debe ingresar un valor mayor que 0";
                correcto =false;  
            }
            if(edadmaximo<=edadminimo){
                erroresC.edadmaximo = "La edad minima no puede ser mayor a la maxima";
                correcto =false;  
            }
            if(correcto==false)
            {
                res.status(200).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }else{
                const response = await sqlee.query('INSERT INTO poblacion (poblacion,edadminimo,edadmaximo) VALUES ($1,$2,$3)', [nombre,edadminimo,edadmaximo]);
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
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
 
};

const actualizarPoblacion = async (req,res)=>{
    const id = req.body.idpoblacion;
    var { nombre,edadmaximo,edadminimo } = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,15);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM poblacion where idpoblacion=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(nombre==''){
                nombre = registro.poblacion;
            }if(edadmaximo<=0){
                edadmaximo= registro.edadmaximo;
            }
            if(edadminimo<0){
                edadminimo= registro.edadminimo;
            }
           
            if(parseInt(edadmaximo)<=parseInt(edadminimo)){
                edadmaximo= registro.edadmaximo;
                edadminimo= registro.edadminimo;
            }
    
            sql = "UPDATE poblacion SET poblacion=$1, edadminimo=$2, edadmaximo=$3 WHERE idpoblacion=$4";
            const response = await sqlee.query(sql,[nombre,edadminimo,edadmaximo,id]);
            res.status(200).json({
            poblacion:{response}
            })
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
    
};

const eliminarPoblacion =  async (req, res) => {
    const id = parseInt(req.params.idpoblacion);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,16);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM poblacion where idpoblacion = $1', [
                id
            ]);
            res.status(200).json('Eliminado satisfactoriamente');
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
    
};

module.exports = {
   crearPoblacion,
   obtenerPoblaciones,
   actualizarPoblacion,
   eliminarPoblacion,
};