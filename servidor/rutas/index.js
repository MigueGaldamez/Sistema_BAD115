const { Router } = require('express');
const router = Router();

const { crearRol, obtenerRoles, actualizarRol, eliminarRol,actualizarRolPermisos, } = require('../controladores/roles.controller');
const { crearDepartamento, obtenerDepartamentos, actualizarDepartamento, eliminarDepartamento, } = require('../controladores/departamentos.controller');
const { crearMunicipio, obtenerMunicipios, actualizarMunicipio, eliminarMunicipio, } = require('../controladores/municipios.controller');
const { crearPoblacion, obtenerPoblaciones, actualizarPoblacion, eliminarPoblacion, } = require('../controladores/poblaciones.controller');
const { crearLaboratorio, obtenerLaboratorios, actualizarLaboratorio, eliminarLaboratorio, } = require('../controladores/laboratorios.controller');
const { crearProfesion, obtenerProfesiones, actualizarProfesion, eliminarProfesion, } = require('../controladores/profesiones.controller');
const { crearOpcionPermiso, obtenerOpcionesPermisos, actualizarOpcionPermiso, eliminarOpcionPermiso, } = require('../controladores/opcionespermiso.controller');
const { crearArea, obtenerAreas, actualizarArea, eliminarArea, } = require('../controladores/areas.controller');

const { crearUnidad, obtenerUnidades, actualizarUnidad, eliminarUnidad, } = require('../controladores/unidades.controller');
const { crearLaboratorista, obtenerLaboratoristas, actualizarLaboratorista, eliminarLaboratorista, } = require('../controladores/laboratoristas.controller');
const { crearPermiso, obtenerPermisos, actualizarPermiso, eliminarPermiso, } = require('../controladores/permisos.controller');
const { crearParametro, obtenerParametros, actualizarParametro, eliminarParametro,parametrosPorArea, } = require('../controladores/parametros.controller');

const { crearEstadoCivil, obtenerEstadosCiviles, actualizarEstadoCivil, eliminarEstadoCivil, } = require('../controladores/estadosciviles.controller');
const { crearPaciente, obtenerPacientes, actualizarPaciente, eliminarPaciente, } = require('../controladores/pacientes.controller');

const { obtenerChequeos, crearChequeo, actualizarChequeo, eliminarChequeo, /*obtenerChequeosPaciente,*/ } = require('../controladores/chequeos.controller');

const { obtenerUsuarios, iniciarSesion,crearUsuario,actualizarUsuario,actualizarUsuarioRoles,eliminarUsuario,obtenerUsuariosLibres} = require('../controladores/usuarios.controller');
const { crearExamen, obtenerExamenes, actualizarExamen, eliminarExamen, } = require('../controladores/examenes.controller');

//siempre poner una coma al final

//CRUD ROLES
router.get('/roles', obtenerRoles);
router.post('/roles', crearRol);
router.put('/roles', actualizarRol)
router.delete('/roles/:idrol', eliminarRol);
router.post('/rolesPermisos', actualizarRolPermisos);


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
router.get('/usuariosLibres', obtenerUsuariosLibres);
router.post('/iniciarSesion', iniciarSesion)
router.post('/usuarios', crearUsuario);
router.put('/usuarios', actualizarUsuario)
router.delete('/usuarios/:idusuario', eliminarUsuario);
router.post('/usuariosroles', actualizarUsuarioRoles);

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

//CRUD LABORATORISTAS
router.get('/laboratoristas', obtenerLaboratoristas);
router.post('/laboratoristas', crearLaboratorista);
router.put('/laboratoristas', actualizarLaboratorista)
router.delete('/laboratoristas/:idlaboratorista', eliminarLaboratorista);

//CRUD PERMISOS
router.get('/permisos', obtenerPermisos);
router.post('/permisos', crearPermiso);
router.put('/permisos', actualizarPermiso)
router.delete('/permisos/:idpermiso', eliminarPermiso);

//CRUD PACIENTES
router.get('/pacientes', obtenerPacientes);
router.post('/pacientes', crearPaciente);
router.put('/pacientes', actualizarPaciente)
router.delete('/pacientes/:idpaciente', eliminarPaciente);

//CRUD CHEQUEO
router.delete('/chequeos/:idchequeo', eliminarChequeo);
router.get('/chequeos', obtenerChequeos);
//router.get('/chequeos/:idpaciente', obtenerChequeosPaciente);
router.post('/chequeos', crearChequeo);
router.put('/chequeos', actualizarChequeo)

//CRUD PERMISOS
router.get('/parametros', obtenerParametros);
router.post('/parametros', crearParametro);
router.put('/parametros', actualizarParametro)
router.delete('/parametros/:idparametro', eliminarParametro);
router.get('/parametros_area/:idarea',parametrosPorArea);

//CRUD AREAS
router.get('/examenes', obtenerExamenes);
router.post('/examenes', crearExamen);
router.put('/examenes', actualizarExamen);
router.delete('/examenes/:idexamen', eliminarExamen);


module.exports = router;

