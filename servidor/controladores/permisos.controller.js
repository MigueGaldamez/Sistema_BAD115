//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerPermisos = async(req,res)=>{
    try{
        sql = 'SELECT * FROM permiso';
        const response = await sqlee.query(sql);

        permisos = response.rows;

        for(const permiso of permisos){
            sql2 = 'SELECT * FROM rol where idrol=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[permiso.idrol]);
            permiso.rol = responseHija.rows[0].nombrerol; 
            permiso.inforol = responseHija.row[0];
        }
        res.status(200).json(permisos);
    }catch(error){
        res.status(500).json(error);
    }
    
};

const crearPermiso =  async (req, res) => {
    const { nombre,municipio } = req.body;
    var erroresC ={};
    var correcto = true;
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
};

const actualizarPermiso = async (req,res)=>{
    const id = req.body.idlaboratorio;
    var { nombre,idmunicipio } = req.body;
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
};

const eliminarPermiso =  async (req, res) => {
    const id = parseInt(req.params.idlaboratorio);
    try{
        const response = await sqlee.query('DELETE FROM laboratorio where idlaboratorio = $1', [
            id
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
   
  
};

module.exports = {
   crearPermiso,
   obtenerPermisos,
   actualizarPermiso,
   eliminarPermiso,
};