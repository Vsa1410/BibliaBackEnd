const { PrismaClient } = require('@prisma/client');
const sendNotification = require('../server');
const prisma = new PrismaClient();

module.exports = {
    async storeTokens(req, res){
        const  {token}  = req.body

        const  userToken = await prisma.tokens.create({
            data:{
                token:token
            }
        })
        .then(()=>{

            res.send(userToken)
        }

        )
        
        .catch ((err)=> {
            if (err.code === 'P2002') {
              console.log(`Token ja cadastrado`)
            } else {
              console.error(err)
            }
          })
          
            
          
        
    },
    async getTokens(req, res){
        const  tokens  = await prisma.tokens.findMany()
        getTokensToNotify(tokens)
        res.send(tokens)
    }

}
function getTokensToNotify(tokens){
    var tokenList = []
    tokens.map((token)=>{
        tokenList.push(token.token)
    })
    sendNotification(tokenList)
    console.log(tokenList)
    return tokenList
}