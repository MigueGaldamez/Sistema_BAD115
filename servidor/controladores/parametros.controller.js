//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

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
        }
        res.status(200).json(parametros);
    }catch(error){
        res.status(500).json(error);
    }
};

const crearParametro =  async (req, res) => {
    const { nombre,area,tipo,
        mensajePosi,mensajeNega,intervalos} = req.body;
    console.log(req.body);

    var correcto = true;
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
};

const actualizarParametro = async (req,res)=>{
    const id = req.body.idparametro;
    var { nombre,tipo,area } = req.body;
    console.log(req.body);
    try{
        registroSQL = 'SELECT * FROM parametro where idparametro=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
        
        if(nombre==''){
            nombre = registro.parametro;
        }if(area<=0){
            area = registro.idarea;
        }
        if(tipo<=0){
            tipo = registro.tipo
        }
        sql = "UPDATE parametro SET idarea=$1, tipo=$2, parametro=$3 WHERE idparametro=$4";
        const response = await sqlee.query(sql,[area,tipo,nombre,id]);
        res.status(200).json({
            "resultado":response
        })
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const eliminarParametro =  async (req, res) => {
    const id = parseInt(req.params.idparametro);
    try{
        await sqlee.query('DELETE FROM parametro where idparametro = $1', [
            id
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
};
const parametrosPorArea = async(req,res)=>{
    const id = parseInt(req.params.idarea); 
    try{
        sql = 'SELECT * FROM parametro  where idarea=$1 order by idparametro asc';
        const response = await sqlee.query(sql,[id]);
        parametros = response.rows;
        console.log(parametros);
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