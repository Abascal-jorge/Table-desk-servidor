const { googleVerify } = require("../../helpers/google-verify");
const { generarJWT } = require("../../helpers/generar-jwt");
const query = require("../../config/index");
const bcryptjs = require("bcryptjs");

exports.correoSing = async ( req, res ) => {
    const { correo, password } = req.body;

    try {
        
        //Verificamos si el correo existe en los usuarios de la base de datos
        const usuario = await query('Select * from usuarios WHERE correo = ?', correo);

        //Si existe traemos los datos del usuario y comparamos contraseñas si son igual mandamos token si no son iguales retornamos un mensaje de falla de contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario[0].password);
    
        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        //Hay que generar el token y retornarlo junto con el usuario;
        res.json({
            usuario
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
}


//npm i google-auth-library
//npm i dotenv
exports.googleSignin = async( req, res ) => {
    const { id_token } = req.body;
    console.log(id_token);
    try {
        //La siguiente linea esta causando un error
        const { correo, nombre, img } = await googleVerify( id_token );
        //Buscar en base de datos si existe el correo, de existir no puede iniciar con google
        //Esto es con mongo db pasar a mysql
        let usuario;
        //Setencia para buscar un usuario por ID
        usuario = await query('Select * from usuarios WHERE correo= ? ', [correo]);
        if( usuario.length === 0 ){
            //Si no existe el usuario crear usuario nuevo
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: "USER_ROLE",
                google: true
            };

            //Setencia para agregar un nuevo usuario
            try {
                const usuario = await query('INSERT INTO usuarios SET ?', data); 
                res.json({
                    ok: true,
                    usuario
                });
            } catch (error) {
                return res.status(400).json({ ok: false, error });
            } 
        }


        //Si el usuario existe y si estado esta en false retorna con mensaje
        // Si el usuario en DB tiene google en false
        if ( !usuario[0].google ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }


        //Si el usuario existe o se crea con google true se genera un nuevo token
        // Generar el JWT
        const token = await generarJWT( usuario[0].id_usuario );
        
        res.json({
            usuario,
            token
        });
     
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido',
            error
        })
    
    }


}

exports.facebookSignin = async( req, res ) => {
    const datos = req.body;  // Datos debe traer correo, img, nombre || rol facebook password google lo agregamos
    const { correo, img, nombre } = datos;
    let usuario;
    usuario = await query("select * from usuarios where correo=?",[correo]);

    //Si no existe el usuario lo agrega a la base de datos
    if( usuario.length === 0 ){
        const infoUsuario = {
            correo,
            img,
            nombre,
            password: ":D",
            google: false,
            facebook: true,
            rol: "USER_ROL"
        }

        try {
            usuario = await query('INSERT INTO usuarios SET ?', infoUsuario);
            //Vuelvo a buscar en la base de datos el usuario ahora que ya se creo para tener esta variable con el usuario creado
            usuario = await query("select * from usuarios where correo=?",[correo]);
            //mensaje  guia
            console.log("Paso por aqui");
        } catch (error) {
            return res.status(400).json({ ok: false, error });
        }  
    }

    //Si ya existe el usuario revisar si facebook esta en true, si no esta en true retornar mensaje
    if ( !usuario[0].facebook ) {
        return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'
        });
    }
    //Crear json web token
    //Si el usuario existe o se crea con facebook true se genera un nuevo token
    const token = await generarJWT( usuario[0].id_usuario );
        
    return res.json({
        usuario,
        token
    });

}