import Auth from '../../../../utils/auth'

export default Auth(async(req,res) => {
    try {
        let {query:{properties},method}= req
        if (method === 'GET') {
            //THIS IS JUST A METHOD TO ADD FLEXIBILITY
            properties = properties.split(",")

            //BECAUSE OF SECURITY YOU SHOULD INVALIDATE SOME PROPERTIES
            //if (properties.indexOf("password"))...

            await fetch("https://jsonplaceholder.typicode.com/posts").then(async extRes=>{
                extRes = await extRes.json()

                let parseProps = extRes.map(e=>{
                    return properties.map(x=>{
                        let v 
                        ({[x]:v}=e)
                        let toReturn = {}
                        toReturn[x] = v
                        return toReturn
                    })
                })
                res.json(parseProps)
            })
             
            
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

)