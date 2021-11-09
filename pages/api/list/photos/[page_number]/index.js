import Auth from '../../../../../utils/auth'
import { getPlaiceholder } from "plaiceholder";

export default Auth(async (req, res) => {
    try {
        let { query: { page_number }, method } = req
        if (method === 'GET') {

            //BECAUSE NEXT JS API URL INTERFACE DON'T SUPPORT CAMEL CASE URL
            const pageNumber = parseInt(page_number)

            return await fetch("https://jsonplaceholder.typicode.com/photos").then(async Data => {
                Data = await Data.json()

                Data = Data.slice((pageNumber - 1) * 10, pageNumber * 10);

                //GENERATE A BASE64 4x4px version of image for next/image blurhash
                Data = await Promise.all(Data.map(async photo => {
                    const { base64 } = await getPlaiceholder(
                        photo.thumbnailUrl,
                        { size: 4 }
                    );
                    photo.b64 = base64
                    return photo
                }))

                //RESPONSE WITH THE DATA
                res.json(Data)
            })


        } else {
            res.status(405).json({
                msg: "method not allowed"
            })
        }

    } catch (err) {
        console.error("Error:", err)
        res.status(400).json({
            msg: "Fatal error"
        })
    }
}

)