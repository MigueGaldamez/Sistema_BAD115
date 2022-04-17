//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerMunicipios = async(req,res)=>{
    sql = 'SELECT * FROM municipio order by idmunicipio asc';
    const response = await sqlee.query(sql);
    municipios = response.rows;

    for(const municipio of municipios){
        sql2 = 'SELECT * FROM departamento where iddepartamento=($1) limit 1';
        const responseHija = await sqlee.query(sql2,[municipio.iddepartamento]);
        municipio.departamento = responseHija.rows[0].departamento; 
      
    }
    res.status(200).json(response.rows);
};

const crearMunicipio =  async (req, res) => {
    const { nombre,departamento } = req.body;
    var erroresC ={};
    var correcto = true;
    if(nombre==''){
        erroresC.nombre = "Este campo es obligatorio";  
        correcto =false;
    }
    if(departamento==0){
        erroresC.departamento = "Este campo es obligatorio";
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
        const response =  await sqlee.query('INSERT INTO municipio (municipio,iddepartamento) VALUES ($1,$2)', [nombre,departamento]);
        res.status(200).json({
            message: 'Añadido con Exito',
            body: {
                departamento: response
            }
        })
    }
};

const actualizarMunicipio = async (req,res)=>{
    const id = req.body.idmunicipio;
    var { nombre,iddepartamento } = req.body;

    registroSQL = 'SELECT * FROM municipio where idmunicipio=$1 limit 1';
    const responseRe = await sqlee.query(registroSQL,[id]);
    registro = responseRe.rows[0];
    
    if(nombre==''){
        nombre = registro.municipio;
    }if(iddepartamento<=0){
        iddepartamento = registro.iddepartamento;
    }
    sql = "UPDATE municipio SET municipio=$1, iddepartamento=$2 WHERE idmunicipio=$3";
    const response = await sqlee.query(sql,[nombre,iddepartamento,id]);
    res.status(200).json({
        "iddepartamento":iddepartamento,
        "nombre":nombre,
        "idmunicipio":id,
    })
};

const eliminarMunicipio =  async (req, res) => {
    const id = parseInt(req.params.idmunicipio);
    await sqlee.query('DELETE FROM municipio where idmunicipio = $1', [
        id
    ]);
    res.json(`Eliminado satisfactoriamente`);
};

module.exports = {
   crearMunicipio,
   obtenerMunicipios,
   actualizarMunicipio,
   eliminarMunicipio,
};