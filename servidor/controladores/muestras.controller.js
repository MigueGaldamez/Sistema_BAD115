//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerMuestras = async(req,res)=>{
    try{
        //sql = 'SELECT detallechequeo.iddetalle as iddetalle, detallechequeo.idexamen as idexamen, detallechequeo.idchequeo as idchequeo, estadoexamen, fecharegistro, horaregistro, examen.idarea as idarea, nombreexamen, examen.idarea, nombrearea, chequeo.idpaciente as idpaciente, chequeo.idlaboratorio as idlaboratorio, usuario.idusuario as idusuario, nombreusuario, fechachequeo, horachequeo, archivo, estadochequeo, idestado, nombrepaciente, apellido, direccion, fechanacimiento, correopaciente, genero, idmuestra, observaciones, fechaingreso, horaingreso, nombrelaboratorio FROM detallechequeo ' + 
        sql = 'SELECT * FROM detallechequeo ' + 
        'join examen on examen.idexamen = detallechequeo.idexamen ' + 
        'join area on area.idarea = examen.idarea ' + 
        'join chequeo on chequeo.idchequeo = detallechequeo.idchequeo ' +
        'join paciente on paciente.idpaciente = chequeo.idpaciente ' +
        'left join muestra on muestra.iddetalle = detallechequeo.iddetalle ' +
        'join laboratorio on laboratorio.idlaboratorio = chequeo.idlaboratorio ' +
        'order by detallechequeo.iddetalle desc';
        const response = await sqlee.query(sql);
        
        res.status(200).json(response.rows);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const crearMuestra =  async (req, res) => {
    const {observaciones, horaIngreso, fechaIngreso, iddetalle} = req.body;
    var response = null;
    var erroresC ={};
    var correcto = true;

    try{
        if(observaciones==null || observaciones==''){
            erroresC.observaciones = "Este campo es obligatorio ";  
            correcto =false;
        } 

        if(correcto==false)
        {
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })

        } else {

            response =  await sqlee.query('INSERT INTO muestra (iddetalle, observaciones, fechaingreso, horaingreso) VALUES ($1,$2,$3,$4) ',
            [iddetalle, observaciones, fechaIngreso, horaIngreso]);

            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    examen: 123
                }
            })
        }
        
    
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};


const eliminarMuestra =  async (req, res) => {
    const id = parseInt(req.params.iddetalle);
    try{
        const response = await sqlee.query('DELETE FROM muestra where iddetalle = $1', [id]);

        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
};

module.exports = {
    crearMuestra,
    eliminarMuestra,
    obtenerMuestras,
};