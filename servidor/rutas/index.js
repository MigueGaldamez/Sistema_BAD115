const { Router } = require('express');
const router = Router();

const { crearRol, obtenerRoles, actualiarRol, eliminarRol, } = require('../controladores/roles.controller');
const { crearDepartamento, obtenerDepartamentos, actualiarDepartamento, eliminarDepartamento, } = require('../controladores/departamentos.controller');

//CRUD ROLES
router.get('/roles', obtenerRoles);
router.post('/roles', crearRol);
router.put('/roles', actualiarRol)
router.delete('/roles/:idrol', eliminarRol);

//CRUD DEPARTAMENTOS
router.get('/departamentos', obtenerDepartamentos);
router.post('/departamentos', crearDepartamento);
router.put('/departamentos', actualiarDepartamento)
router.delete('/departamentos/:iddepartamento', eliminarDepartamento);

module.exports = router;