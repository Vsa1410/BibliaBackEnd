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

           await bcrypt.compare(password, generalUser.password)
            .then((result) => {
                console.log(result)
                if(result === true){
                    
                    const token = jwt.sign({userId:generalUser.id}, process.env.JWT_SECRET,{
                        expiresIn: '1y'
                    });
                    
                    res.status(200).json({token})
                }
                if(result === false){
                    res.status(401).send({error: 'Senha Incorreta'})
                    
                }
                
                
                
            })
            
            .catch((err) => {console.error(err)
            console.log('Senha incorreta!');
            res.status(401).json("Senha incorreta")
            
        });
            
            
        }
        

          
        }catch{
            res.status(401).json("Não foi possível realizar agora, tente mais tarde")
        }

    }       
    


module.exports= authController