const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

module.exports = {
    async findUserInformation (req, res){
        const {id} = req.params;
        const generalUser = await prisma.generalUser.findUnique({
            where:{
                id:id
            }
        })
        return res.json(generalUser)
    },

    async store(req,res){

            //middleware to change the password to hashed password
            prisma.$use(async(params, next)=>{
                if( params.model === "GeneralUser" && params.action === "create" ) {
                    const hashedPassword = await bcrypt.hash(params.args.data.password, 10);
                    params.args.data.password = hashedPassword;
            
                }
                const result = await next(params)
        
                return result
            })

        
        
            //middleware to change the email to LowerCase    
            prisma.$use(async (params, next) => {
                if (params.model == 'GeneralUser' && params.action == 'create') {
                    params.args.data.email = params.args.data.email.toLowerCase()
                }
                return next(params)
            })
            
            
            
        const {name, token, favorites, email, password} = req.body;
        const generalUser = await prisma.generalUser.create({
            data:{
                name:name,
                token:token,
                favorites:favorites,
                email:email,
                password:password
            }
            
        })
        return res.json(generalUser)
    },
    async change(req,res){
        const {id, name, token, favorites, email, password} = req.body;

        const generalUser = await prisma.generalUser.update({
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