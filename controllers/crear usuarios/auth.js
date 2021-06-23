const { googleVerify } = require("../../helpers/google-verify");
const { generarJWT } = require("../../helpers/generar-jwt");
const query = require("../../config/index");

//npm i google-auth-library
//npm i dotenv
exports.googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        //La siguiente linea esta causando un error
        const { correo, nombre, img } = await googleVerify( id_token );

        console.log("hola 2");

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