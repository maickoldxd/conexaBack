import jwt from 'jsonwebtoken'
export default async (req,res) => {
    try {
        if (req.method === 'OPTIONS') {
            res.setHeader(
              'Access-Control-Allow-Headers',
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, authorization'
            )
            res.status(200).end()
            return
          }

        const {body:{username,password},method}= req
        if (method === 'POST') {
            if (typeof username === 'string' && username == "developer" 
            && typeof password === 'string' && password == "password") {

                let payload = {id:username}
                //FOR BETTER SECURITY UNCOMMENT THE NEXT LINES
                payload.agent = req.headers['user-agent'] 
                payload.ip = req.headers['x-real-ip'] || req.connection.remoteAddress

                const token = jwt.sign(payload,process.env.JWT,{
                    expiresIn: 60 * 60 * 24 * 7
                })
                res.json({msg:"ok",token:token})

                
            }else{
                res.json({msg:"wrong username or password"})
            }
            
        }else{
            res.status(405).json({
                msg:"method not allowed"
            })
        }
        
    } catch (err) {
        console.error("Error:", err)
        res.status(400).json({
            msg:"Fatal error"
        })
    }
}

