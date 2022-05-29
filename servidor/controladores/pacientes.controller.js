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

            sql4 = 'SELECT * FROM contactoemergencia where idpaciente=($1) limit 1';
            const responseHija3 = await sqlee.query(sql4,[paciente.idpaciente]);
            paciente.contactoemergencia= responseHija3.rows[0]; 
        
            sql5 = 'SELECT * FROM numerotelefono where idpaciente=($1)';
            const responseHija4 = await sqlee.query(sql5,[paciente.idpaciente]);
            paciente.numeros= responseHija4.rows; 

        }
        res.status(200).json(pacientes);
    }catch(error){
        res.status(500).json(error);
    }
  
};

const obtenerPacienteExamenes = async(req,res)=>{
    try{
        sql = 'select chequeo.idchequeo as idcheq, nombrepaciente, apellido, fechanacimiento, count(chequeo.idchequeo) as cuenta ' +
        'from detallechequeo ' +
        'join chequeo on detallechequeo.idchequeo = chequeo.idchequeo ' +
        'join paciente on paciente.idpaciente = chequeo.idpaciente ' +
        'group by (chequeo.idchequeo, nombrepaciente, apellido, fechanacimiento) ' +
        'order by chequeo.idchequeo asc';
        //sql = 'select * from paciente';
        const response = await sqlee.query(sql);

        pacientes = response.rows;

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
    const id = req.body.idpaciente;
    const completo = req.body.completo;
    var { nombre,idmunicipio,apellido,direccion,fechaNacimiento,correo,estado,identificadorEmergencias,numeroEmergencias,contactos } = req.body;
    var erroresC ={};
    var correcto = true;
    try{
        registroSQL = 'SELECT * FROM paciente where idpaciente=$1 limit 1';
        const responseRe = await sqlee.query(registroSQL,[id]);
        registro = responseRe.rows[0];
       
        if(completo==1){
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
            if(idmunicipio==0 || idmunicipio == ''){
                erroresC.municipio = "Este campo es obligatorio";
                correcto =false;  
            }
            if(estado==0 || estado == ''){
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
            if(contactos.length<=0){
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
            }else{
                sql = "UPDATE paciente SET nombrepaciente=$1, apellido=$2, idmunicipio=$3, direccion=$4, fechanacimiento=$5,correopaciente=$6, idestado=$7 WHERE idpaciente=$8 ";
                const response = await sqlee.query(sql,[nombre,apellido,idmunicipio,direccion,fechaNacimiento,correo,estado,id]);
                
                sql2 = "UPDATE contactoemergencia SET telefono=$1, nombrecontacto=$2 WHERE idpaciente=$3 ";
                const response2 = await sqlee.query(sql2,[numeroEmergencias,identificadorEmergencias,id]);

                sql3 = "DELETE FROM numerotelefono WHERE idpaciente=$1 ";
                const response3 = await sqlee.query(sql3,[id]);
                
                for(const numero of contactos){
                    const response4 = await sqlee.query('INSERT INTO numerotelefono (idpaciente,numero,nombreidentificador) VALUES ($1,$2,$3)', 
                    [id,numero.numero,numero.nombreidentificador]);
                 }

                res.status(200).json({
                    message: 'Añadido con Exito',
                    body: {
                        paciente: response
                    }
                })
            }
        }else if(completo==0){
            if(nombre==''){
               nombre = registro.nombrepaciente;
            }
            if(apellido==''){
                apellido =registro.apellido;
            }
            if(idmunicipio==0 || idmunicipio == ''){
               idmunicipio = registro.idmunicipio;
            }
            if(estado==0 || estado == ''){
               estado = registro.idestado;  
            }
            sql = "UPDATE paciente SET nombrepaciente=$1, apellido=$2, idmunicipio=$3, idestado=$4 WHERE idpaciente=$5 ";
            const response = await sqlee.query(sql,[nombre,apellido,idmunicipio,estado,id]);
            res.status(200).json({
                message: 'Añadido con Exito',
                body: {
                    paciente: response
                }
            })
        }
        
        
    }catch(error){
        console.log(error);
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
   obtenerPacienteExamenes,
};