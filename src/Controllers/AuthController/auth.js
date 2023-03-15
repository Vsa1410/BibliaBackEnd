const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const authController= {};

authController.login = async (req,res)=>{
    try {
        const { email, password} = req.body
        const generalUser = await prisma.generalUser.findUnique({
            where:{
            email
            }
        })
        if(!generalUser){
            res.status(401).json({message:"Usuário não encontrado!"})
        }
        
        const passwordMatch = await bcrypt.compare(password, generalUser.password );
        if(!passwordMatch){
            return res.status(401).json({message:'Senha Incorreta'});
        }else{
            
            const token = jwt.sign({userId:generalUser.id}, process.env.JWT_SECRET,{
                expiresIn: '1h'
            });
            return res.status(200).json({token})
        }

    } catch (error) {
        
    }
}

module.exports= authController