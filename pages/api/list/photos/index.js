import Auth from '../../../../utils/auth'

export default Auth(async(req,res) => {
    try {
        let {method}= req
        if (method === 'GET') {
            await fetch("https://jsonplaceholder.typicode.com/photos").then(async Data=>{
                Data = await Data.json()
                
                Data = Data.slice((1 - 1) * 10, 1 * 10);
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