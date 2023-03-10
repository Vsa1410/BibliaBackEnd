const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//export to routes.js
module.exports = {
    async store(req,res){
        const { name, email } = req.body;

        const user = await prisma.user.create({
            data: {
                name:name,
                email:email
            }
        });

        return res.json(user);
    },
    async index(req,res){
        const users = await prisma.user.findMany();
        res.json(users);
    },
    async change(req,res){
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: {
                name:name,
                email:email
            }
        });

        return res.json(user);
    },
    async delete(req,res){
        const id = req.params.id;
        const user = await prisma.user.delete({
            where: { id:id }
        })
        res.json(user);
    }
}