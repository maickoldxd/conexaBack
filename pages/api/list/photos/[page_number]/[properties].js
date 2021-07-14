import Auth from '../../../../../utils/auth'

export default Auth(async(req,res) => {
    try {
        let {query:{properties,page_number},method}= req
        if (method === 'GET') {
            //THIS IS JUST A METHOD TO ADD FLEXIBILITY
            properties = properties.split(",")

            //BECAUSE NEXT JS API URL INTERFACE DON'T SUPPORT CAMEL CASE URL
            const pageNumber = parseInt(page_number)

            //BECAUSE OF SECURITY YOU SHOULD INVALIDATE SOME PROPERTIES
            //if (properties.indexOf("password"))...

            await fetch("https://jsonplaceholder.typicode.com/photos").then(async extRes=>{
                extRes = await extRes.json()

                let Data = extRes.map(e=>{
                    return properties.map(x=>{
                        let v 
                        ({[x]:v}=e)
                        let toReturn = {}
                        toReturn[x] = v
                        return toReturn
                    })
                })
                Data = Data.slice((pageNumber - 1) * 10, pageNumber * 10);
                res.json(Data)
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