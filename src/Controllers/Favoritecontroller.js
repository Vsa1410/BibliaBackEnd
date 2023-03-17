const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
    async store (req, res) {
        const {text, book, chapter, verse, authorId} = req.body

        const favorite = await prisma.favorites.create({
            data:{
                text:text,
                book:book,
                chapter:chapter,
                verse:verse,
                authorId:authorId
            }

        })
        res.json(favorite)
    },
    async delete (req, res) {
        const {id} = req.params
        const favorite = await prisma.favorites.delete({
            where:{
                id:id
            }
        })
        res.json(favorite)
    },
    async index(req,res){
        const id = req.params
        console.log(id.id)
        const favorites = await prisma.favorites.findMany({
            where:{
                author:{
                    id:id.id
                }
            }
        })
        res.json(favorites)
    }

}