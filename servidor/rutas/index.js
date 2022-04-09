const { Router } = require('express');
const router = Router();

const { crearRol, obtenerRoles, actualizarRol, eliminarRol, } = require('../controladores/roles.controller');
const { crearDepartamento, obtenerDepartamentos, actualizarDepartamento, eliminarDepartamento, } = require('../controladores/departamentos.controller');
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

//CRUD USUARIOS
router.get('/usuarios', obtenerUsuarios);
router.post('/iniciarSesion', iniciarSesion)

module.exports = router;