const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

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
        }else{

            bcrypt.compare(password, generalUser.password)
            .then((result) => {
                if (result) {
                
                const token = jwt.sign({userId:generalUser.id}, process.env.JWT_SECRET,{
                    expiresIn: '1y'
                });
                
                res.status(200).json({token})
                } else {
                console.log('Senha incorreta!');
                res.status(401).json("Senha incorreta")
                }
            })
            .catch((err) => console.error(err));
            
            
        }
        

          
        }catch{
            res.status(401).json("Não foi possível realizar agora, tente mais tarde")
        }

    }       
    


module.exports= authController