//SIEMPRE PONERLO
const { sqlee } = require('./controlador');

const obtenerPermisosUsuario = async(req,res)=>{
    const id = req.params.idusuario;   
    console.log(req.headers.idusuario);
    try{
        sql = 'SELECT distinct idopcionpermiso from permiso where idrol in(SELECT idrol FROM detallerol where idusuario=$1)';
        const response = await sqlee.query(sql,[id]);

        permisos = response.rows;
        permisosArray  =[];
        for(const permiso of permisos){
            permisosArray.push(permiso.idopcionpermiso)
        }
     
        res.status(200).json(permisosArray);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
    
};

module.exports = {
    obtenerPermisosUsuario
 };