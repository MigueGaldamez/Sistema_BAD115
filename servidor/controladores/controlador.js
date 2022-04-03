//ARCHIVO PARA CONECTARSE
const Pool = require('pg').Pool
const sqlee = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'adminadmin',
  database: 'aplicacion',
  port: '5432'
})
module.exports = {
  sqlee,
 };