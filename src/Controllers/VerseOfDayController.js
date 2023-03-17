const { PrismaClient } =require('@prisma/client');
const prisma = new PrismaClient();
const sendNotification = require('../server')

async function getTokens(req, res){
    const  tokens  = await prisma.tokens.findMany()
    getTokensToNotify(tokens)
    res.send(tokens)
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
module.exports={
    async store (req,res){
        const {text, reference} = req.body;
        const verseOfDay = await prisma.verseOfDay.create({
            data:{
                text:text,
                reference:reference,
            }
        })
        res.json(verseOfDay);
        if(verseOfDay){
            getTokens()
        }
        else{
            res.status(400).json({message:"Error"})
        }
    },
    async getVerses(req,res){
        const verseOfDay = await prisma.verseOfDay.findMany()
        res.json(verseOfDay)
    }
}