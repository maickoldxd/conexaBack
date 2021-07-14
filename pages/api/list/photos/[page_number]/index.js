import Auth from '../../../../../utils/auth'

export default Auth(async(req,res) => {
    try {
        let {query:{page_number},method}= req
        if (method === 'GET') {

            //BECAUSE NEXT JS API URL INTERFACE DON'T SUPPORT CAMEL CASE URL
            const pageNumber = parseInt(page_number)

            await fetch("https://jsonplaceholder.typicode.com/photos").then(async Data=>{
                Data = await Data.json()
                
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