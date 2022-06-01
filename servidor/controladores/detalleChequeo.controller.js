//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerOrdenes = async(req,res)=>{
    const id = parseInt(req.params.idchequeo);
    try{
        sql = 'SELECT detallechequeo.iddetalle as iddetalle, detallechequeo.idexamen as idexamen, detallechequeo.idchequeo as idchequeo, estadoexamen, fecharegistro, horaregistro, examen.idarea as idarea, nombreexamen, examen.idarea, nombrearea, chequeo.idpaciente as idpaciente, chequeo.idlaboratorio as idlaboratorio, usuario.idusuario as idusuario, nombreusuario, fechachequeo, horachequeo, archivo, estadochequeo, idestado, nombrepaciente, apellido, direccion, fechanacimiento, correopaciente, genero, idmuestra, observaciones, fechaingreso, horaingreso, nombrelaboratorio FROM detallechequeo ' + 
        'join examen on examen.idexamen = detallechequeo.idexamen ' + 
        'join area on area.idarea = examen.idarea ' + 
        'join chequeo on chequeo.idchequeo = detallechequeo.idchequeo ' +
        'join paciente on paciente.idpaciente = chequeo.idpaciente ' +
        'left join muestra on muestra.iddetalle = detallechequeo.iddetalle ' +
        'join laboratorio on laboratorio.idlaboratorio = chequeo.idlaboratorio ' +
        'join usuario on usuario.idusuario = chequeo.idusuario ' +
        'where chequeo.idchequeo = $1 ' +
        'order by detallechequeo.iddetalle desc';
        const response = await sqlee.query(sql, [id]);

        examenes = response.rows;
        
        res.status(200).json(examenes);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
};

const obtenerParametrosResultados = async(req,res)=>{
    const id = parseInt(req.params.idexamen);
    try{
        sql = 'select * from parametro ' +
        'join detalleexamen on detalleexamen.idparametro = parametro.idparametro ' +
        'where idexamen = $1';
        const response = await sqlee.query(sql, [id]);

        parametros = response.rows;

        res.status(200).json(parametros);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
};

const obtenerOpcionesResultados = async(req,res)=>{
    try{
        sql = 'select * from opcion';
        const response = await sqlee.query(sql);

        opciones = response.rows;

        res.status(200).json(opciones);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
};

const obtenerIntervalosResultados = async(req,res)=>{
    try{
        sql = 'select * from intervalo join unidad on unidad.idunidad = intervalo.idunidad';
        const response = await sqlee.query(sql);

        intervalos = response.rows;

        res.status(200).json(intervalos);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
};

const validarResultado =  async (req, res) => {
    const {tipo, idparametro, iddetalle, idopcion, valor, positivo, comentario, presencia} = req.body;
    var response = null;
    var erroresC ={};
    var correcto = true;
    try{
        
        const response1 =  await sqlee.query('select * from parametro where idparametro = $1 limit 1',[idparametro]);
        var parametro = response1.rows[0].parametro;
        
        if(tipo==1){
            if(idopcion==null || idopcion==0){
                erroresC.errorParametros = "Debe seleccionar una opción para el parametro de: " + parametro;  
                correcto =false;
            }
        } else if(tipo==2){
            if(valor=='' || valor==0){
                erroresC.errorParametros = "Debe ingresar un valor para el parametro de: " + parametro;  
                correcto =false;
            }
        }

        if(correcto==false)
        {
            
            res.status(200).json({
                error:'hay error',
                errores: erroresC,
            })

        } else {
            
            //console.log(idparametro);
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

const guardarResultado =  async (req, res) => {
    const {tipo, idparametro, iddetalle, valor, positivo, comentario, presencia, fecharegistro, horaregistro} = req.body;
    var idopcion = 0;
    var response = null;
    var erroresC ={};
    var correcto = true;
    try{
        

        if(tipo==1){
            // valor = 0;
            
            idopcion = valor;
            const response1 =  await sqlee.query('select * from opcion where idopcion = $1 limit 1',[idopcion]);
            var valorOpcion = response1.rows[0].opcion;

            response =  await sqlee.query('INSERT INTO resultado (idparametro, iddetalle, valor, positivo, opcion, comentario, presencia) '+
            'VALUES ($1,$2,$3,$4,$5,$6,$7) ',
            [idparametro, iddetalle, 0, positivo, valorOpcion, comentario, presencia]);
        
        } else if(tipo==2){
            var opcion ="";
            response =  await sqlee.query('INSERT INTO resultado (idparametro, iddetalle, valor, positivo, opcion, comentario, presencia) '+
            'VALUES ($1,$2,$3,$4,$5,$6,$7) ',
            [idparametro, iddetalle, valor, positivo, opcion, comentario, presencia]);
        
        }
        
        sql = "UPDATE detallechequeo SET estadoExamen=true, fecharegistro=$1, horaregistro=$2 WHERE iddetalle=$3 ";
        response = await sqlee.query(sql,[fecharegistro, horaregistro, iddetalle]);     
        
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                examen: 123
            }
        })
    
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const obtenerResultados = async(req,res)=>{
    const id = parseInt(req.params.iddetalle);
    try{
        sql = 'SELECT * from resultado ' +
        'where iddetalle = $1 ' +
        'order by iddetalle desc';
        const response = await sqlee.query(sql, [id]);

        examenes = response.rows;

        res.status(200).json(examenes);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
};

const actualizarResultado =  async (req, res) => {
    const {tipo, idparametro, iddetalle, valor, positivo, comentario, presencia, fecharegistro, horaregistro} = req.body;
    var idopcion = 0;
    var response = null;
    var erroresC ={};
    var correcto = true;
    try{
        

        if(tipo==1){
            idopcion = valor;
            const response1 =  await sqlee.query('select * from opcion where idopcion = $1 limit 1',[idopcion]);
            var valorOpcion = response1.rows[0].opcion;

            response =  await sqlee.query('UPDATE resultado SET opcion = $1, comentario = $2 WHERE iddetalle = $3 AND idparametro = $4',
            [valorOpcion, comentario, iddetalle, idparametro ]);
        
        } else if(tipo==2){

            response =  await sqlee.query('UPDATE resultado SET valor = $1, comentario = $2 WHERE iddetalle = $3 AND idparametro = $4',
            [valor, comentario, iddetalle, idparametro]);
        
        }

        sql = "UPDATE detallechequeo SET fecharegistro=$1, horaregistro=$2 WHERE iddetalle=$3 ";
        response = await sqlee.query(sql,[fecharegistro, horaregistro, iddetalle]); 
        
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                examen: 123
            }
        })
       
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const eliminarResultado =  async (req, res) => {
    const id = parseInt(req.params.iddetalle);
    try{
        const response = await sqlee.query('DELETE FROM resultado where iddetalle = $1', [id]);

        const response2 = await sqlee.query('UPDATE detallechequeo SET estadoExamen=false WHERE iddetalle = $1 ',[id]);   
        res.status(200).json(`Eliminado satisfactoriamente`);
    }catch(error){
        res.status(500).json(error);
    }
   
};

module.exports = {
    obtenerOrdenes,
    obtenerParametrosResultados,
    obtenerOpcionesResultados,
    validarResultado,
    guardarResultado,
    obtenerIntervalosResultados,
    obtenerResultados,
    actualizarResultado,
    eliminarResultado,
};