//Configurando conexion base de datos 
const mysql = require('mysql');

const pool = mysql.createPool({
    host     :  'localhost',
    user     :  'root',
    password :  '',
    database :  'table-help'
});
   

let query = ( sql, values ) =>  {
       // devolver una promesa
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
        
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    
                    // finaliza la sesión
                    connection.release()
                
                });
            }
      });
    });
}
  
module.exports = query;


/*
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
*/