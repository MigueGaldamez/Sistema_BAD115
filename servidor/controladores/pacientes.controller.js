//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerPacientes = async(req,res)=>{
    try{
        sql = 'SELECT * FROM paciente order by idpaciente asc';
        const response = await sqlee.query(sql);

        pacientes = response.rows;

        for(const paciente of pacientes){
            sql2 = 'SELECT * FROM municipio where idmunicipio=($1) limit 1';
            const responseHija = await sqlee.query(sql2,[paciente.idmunicipio]);
            paciente.municipio = responseHija.rows[0].municipio; 

            sql3 = 'SELECT * FROM estadocivil where idestado=($1) limit 1';
            const responseHija2 = await sqlee.query(sql3,[paciente.idestado]);
            paciente.estadocivil = responseHija2.rows[0].estadocivil; 
        
        }
        res.status(200).json(pacientes);
    }catch(error){
        res.status(500).json(error);
    }
  
};

const crearPaciente =  async (req, res) => {
    const {nombre,apellido,municipio,correo,estadoCivil,direccion,fechaNacimiento,numeros,identificadorEmergencias,numeroEmergencias } = req.body;
    var erroresC ={};
    var correcto = true;
    try{
       
        if(nombre==''){
            erroresC.nombre = "Este campo es obligatorio";  
            correcto =false;
        }
        if(apellido==''){
            erroresC.apellido = "Este campo es obligatorio";  
            correcto =false;
        }
        if(correo==''){
            erroresC.correo = "Este campo es obligatorio";  
            correcto =false;
        }
        if(municipio==0 || municipio == ''){
            erroresC.municipio = "Este campo es obligatorio";
            correcto =false;  
        }
        if(estadoCivil==0 || estadoCivil == ''){
            erroresC.estado = "Este campo es obligatorio";
            correcto =false;  
        }
        if(direccion==''){
            erroresC.direccion = "Este campo es obligatorio";
            correcto =false;  
        }
        if(fechaNacimiento==''){
            erroresC.fechaNacimiento = "Este campo es obligatorio";
            correcto =false;  
        }
        if(numeros.length<=0){
            erroresC.numero = "Debe ingresar al menos un número de contacto";
            erroresC.identificador = "Debe ingresar al menos un número de contacto";
            correcto =false;  
        }
        if(numeroEmergencias==''){
            erroresC.numeroEmergencias = "Este campo es obligatorio";
            correcto =false;  
        }
        if(identificadorEmergencias=='' || identificadorEmergencias<=0){
            erroresC.identificadorEmergencias = "Este campo es obligatorio";
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
            const response =  await sqlee.query('INSERT INTO paciente (nombrepaciente,idmunicipio,apellido,correoPaciente,idestado,direccion,fechanacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING idpaciente',
             [nombre,municipio,apellido,correo,estadoCivil,direccion,fechaNacimiento]);
             const response2 = await sqlee.query('INSERT INTO contactoemergencia (idpaciente,telefono,nombrecontacto) VALUES ($1,$2,$3)', 
             [response.rows[0].idpaciente,numeroEmergencias,identificadorEmergencias]);
             for(const numero of numeros){
                const response3 = await sqlee.query('INSERT INTO numerotelefono (idpaciente,numero,nombreidentificador) VALUES ($1,$2,$3)', 
                [response.rows[0].idpaciente,numero.numero,numero.identificador]);
             }
             res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    departamento: response
                }
            })
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const actualizarPaciente = async (req,res)=>{
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

const eliminarPaciente =  async (req, res) => {
    const id = parseInt(req.params.idpaciente);
    try{
       
        const response2 = await sqlee.query('DELETE FROM numerotelefono where idpaciente = $1', [
            id
        ]);
        const response3 = await sqlee.query('DELETE FROM contactoemergencia where idpaciente = $1', [
            id
        ]);
        const response = await sqlee.query('DELETE FROM paciente where idpaciente = $1', [
            id
        ]);
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
   
  
};

module.exports = {
   crearPaciente,
   obtenerPacientes,
   actualizarPaciente,
   eliminarPaciente,
};