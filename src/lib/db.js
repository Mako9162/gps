//Conexión a la base de datos

const mysql = require('mysql');
require('dotenv').config();
// const connection = mysql.createPool({
  
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
// 	queueLimit: 0 
// });

// connection.connect(error =>{
//   if (error) throw error;
//   console.log('Conexión establecida con Base de Datos!!');
// });

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
	queueLimit: 0 
  });
  
  pool.getConnection((err,connection)=> {
	if(err)
	throw err;
	console.log('Conectado a Base de datos');
	connection.release();
  });

module.exports = pool;