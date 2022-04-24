const { Router } = require('express');
const router = Router();

const { crearRol, obtenerRoles, actualizarRol, eliminarRol, } = require('../controladores/roles.controller');
const { crearDepartamento, obtenerDepartamentos, actualizarDepartamento, eliminarDepartamento, } = require('../controladores/departamentos.controller');
const { crearMunicipio, obtenerMunicipios, actualizarMunicipio, eliminarMunicipio, } = require('../controladores/municipios.controller');
const { crearPoblacion, obtenerPoblaciones, actualizarPoblacion, eliminarPoblacion, } = require('../controladores/poblaciones.controller');
const { crearLaboratorio, obtenerLaboratorios, actualizarLaboratorio, eliminarLaboratorio, } = require('../controladores/laboratorios.controller');
const { crearProfesion, obtenerProfesiones, actualizarProfesion, eliminarProfesion, } = require('../controladores/profesiones.controller');
const { crearOpcionPermiso, obtenerOpcionesPermisos, actualizarOpcionPermiso, eliminarOpcionPermiso, } = require('../controladores/opcionespermiso.controller');
const { crearArea, obtenerAreas, actualizarArea, eliminarArea, } = require('../controladores/areas.controller');

const { crearUnidad, obtenerUnidades, actualizarUnidad, eliminarUnidad, } = require('../controladores/unidades.controller');

const { crearEstadoCivil, obtenerEstadosCiviles, actualizarEstadoCivil, eliminarEstadoCivil, } = require('../controladores/estadosciviles.controller');


const { obtenerUsuarios, iniciarSesion,crearUsuario,actualizarUsuario,eliminarUsuario,} = require('../controladores/usuarios.controller');

//siempre poner una coma al final

//CRUD ROLES
router.get('/roles', obtenerRoles);
router.post('/roles', crearRol);
router.put('/roles', actualizarRol)
router.delete('/roles/:idrol', eliminarRol);

//CRUD DEPARTAMENTOS
router.get('/departamentos', obtenerDepartamentos);
router.post('/departamentos', crearDepartamento);
router.put('/departamentos', actualizarDepartamento)
router.delete('/departamentos/:iddepartamento', eliminarDepartamento);

//CRUD DEPARTAMENTOS
router.get('/municipios', obtenerMunicipios);
router.post('/municipios', crearMunicipio);
router.put('/municipios', actualizarMunicipio)
router.delete('/municipios/:idmunicipio', eliminarMunicipio);

//CRUD POBLACION
router.get('/poblaciones', obtenerPoblaciones);
router.post('/poblaciones', crearPoblacion);
router.put('/poblaciones', actualizarPoblacion)
router.delete('/poblaciones/:idpoblacion', eliminarPoblacion);

//CRUD USUARIOS
router.get('/usuarios', obtenerUsuarios);
router.post('/iniciarSesion', iniciarSesion)
router.post('/usuarios', crearUsuario);
router.put('/usuarios', actualizarUsuario)
router.delete('/usuarios/:idusuario', eliminarUsuario);


//CRUD LABORATORIOS
router.get('/laboratorios', obtenerLaboratorios);
router.post('/laboratorios', crearLaboratorio);
router.put('/laboratorios', actualizarLaboratorio)
router.delete('/laboratorios/:idlaboratorio', eliminarLaboratorio);

//CRUD PROFESIONES
router.get('/profesiones', obtenerProfesiones);
router.post('/profesiones', crearProfesion);
router.put('/profesiones', actualizarProfesion)
router.delete('/profesiones/:idprofesion', eliminarProfesion);

//CRUD OPCIONES PERMISOS
router.get('/opcionespermisos', obtenerOpcionesPermisos);
router.post('/opcionespermisos', crearOpcionPermiso);
router.put('/opcionespermisos', actualizarOpcionPermiso)
router.delete('/opcionespermisos/:idopcionpermiso', eliminarOpcionPermiso);

//CRUD AREAS
router.get('/areas', obtenerAreas);
router.post('/areas', crearArea);
router.put('/areas', actualizarArea)
router.delete('/areas/:idarea', eliminarArea);

//CRUD ESTADOS CIVILES
router.get('/estadosciviles', obtenerEstadosCiviles);
router.post('/estadosciviles', crearEstadoCivil);
router.put('/estadosciviles', actualizarEstadoCivil)
router.delete('/estadosciviles/:idestado', eliminarEstadoCivil);

//CRUD UNIDADES
router.get('/unidades', obtenerUnidades);
router.post('/unidades', crearUnidad);
router.put('/unidades', actualizarUnidad)
router.delete('/unidades/:idunidad', eliminarUnidad);

module.exports = router;