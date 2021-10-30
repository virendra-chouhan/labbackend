require('dotenv').config()
var jwt = require('jsonwebtoken');
// const dotenv = require('dotenv')


module.exports = auth = (req, res, next) => {

   // console.log(req.headers.authorization.split(' ')[0] )

   if (req.headers.authorization === undefined) {
      res.status(401).json({
         error: 'Invalid request! no token provided'
      });
   }else {

   // else if( )
   try {

      const token = req.headers.authorization.split(' ')[1];
      if (token.includes("Bearer")) {
         res.status(401).json({
            error: 'token cannot starts with Bearer'
         });
      }
         
         const decodedToken = jwt.verify(token, process.env.TOKEN_SECREAT);
         // console.log(decodedToken)
         if (decodedToken.tid === "kladsfrowiuij4574we98r789sd7f") {
            next();
         } else {
            throw 'Invalid Token';
         }
      }
      catch {
         res.status(401).json({
            error: "invailid token"
         });
      }
   }
   //   next();
   // console.log("checking token 2")

}