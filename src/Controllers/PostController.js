const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async store(req, res){
        const {title, body, categories, media, authorId} = req.body;

        const post = await prisma.post.create({
            data: {
                title:title,
                body:body,
                categories:categories,
                media:media,
                authorId:authorId
            }
        })
        res.json(post)
    },

    //find categories
    async findDevotionals(req,res){
        const posts = await prisma.post.findMany({
            where: {categories: 'devotionals'},
        })
        res.json(posts)
    },
    //find plans
    async findPlans(req,res){
        const posts = await prisma.post.findMany({
            where: {categories: 'plans'},
        })
        res.json(posts)
    },
    //find plans
    async findVerses(req,res){
        const posts = await prisma.post.findMany({
            where: {categories: 'verseoftheday'},
        })
        res.json(posts)
    },
    //change some post
    async change(req,res){
        const {id} = req.params;
        const {title, body, categories, media, authorId} = req.body;

        const post = await prisma.post.update({
            where: {id: id},
            data: {
                title:title,
                body:body,
                categories:categories,
                media:media,
                authorId:authorId
            }
        })
        res.json(post)
    },
    //delete post
    async delete(req,res){
        const {id} = req.params;

        const post = await prisma.post.delete({
            where: {id: id}
        })
        res.json(post)
    },

}