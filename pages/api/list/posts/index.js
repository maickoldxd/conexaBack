import Auth from '../../../../utils/auth'

export default Auth(async(req,res) => {
    try {
        let {method}= req
        if (method === 'GET') {
            
            await fetch("https://jsonplaceholder.typicode.com/posts").then(async extRes=>{
                extRes = await extRes.json()
                res.json(extRes)
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