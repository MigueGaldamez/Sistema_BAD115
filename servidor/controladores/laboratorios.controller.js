//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');

const obtenerLaboratorios = async(req,res)=>{
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,1);
   //porque es una tabla catalogo
   if(true){
        try{
            sql = 'SELECT * FROM laboratorio order by idlaboratorio asc';
            const response = await sqlee.query(sql);
    
            laboratorios = response.rows;
    
            for(const laboratorio of laboratorios){
                sql2 = 'SELECT * FROM municipio where idmunicipio=($1) limit 1';
                const responseHija = await sqlee.query(sql2,[laboratorio.idmunicipio]);
                laboratorio.municipio = responseHija.rows[0].municipio; 
            }
            res.status(200).json(laboratorios);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
        res.status(400).send('No tiene permisos para esta acción');
    }
    
};

const crearLaboratorio =  async (req, res) => {
    const { nombre,municipio } = req.body;
    var erroresC ={};
    var correcto = true;

    const id = req.params.idusuario;   
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,2);
    if(permiso){
        try{
            if(nombre==''){
                erroresC.nombre = "Este campo es obligatorio";  
                correcto =false;
            }
            if(municipio==0){
                erroresC.municipio = "Este campo es obligatorio";
                correcto =false;  
            }
            if(correcto==false)
            {
                res.status(200).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }
            else{
                const response =  await sqlee.query('INSERT INTO laboratorio (nombrelaboratorio,idmunicipio) VALUES ($1,$2)', [nombre,municipio]);
                res.status(200).json({
                    message: 'Añadido con Exito',
                    body: {
                        departamento: response
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

const actualizarLaboratorio = async (req,res)=>{
    const id = req.body.idlaboratorio;
    var { nombre,idmunicipio } = req.body;
  
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,3);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM laboratorio where idlaboratorio=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(nombre==''){
                nombre = registro.nombrelaboratorio;
            }if(idmunicipio<=0){
                idmunicipio = registro.idmunicipio;
            }
            sql = "UPDATE laboratorio SET nombrelaboratorio=$1, idmunicipio=$2 WHERE idlaboratorio=$3";
            const response = await sqlee.query(sql,[nombre,idmunicipio,id]);
            res.status(200).json({
                laboratorio:{response}
            })
        }catch(error){
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }

   
};

const eliminarLaboratorio =  async (req, res) => {
    const id = parseInt(req.params.idlaboratorio);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,4);
    if(permiso){
        try{
            const response = await sqlee.query('DELETE FROM laboratorio where idlaboratorio = $1', [
                id
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
   crearLaboratorio,
   obtenerLaboratorios,
   actualizarLaboratorio,
   eliminarLaboratorio,
};