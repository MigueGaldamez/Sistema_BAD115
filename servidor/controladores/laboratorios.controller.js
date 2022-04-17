//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerLaboratorios = async(req,res)=>{
    sql = 'SELECT * FROM laboratorio order by idlaboratorio asc';
    const response = await sqlee.query(sql);

    laboratorios = response.rows;

    for(const laboratorio of laboratorios){
        sql2 = 'SELECT * FROM municipio where idmunicipio=($1) limit 1';
        const responseHija = await sqlee.query(sql2,[laboratorio.idmunicipio]);
        laboratorio.municipio = responseHija.rows[0].municipio; 
      
    }

    res.status(200).json(laboratorios);
};

const crearLaboratorio =  async (req, res) => {
    const { nombre,municipio } = req.body;
    var erroresC ={};
    var correcto = true;
    if(nombre==''){
        erroresC.nombre = "Este campo es obligatorio";  
        correcto =false;
    }
    if(municipio==0){
        erroresC.municipio = "Este campo es obligatorio";
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
        const response =  await sqlee.query('INSERT INTO laboratorio (nombrelaboratorio,idmunicipio) VALUES ($1,$2)', [nombre,municipio]);
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                departamento: response
            }
        })
    }
};

const actualizarLaboratorio = async (req,res)=>{
    const id = req.body.idlaboratorio;
    var { nombre,idmunicipio } = req.body;

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
};

const eliminarLaboratorio =  async (req, res) => {
    const id = parseInt(req.params.idlaboratorio);
    await sqlee.query('DELETE FROM laboratorio where idlaboratorio = $1', [
        id
    ]);
    res.json(`Eliminado satisfactoriamente`);
};

module.exports = {
   crearLaboratorio,
   obtenerLaboratorios,
   actualizarLaboratorio,
   eliminarLaboratorio,
};