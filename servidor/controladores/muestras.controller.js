//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

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
};