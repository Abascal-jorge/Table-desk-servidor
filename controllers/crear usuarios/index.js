const query = require("../../config/index");
const bcryptjs = require("bcryptjs");

exports.postUsuario = async ( req, res ) => {

    //Obtenemos datos del body
    const datos = req.body;
    const { nombre, password, correo, rol } = datos;
    console.log(datos);
    //Comprobar si existen todos los campos necesarios para llenar o crear un usuario

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    datos.password =  bcryptjs.hashSync( password, salt );
    datos.estado = true;

    //Setencia para agregar un nuevo usuario
    try {
        const usuario = await query('INSERT INTO usuarios SET ?', datos); 
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({ ok: false, error });
    }

};

exports.getUsuarioID = async ( req, res ) => {    
    const id = req.params.id;

    try {
        const usuario = await query('Select * from usuarios WHERE id_usuario = ?', [id]);
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({ ok: false, error });
    }
}

exports.getUsuarios = async ( req, res ) => {
    try {
        const usuario = await query('Select * from usuarios');
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({ ok: false, error });
    }
}


exports.putActualizarUsuario = async ( req, res ) => {

    const id = req.params.id;
    
    const datos = req.body;
    
    //const { nombre, correo } = datos;
    //Extra si se cambia la contraseña se tiene que cifrar de nuevo 
    
    try {
        const usuario = await query(`UPDATE usuarios set ? where id_usuario = ?`, [datos, id]);
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({ ok: false, error });
    }
}

exports.deleteUsuario = async ( req, res ) => {

    const id = req.params.id;

    try {
        const usuario = await query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({ok: false, error});
    }
}