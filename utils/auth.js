import jwt from 'jsonwebtoken';
import cors from './cors'
//THIS IS A GOOD PLACE TO CONNECT A USERS DATABASE AND GET HIS DATA
//import User from '../models/user'



//EXPRESS / NEXT JS MIDDLEWARE EXAMPLE FOR CONEXA
export default (handler) => {
  return async (req, res) => {
    //CORS IS ALSO HERE JUST FOR AVOID DUPLICATE CODE
    if (req.method === 'OPTIONS') {
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, authorization'
      )
      res.status(200).end()
      return
    }

    
    // Get token and check if it exists
    let token;

    //ACCESS TO THE TOKEN CAN BE GET FROM MULTIPLE PLACES IN ORDER TO GET FLEXIBILITY
    if (req.cookies && req.cookies.authorization) {
      token = req.cookies.authorization;
    }
    if (req.headers && req.headers['authorization']) {
      token = req.headers['authorization'].split(' ')[1]
    }
    //SOMETIMES HEADERS COME IN A OBJECT TYPE
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization
    }
    if (req.body && req.body.token) {
      token = req.body.authorization
    }

    if (!token) {
      return res.status(401).json({
        msg: 'Not access token provided',
      });
    }

    try {
      // Verify token

      const tokenDecode = jwt.verify(token,process.env.JWT)

      //FOR BETTER SECURITY UNCOMMENT THE NEXT LINES & THE LINES IN login.js
      /**
       * if (!tokenDecode && tokenDecode.agent != req.headers['user-agent']) {
        return res.status(401).json({
          msg: 'Token corrupted',
        });
      } 
      if(!tokenDecode && tokenDecode.ip != req.headers['x-real-ip'] || tokenDecode.ip != req.connection.remoteAddress){
        return res.status(401).json({
          msg: 'Token corrupted',
        });
      }
       */
      //THIS IS A GOOD PLACE TO GET USER DATA

      //const userData = await User.findOne({name:tokenDecode.id})
      //...

      req.user = tokenDecode;

      return cors(handler(req, res))

    } catch (err) {
      //JUST IN CASE OF DEBUGING
        if (req.headers['isdebug']) {
          console.log(err)
          return res.status(400).send(err)
        }
        console.log(err)
        return res.status(401).json({
          msg: 'TOKEN ERROR',
        });
    }
  };
};