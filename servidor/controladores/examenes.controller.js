//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerExamenes = async(req,res)=>{
    try{
        sql = 'SELECT * FROM examen order by idexamen desc';
        const response = await sqlee.query(sql);

        examenes = response.rows;

        for(const examen of examenes){
            sql2 = 'SELECT * FROM area where idarea=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[examen.idarea]);

            sql3 = 'SELECT idparametro FROM detalleexamen where idexamen=($1)';
            const responseHija3 = await sqlee.query(sql3,[examen.idexamen]);
            var parametros =[];
            for(const parametro of responseHija3.rows){
                parametros.push(parametro.idparametro)
            }
            examen.parametros = parametros;
            examen.area = responseHija.rows[0].nombrearea; 
        
        }
        res.status(200).json(examenes);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const crearExamen =  async (req, res) => {
    const { nombre,area,parametros} = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,54);
    if(permiso){
        try{
            if(nombre==''){
                erroresC.nombre = "Este campo es obligatorio";  
                correcto =false;
            }
            if(area=='' || area<=0){
                erroresC.area = "Este campo es obligatorio";  
                correcto =false;
            }
            if(parametros.length<=0){
                erroresC.parametros = "Este campo es obligatorio";  
                correcto =false;
            }
            if(correcto==false)
            {
                res.status(200).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }else{
                const response = await sqlee.query('INSERT INTO examen(nombreexamen,idarea) VALUES ($1,$2) returning idexamen', [nombre,area]);
                for(const parametro of parametros){
                    const response2 = await sqlee.query('INSERT INTO detalleexamen(idexamen,idparametro) VALUES ($1,$2)', [response.rows[0].idexamen,parametro]);
                }
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

const actualizarExamen = async (req,res)=>{
    const id = req.body.idexamen;
    //const completo = req.body.completo;
    var { idarea, nombreexamen } = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,55);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM examen where idexamen=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registro = responseRe.rows[0];
    
            if(nombreexamen==''){
                nombreexamen = registro.nombreexamen;
            }
            if(idarea=='' || idarea<=0){
                idarea = registro.idarea;
            }
           
            sql = "UPDATE examen SET idarea=$1, nombreexamen=$2 WHERE idexamen=$3 ";
            const response = await sqlee.query(sql,[idarea,nombreexamen,id]);
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    examen: response
                }
            })
            
            
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
   
};

// borrado logico 
const eliminarExamen =  async (req, res) => {
    const id = parseInt(req.params.idexamen);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,56);
    if(permiso){
        try{
            const response2 = await sqlee.query('UPDATE examen set estado = 0 where idexamen = $1', [
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
    obtenerExamenes,
    crearExamen,
    actualizarExamen,
    eliminarExamen,
};