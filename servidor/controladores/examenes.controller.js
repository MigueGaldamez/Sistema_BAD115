//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerExamenes = async(req,res)=>{
    try{
        sql = 'SELECT * FROM examen order by idexamen desc';
        const response = await sqlee.query(sql);

        examenes = response.rows;

        for(const examen of examenes){
            sql2 = 'SELECT * FROM area where idarea=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[examen.idarea]);
            examen.area = responseHija.rows[0].nombrearea; 

        }
        
        res.status(200).json(examenes);
    }catch(error){
        res.status(500).json(error);
    }
  
};


const crearExamen =  async (req, res) => {
    const {nombreexamen, area} = req.body;
    var erroresC ={};
    var correcto = true;
    try{
       
        
        if(area=='' || area==0){
            erroresC.area = "Este campo es obligatorio";  
            correcto =false;
        }
        if(nombreexamen==''){
            erroresC.nombreexamen = "Este campo es obligatorio";  
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
            const response =  await sqlee.query('INSERT INTO examen (idarea, nombreexamen) VALUES ($1,$2) RETURNING idexamen',
            [area, nombreexamen]);
            
            console.log(response);
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    examen: response
                }
            })
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const actualizarExamen = async (req,res)=>{
    const id = req.body.idexamen;
    //const completo = req.body.completo;
    var { idarea, nombreexamen } = req.body;
    var erroresC ={};
    var correcto = true;
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
};

// borrado logico 
const eliminarExamen =  async (req, res) => {
    const id = parseInt(req.params.idexamen);
    console.log(id);
    try{
       
        const response2 = await sqlee.query('UPDATE examen set estado = 0 where idexamen = $1', [
            id
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
};

module.exports = {
    obtenerExamenes,
    crearExamen,
    actualizarExamen,
    eliminarExamen,
};