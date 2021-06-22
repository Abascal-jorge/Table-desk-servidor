const google = require("../../helpers/google-verify");
//const jsonweb = require("../../helpers/generar-jwt");
const query = require("../../config/index");

//npm i google-auth-library
//npm i dotenv
exports.googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    //try {
        //const { correo, nombre, img } = await google.googleVerify( id_token );

        //Buscar en base de datos si existe el correo, de existir no puede iniciar con google
        //Esto es con mongo db pasar a mysql
        let correo = "redes.ply@costamed.com.mx";
        let usuario;

        //Setencia para buscar un usuario por ID
        usuario = await query('Select * from usuarios WHERE correo= ? ', [correo]);
        
        if( usuario ){
            //Ya entra
            console.log(usuario);
        }

        //Si no existe agregarlo a la base de datos con google true
        /*
        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario( data );
            try {
                await usuario.save();   
            } catch (error) {
                res.status(400).json({
                    error,
                    ok: "Error de mongo no ql"
                });
            }
        }


        //Si el usuario existe y si estado esta en false retorna con mensaje
        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }


        console.log( correo );
        //Si el usuario existe o se crea con google true se genera un nuevo token
        // Generar el JWT
        const token = await jsonweb.generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
     
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    
    }*/  


}