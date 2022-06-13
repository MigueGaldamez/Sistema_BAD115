//SIEMPRE PONERLO
const { sqlee } = require('./controlador');
const {verificarPermiso} = require('./validarpermisos.controller');
const obtenerParametros = async(req,res)=>{
    try{
        sql = 'SELECT * FROM parametro order by idparametro asc';
        const response = await sqlee.query(sql);
        parametros = response.rows;
        for(const parametro of parametros){
            sql2 = 'SELECT * FROM area where idarea=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[parametro.idarea]);
            parametro.area = responseHija.rows[0].nombrearea;
            
            sql3 = 'SELECT * FROM intervalo where idparametro=($1)';
            const responseHija2 = await sqlee.query(sql3,[parametro.idparametro]);
            parametro.intervalos = responseHija2.rows; 

            sql4 = 'SELECT * FROM opcion where idparametro=($1)';
            const responseHija4 = await sqlee.query(sql4,[parametro.idparametro]);
            parametro.opciones = responseHija4.rows; 
        }
        res.status(200).json(parametros);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const crearParametro =  async (req, res) => {
    const { nombre,area,tipo, mensajePosi,mensajeNega,intervalos,opciones} = req.body;
    var erroresC ={};
    var correcto = true;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,62);
    if(permiso){   
        try{
            if(nombre==''){
                erroresC.nombre = "Este campo es obligatorio";  
                correcto =false;
            }
            if(area==0){
                erroresC.area = "Este campo es obligatorio";
                correcto =false;  
            }
            if(tipo==''){
                erroresC.tipo = "Este campo es obligatorio";
                correcto =false;  
            }
            if(mensajePosi==''){
                erroresC.mensajePosi = "Este campo es obligatorio";
                correcto =false;  
            }
            if(mensajeNega==''){
                erroresC.mensajeNega = "Este campo es obligatorio";
                correcto =false;  
            }
            if(tipo==1){
            if(intervalos.length<= 0){
                    errores.intervalos ="Debe de ingresar al menos un intervalo";
                    correcto =false;
            }
            }
            if(correcto==false)
            {
                res.status(200).json({
                    error:'hay error',
                    errores: erroresC,
                })
            }
            else{
                const response =  await sqlee.query('INSERT INTO parametro (idarea,parametro,tipo) VALUES ($1,$2,$3)  RETURNING idparametro', [area,nombre,tipo]);
                if(tipo==1){
                    for(const intervalo of intervalos){
                        const response2 = await sqlee.query('INSERT INTO intervalo (idparametro,idunidad,idpoblacion,comentariopositivo,comentarionegativo,valormaximo,valorminimo) VALUES($1,$2,$3,$4,$5,$6,$7)',[
                            response.rows[0].idparametro,intervalo.idunidad,intervalo.id,mensajePosi,mensajeNega,intervalo.maxval,intervalo.minval
                        ]);
                    }
                }
                if(tipo==2){
                    for(const opcion of opciones){
                        const response2 = await sqlee.query('INSERT INTO opcion (idparametro,opcion,referencia) VALUES($1,$2,$3)',[
                            response.rows[0].idparametro,opcion.opcion,opcion.referencia
                        ]);
                    }
                }
                
                res.status(200).json({
                    message: 'Añadido con Exito',
                    body: {
                    parametro: response
                    }
                })
            }
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
};

const actualizarParametro = async (req,res)=>{
    const id = req.body.idparametro;
    var { nombre,tipo,area,intervalos, mensajeNega,mensajePosi,opciones} = req.body;
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,63);
    if(permiso){
        try{
            registroSQL = 'SELECT * FROM parametro where idparametro=$1 limit 1';
            const responseRe = await sqlee.query(registroSQL,[id]);
            registroSQL2 = 'SELECT * FROM intervalo where idparametro=$1 limit 1';
            const responseRe2 = await sqlee.query(registroSQL2,[id]);
            registro = responseRe.rows[0];
            registro2 = responseRe2.rows[0];
            
            if(nombre==''){
                nombre = registro.parametro;
            }if(area<=0){
                area = registro.idarea;
            }
            if(tipo<=0){
                tipo = registro.tipo
            }
            if(mensajeNega==''){
                mensajeNega = registro2.comentarionegativo;
            }
            if(mensajePosi==''){
                mensajePosi = registro2.comentariopositivo;
            }
            sql = "UPDATE parametro SET idarea=$1, tipo=$2, parametro=$3 WHERE idparametro=$4";
            const response = await sqlee.query(sql,[area,tipo,nombre,id]);
            if(tipo==1){
                sql3 = "DELETE FROM intervalo WHERE idparametro=$1";
                const response3 = await sqlee.query(sql3,[id]);
                for(const opcion of opciones){
                    const response2 = await sqlee.query('INSERT INTO opcion (idparametro,opcion,referencia) VALUES($1,$2,$3)',[
                        id,opcion.opcion,opcion.referencia
                    ]);
                }
            }
            if(tipo==2){
                sql3 = "DELETE FROM opcion WHERE idparametro=$1";
                const response3 = await sqlee.query(sql3,[id]);
                for(const intervalo of intervalos){
                    const response2 = await sqlee.query('INSERT INTO opcion (idparametro,idunidad,idpoblacion,comentariopositivo,comentarionegativo,valormaximo,valorminimo) VALUES($1,$2,$3,$4,$5,$6,$7)',[
                        id,intervalo.idunidad,intervalo.id,mensajePosi,mensajeNega,intervalo.maxval,intervalo.minval
                    ]);
                }
            }
           
            res.status(200).json({
                "resultado":response
            })
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }else{
      res.status(400).send('No tiene permisos para esta acción');
    }
};

const eliminarParametro =  async (req, res) => {
    const id = parseInt(req.params.idparametro);
    const idusuario = req.headers.idusuario;
    //segundo parametro es la opcion
    let permiso = await verificarPermiso(idusuario,1);
    if(permiso){
        try{
            await sqlee.query('DELETE FROM opcion where idparametro=$1', [
                id
            ]);
            await sqlee.query('DELETE FROM intervalo where idparametro=$1', [
                id
            ]);
            await sqlee.query('DELETE FROM parametro where idparametro = $1', [
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
const parametrosPorArea = async(req,res)=>{
    const id = parseInt(req.params.idarea); 
    try{
        sql = 'SELECT * FROM parametro  where idarea=$1 order by idparametro asc';
        const response = await sqlee.query(sql,[id]);
        parametros = response.rows;
        for(const parametro of parametros){
            sql2 = 'SELECT * FROM area where idarea=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[parametro.idarea]);
            parametro.area = responseHija.rows[0].nombrearea; 
        
        }
        res.status(200).json(parametros);
    }catch(error){
        res.status(500).json(error);
    }
}
module.exports = {
   crearParametro,
   obtenerParametros,
   actualizarParametro,
   eliminarParametro,
   parametrosPorArea,
};