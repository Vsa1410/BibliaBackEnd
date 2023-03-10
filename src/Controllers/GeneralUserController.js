const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

module.exports = {
    async store(req,res){
        const {name, token, favorites, email, password} = req.body;

        const generalUser = prisma.generalUser.create({
            data:{
                name:name,
                token:token,
                favorites:favorites,
                email:email,
                password:password
            }
        })
    },
    async change(req,res){
        const {id, name, token, favorites, email, password} = req.body;

        const generalUser = prisma.generalUser.update({
            where:{
                id:id
            },
            data:{
                name:name,
                token:token,
                favorites:favorites,
                email:email,
                password:password
            }
        })
        res.json(generalUser)
    },
    async delete(req, res){
        const generalUser = await  prisma.generalUser.delete({
            where: { id:id}
        })
        res.json(generalUser)
    }
}