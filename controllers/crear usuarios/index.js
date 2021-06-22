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
        if(error)return res.status(400).json({ok: false, error});

        res.json({
            ok: true,
            result
        });

    });

    //Cerramos la base de datos
    connection.end();
};

exports.getUsuarioID = async ( req, res ) => {    
    const id = req.params.id;
    //Nos conectamos a la base de datos
    const connection = await conexionMysql();

    //Setencia para buscar un usuario por ID
    connection.query('Select * from usuarios WHERE id_usuario = ?', [id], (error, results, fields) => {

        if (error) return res.status(400).json({ok: false, error});

        res.json({
            ok: true,
            results
        });

    });

    connection.end();
}

exports.getUsuarios = async ( req, res ) => {
    //Nos conectamos a la base de datos
    const connection = await conexionMysql();

    //Setencia para buscar todos los usuarios agregados
    connection.query('Select * from usuarios', (error, results, fields) => {

        if (error) return res.status(400).json({ok: false, error});

        res.json({
            ok: true,
            results
        });
    
        //console.log('The solution is: ', results[0].solution);

    });

    //Cerramos la base de datos
    connection.end();
}

exports.putActualizarUsuario = async ( req, res ) => {

    const id = req.params.id;
    
    const datos = req.body;
    
    //const { nombre, correo } = datos;
    //Extra si se cambia la contraseña se tiene que cifrar de nuevo 
    
    const query =  `UPDATE usuarios set ? where id_usuario = ?`;

    const connection = await conexionMysql();

    connection.query(query, [ datos, id], ( error, results, fields) => {
        if( error ) res.status(400).json({ok: false, error});

        res.json({
            ok: true,
            results
        });
    });

    connection.end();
}

exports.deleteUsuario = async ( req, res ) => {

    const id = req.params.id;

    const connection = await conexionMysql();

    connection.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], ( error, results, field) => {
        if( error ) return res.status(400).json({ok: false, error});

        res.json({
            ok: true,
            results
        });
    });

    connection.end();

}