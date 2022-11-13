const jwt = require('jsonwebtoken');

const generate_jwt = (uid) => {
   return new Promise((resolve, reject) => {
      jwt.sign({uid}, process.env.SECRET_KEY, {
         expiresIn: '4h'
      }, (err, token) => {
         if(err){
            console.log(err)
            reject('There was an error signing the jwt')
         }
         resolve(token)
      })
   })
}

module.exports = generate_jwt