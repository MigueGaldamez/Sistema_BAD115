//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');

const obtenerLaboratoristas = async(req,res)=>{
    try{
        sql = 'SELECT * FROM laboratorista order by idlaboratorista asc';
        const response = await sqlee.query(sql);
        laboratoristas = response.rows;
        for(const laboratorista of laboratoristas){
            sql2 = 'SELECT * FROM usuario where idusuario=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[laboratorista.idusuario]);
            laboratorista.usuario = responseHija.rows[0].nombreusuario;
            laboratorista.infousuario = responseHija.rows[0]; 

            sql3 = 'SELECT * FROM profesion where idprofesion=($1) limit 1';
            const responseHija3 = await sqlee.query(sql3,[laboratorista.idprofesion]);
            laboratorista.profesion = responseHija3.rows[0].nombreprofesion;
            laboratorista.infoprofesion = responseHija3.rows[0]; 
        
        }
        res.status(200).json(laboratoristas);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearLaboratorista =  async (req, res) => {
    const {nuevo} =req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,34);
    if(permiso){
        if(nuevo ==1){
            const { nombre,correo,contrasenia,estado,laboratorio,confirmarC,profesion,numeroJunta,} = req.body;
            var erroresC ={};
            var correcto = true;
            try{
                if(nombre==''){
                    erroresC.nombre = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(laboratorio<=0){
                    erroresC.laboratorio = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(numeroJunta==''){
                    erroresC.numeroJunta = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(profesion<=0){
                    erroresC.profesion = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(correo==""){
                    erroresC.correo = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(contrasenia==""){
                    erroresC.contrasenia = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(confirmarC==""){
                    erroresC.confirmarC = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(contrasenia!=confirmarC){
                    erroresC.confirmarC = "Contraseñas no coinciden";  
                    correcto =false;
                }
                
                if(correcto==false)
                {
                    res.status(200).json({
                        error:'hay error',
                        errores: erroresC,
                    })
                }else{
                    const response = await sqlee.query('INSERT INTO usuario (idlaboratorio,contrasenia,estado,nombreusuario,correousuario) VALUES ($1,$2,$3,$4,$5) RETURNING idusuario', 
                    [laboratorio,contrasenia,estado,nombre,correo]);
                    const response2 = await sqlee.query('INSERT INTO laboratorista (idusuario,idprofesion,numerojuntavigilacia) VALUES ($1,$2,$3)', 
                    [response.rows[0].idusuario,profesion,numeroJunta]);
                    res.status(200).json({
                        message: 'Añadido con Exito',
                        body: {
                        usuario: {response2}
                        }
                    })
                    
                }
            }catch(error){
                console.log(error);
                res.status(500).json(error);
            }
           
        }
        if(nuevo ==0){
            const { usuario,profesion,numeroJunta,} = req.body;
            var erroresC ={};
            var correcto = true;
            try{
                
                if(usuario<=0){
                    erroresC.usuario = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(numeroJunta==''){
                    erroresC.numeroJunta = "Este campo es obligatorio";  
                    correcto =false;
                }
                if(profesion<=0){
                    erroresC.profesion = "Este campo es obligatorio";  
                    correcto =false;
                }
                
                if(correcto==false)
                {
                    res.status(200).json({
                        error:'hay error',
                        errores: erroresC,
                    })
                }else{
                    const response2 = await sqlee.query('INSERT INTO laboratorista (idusuario,idprofesion,numerojuntavigilacia) VALUES ($1,$2,$3)', 
                    [usuario,profesion,numeroJunta]);
                    res.status(200).json({
                        message: 'Añadido con Exito',
                        body: {
                        usuario: {response2}
                        }
                    })
                    
                }
            }catch(error){
                console.log(error);
                res.status(500).json(error);
            }
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

const actualizarLaboratorista = async (req,res)=>{
    const id = req.body.idlaboratorista;
    var { numerojunta,usuario,profesion } = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,35);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM laboratorista where idlaboratorista=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
            
            if(usuario<=0){
                usuario = registro.idusuario;
            }
            if(profesion<=0){
                profesion = registro.idprofesion;
            }
            if(numerojunta==''){
                numerojunta = registro.numerojuntavigilacia;
            }
            sql = "UPDATE laboratorista SET idusuario=$1, idprofesion=$2, numerojuntavigilacia=$3 WHERE idlaboratorista=$4";
            const response = await sqlee.query(sql,[usuario,profesion,numerojunta,id]);
           
            res.status(200).json({
            poblacion:{response}
            })
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

const eliminarLaboratorista =  async (req, res) => {
    const id = parseInt(req.params.idlaboratorista);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,36);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM laboratorista where idlaboratorista = $1', [
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
   crearLaboratorista,
   obtenerLaboratoristas,
   actualizarLaboratorista,
   eliminarLaboratorista,
};