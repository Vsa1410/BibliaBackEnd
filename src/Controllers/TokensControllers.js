const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async storeTokens(req, res){
        const  {token}  = req.body

        const  userToken = await prisma.tokens.create({
            data:{
                token:token
            }
        })
        res.json(userToken)
    },
    async getTokens(req, res){
        const  tokens  = await prisma.tokens.findMany()
        res.send(tokens)
    }
}