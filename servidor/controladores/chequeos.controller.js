//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerChequeos = async(req,res)=>{
    try{
        sql = 'SELECT * FROM chequeo order by idchequeo desc';
        const response = await sqlee.query(sql);

        chequeos = response.rows;

        for(const chequeo of chequeos){
            sql2 = 'SELECT * FROM laboratorio where idlaboratorio=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[chequeo.idlaboratorio]);
            chequeo.laboratorio = responseHija.rows[0].nombrelaboratorio; 

            sql3 = 'SELECT * FROM paciente where idpaciente=($1) limit 1';
            const responseHija2 = await sqlee.query(sql3,[chequeo.idpaciente]);
            chequeo.paciente = responseHija2.rows[0].nombrepaciente; 

            //sql4 = 'SELECT * FROM contactoemergencia where idpaciente=($1) limit 1';
            //const responseHija3 = await sqlee.query(sql4,[paciente.idpaciente]);
            //paciente.contactoemergencia= responseHija3.rows[0]; 
        
            /*sql5 = 'SELECT * FROM detalleOrden where idChequeo=($1)';
            const responseHija4 = await sqlee.query(sql5,[chequeo.idchequeo]);
            chequeo.detalleOrden= responseHija4.rows; */
        }
        res.status(200).json(chequeos);
    }catch(error){
        res.status(500).json(error);
    }
  
};

const obtenerChequeosPaciente = async(req,res)=>{
    const idpaciente = req.body.idpaciente;
    try{
        sql = 'SELECT * FROM chequeo where idpaciente = $1 order by idchequeo desc';
        const response = await sqlee.query(sql, [idpaciente]);

        chequeos = response.rows;

        for(const chequeo of chequeos){
            sql2 = 'SELECT * FROM laboratorio where idlaboratorio=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[chequeo.idlaboratorio]);
            chequeo.laboratorio = responseHija.rows[0].nombrelaboratorio; 

            sql3 = 'SELECT * FROM paciente where idpaciente=($1) limit 1';
            const responseHija2 = await sqlee.query(sql3,[chequeo.idpaciente]);
            chequeo.paciente = responseHija2.rows[0].nombrepaciente; 

            //sql4 = 'SELECT * FROM contactoemergencia where idpaciente=($1) limit 1';
            //const responseHija3 = await sqlee.query(sql4,[paciente.idpaciente]);
            //paciente.contactoemergencia= responseHija3.rows[0]; 
        
            /*sql5 = 'SELECT * FROM detalleOrden where idChequeo=($1)';
            const responseHija4 = await sqlee.query(sql5,[chequeo.idchequeo]);
            chequeo.detalleOrden= responseHija4.rows; */
        }
        res.status(200).json(chequeos);
    }catch(error){
        res.status(500).json(error);
    }
  
};

const crearChequeo =  async (req, res) => {
    const {paciente, laboratorio, fechaChequeo, horaChequeo} = req.body;
    var erroresC ={};
    var correcto = true;
    try{
       
        if(paciente=='' || paciente==0){
            erroresC.paciente = "Este campo es obligatorio";  
            correcto =false;
        }
        if(laboratorio=='' || laboratorio==0){
            erroresC.laboratorio = "Este campo es obligatorio";  
            correcto =false;
        }
        if(fechaChequeo==''){
            console.log(fechaChequeo);
            erroresC.fechaChequeo = "Este campo es obligatorio";  
            correcto =false;
        }
        if(horaChequeo==''){
            erroresC.horaChequeo = "Este campo es obligatorio";
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
            const archivo = "nada";
            const response =  await sqlee.query('INSERT INTO chequeo (idpaciente, idlaboratorio, idUsuario, fechaChequeo, horaChequeo) VALUES ($1,$2, 1, $3,$4) RETURNING idchequeo',
            [paciente, laboratorio, fechaChequeo, horaChequeo]);
            
            
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    chequeo: response
                }
            })
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const actualizarChequeo = async (req,res)=>{
    const id = req.body.idchequeo;
    //const completo = req.body.completo;
    var { idlaboratorio, fechaChequeo, horaChequeo } = req.body;
    var erroresC ={};
    var correcto = true;
    try{
        registroSQL = 'SELECT * FROM chequeo where idchequeo=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];

        if(idlaboratorio=='' || idlaboratorio<=0){
            idlaboratorio = registro.idlaboratorio;
        }
        if(fechaChequeo=='' || fechaChequeo==null){
            fechaChequeo = registro.fechachequeo;
        }
        if(horaChequeo=='' || horaChequeo==null){
            horaChequeo = registro.horachequeo; 
        }
       
        sql = "UPDATE chequeo SET idlaboratorio=$1, fechaChequeo=$2, horaChequeo=$3 WHERE idchequeo=$4 ";
        const response = await sqlee.query(sql,[idlaboratorio,fechaChequeo,horaChequeo,id]);
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                chequeo: response
            }
        })
        
        
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const eliminarChequeo =  async (req, res) => {
    const id = parseInt(req.params.idchequeo);
    console.log(id);
    try{
       
        const response2 = await sqlee.query('DELETE FROM chequeo where idChequeo = $1', [
            id
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
};

module.exports = {
    obtenerChequeos,
    crearChequeo,
    actualizarChequeo,
    eliminarChequeo,
    obtenerChequeosPaciente,
};