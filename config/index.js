//Configurando conexion base de datos 
const mysql = require('mysql');


const conexionMysql = async () => {
    try {
        let connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'table-help'
        });
           
        await connection.connect( ( error ) => {
            if( error ){
                return error;
            }
            console.log("Estas conectado a la base mysql Table-help");
        });
          
        return connection;
        //connection.end();
    } catch (error) {
        console.log(error)
    }
};

module.exports = conexionMysql;