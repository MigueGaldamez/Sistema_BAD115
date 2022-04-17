const { Router } = require('express');
const router = Router();

const { crearRol, obtenerRoles, actualizarRol, eliminarRol, } = require('../controladores/roles.controller');
const { crearDepartamento, obtenerDepartamentos, actualizarDepartamento, eliminarDepartamento, } = require('../controladores/departamentos.controller');
const { crearMunicipio, obtenerMunicipios, actualizarMunicipio, eliminarMunicipio, } = require('../controladores/municipios.controller');
const { crearPoblacion, obtenerPoblaciones, actualizarPoblacion, eliminarPoblacion, } = require('../controladores/poblaciones.controller');

const { obtenerUsuarios, iniciarSesion} = require('../controladores/usuarios.controller');
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

module.exports = router;