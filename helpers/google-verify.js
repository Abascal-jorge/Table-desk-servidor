const { OAuth2Client } = require('google-auth-library');

//ID google developer
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );


const googleVerify = async ( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
  });

  ///No llega a este punto
  console.log( ticket );

  const { name: nombre, 
          picture: img, 
          email: correo
        } = ticket.payload;
  
  return { nombre, img, correo };

};

module.exports = {
  googleVerify
}


