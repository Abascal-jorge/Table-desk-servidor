const { OAuth2Client } = require('google-auth-library');

//ID google developer
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_ID );

//Es un error de google developer 
//Revisar a futuro
const googleVerify = async ( idToken = '' ) => {

  try {
    const ticket2 = await client.verifyIdToken({
         idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    
      ///No llega a este punto
    console.log( ticket2 );

    const { name: nombre, 
            picture: img, 
            email: correo
          } = ticket2.payload;

    return { nombre, img, correo };

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  googleVerify
}


