const conexionMysql = require("../../config/index");
const bcryptjs = require("bcryptjs");

exports.postUsuario = async ( req, res ) => {

    //Obtenemos datos del body
    const datos = req.body;
    const { nombre, password, correo, rol } = datos;

    //Comprobar si existen todos los campos necesarios para llenar o crear un usuario

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    datos.password =  bcryptjs.hashSync( password, salt );
    datos.estado = true;

    //Nos conectamos a la base de datos
    const connection = await conexionMysql();

    //Setencia para agregar un nuevo usuario
    connection.query('INSERT INTO usuarios SET ?', datos, ( error, result) => {
        if(error)return error;

        res.json({
            ok: true,
            result
        });

    });

    //Cerramos la base de datos
    connection.end();
};

exports.getUsuarios = async ( req, res ) => {
    //Nos conectamos a la base de datos
    const connection = await conexionMysql();

    //Setencia para agregar un nuevo usuario
    connection.query('Select * from usuarios', (error, results, fields) => {

        if (error) return error;

        res.json({
            ok: true,
            results
        });
    
        //console.log('The solution is: ', results[0].solution);

    });

    //Cerramos la base de datos
    connection.end();
}