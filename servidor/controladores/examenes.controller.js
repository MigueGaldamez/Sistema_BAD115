//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerExamenes = async(req,res)=>{
    try{
        sql = 'SELECT * FROM examen order by idexamen asc';
        const response = await sqlee.query(sql);
        examenes = response.rows;

        for(const examen of examenes){
            sql2 = 'SELECT * FROM area where idarea=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[examen.idarea]);
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
    try{
        if(nombre==''){
            erroresC.nombre = "Este campo es obligatorio";  
            correcto =false;
        }
        if(area=='' || area<=0){
            erroresC.area = "Este campo es obligatorio";  
            correcto =false;
        }
        /*if(parametros.length<=0){
            erroresC.parametros = "Este campo es obligatorio";  
            correcto =false;
        }*/
        if(correcto==false)
        {
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })
        }else{
            const response = await sqlee.query('INSERT INTO examen(nombreexamen,idarea) VALUES ($1,$2)', [nombre,area]);
            
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
};

const actualizarExamen = async (req,res)=>{
    const id = req.body.idexamen;
    var { nombre,area,parametros } = req.body;
 
    try{
        registroSQL = 'SELECT * FROM examen where idexamen=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
        
        if(nombre==''){
            nombre = registro.nombreexamen;
        }
        if(area=='' || area<=0){
            area = registro.idarea;
        }
      
        sql = "UPDATE examen SET nombreexamen=$1, idarea=$2 WHERE idexamen=$3";
        const response = await sqlee.query(sql,[nombre,area,id]);
       
        res.status(200).json({
        poblacion:{response}
        })
    }catch(error){
        res.status(500).json(error);
    }
};

const eliminarExamen =  async (req, res) => {
    const id = parseInt(req.params.idexamen);
    try{
        await sqlee.query('DELETE FROM examen where idexamen = $1', [
            id
        ]);
        res.status(200).json('Eliminado satisfactoriamente');
    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
   crearExamen,
   obtenerExamenes,
   actualizarExamen,
   eliminarExamen,
};