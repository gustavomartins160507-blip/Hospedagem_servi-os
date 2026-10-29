const jwt = require('jsonwebtoken')

function autenticar(request, response, next){

    const autHeader = request.headers.authorization

    console.log("vendo se passou jwt", request.headers.authorization);
    
    if(!autHeader){

            return response.status(401).json({

            message:"Token nao informado"

        })
    }

    const token = autHeader.split(' ')[1]

    try{

        const usuario = jwt.verify(
            token,

            process.env.JWT_SECRET
        )

        request.usuario = usuario
        
        next()
        
    }
    catch(error){

        return response.status(401).json({

            message:"token invalido ou expirado"

        })

    }

}

module.exports = autenticar