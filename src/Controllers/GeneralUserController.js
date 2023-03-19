const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

module.exports = {
    async findUserInformation (req, res){
        const {id} = req.params;
        const generalUser = await prisma.generalUser.findUnique({
            where:{
                id:id
            },
            
        })
        return res.json(generalUser)
    },

    async store(req,res){

            //middleware to change the password to hashed password
            prisma.$use(async(params, next)=>{
                if( params.model === "GeneralUser" && (params.action === "create" || params.action=="update") ) {
                    try{
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(params.args.data.password, salt);
                        params.args.data.password = hashedPassword;
                        await next(params)
                        
                    }catch(error){
                        next(error)

                    }
            
                }
        
               
            })

        
        
            //middleware to change the email to LowerCase    
            prisma.$use(async (params, next) => {
                if (params.model == 'GeneralUser' && (params.action == 'create' || params.action =='update')) {
                    params.args.data.email = params.args.data.email.toLowerCase()
                }
                return next(params)
            })
            
            
            
        const {name, token, email, password} = req.body;
        const generalUser = await prisma.generalUser.create({
            data:{
                name:name,
                token:token,
                
                email:email,
                password:password
            }
            
        })
        return res.json(generalUser)
    },
    async change(req,res){
        const {id, name, token, email, password} = req.body;

        const generalUser = await prisma.generalUser.update({
            where:{
                id:id
            },
            data:{
                name:name,
                token:token,
                
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