import express from 'express';
const router = express.Router();
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


//MODELS
import Account from '../models/account.js';

router.post('/signup', async (request, response) => {
    const id = mongoose.Types.ObjectId();
    //Get user register data
    const { firstName, lastName, email, password } = request.body
    //Check if user exist 
    Account.findOne({ email: email })
    .then(async account => {
        if (account) {
            return response.status(200).json({
                status: false,
                message: 'account not valid'
            });
        }
        else {
            const hash = await bcryptjs.hash(password, 10);
            const code = Math.floor(Math.random() * (9999 - 1111) + 1111);
            const _account = new Account({
                _id:id,
                email: email,
                password: hash,
                fisrtName: firstName,
                lastName: lastName,
                passcode: code

            })
            _account.save()
                .then(account_created => {
                    return response.status(200).json({
                        status: true,
                        message: account_created
                })
            })
                .catch(error => {
                    return response.status(500).json({
                        status: false,
                        message: error.message

                    });
                })
                        

                
                .catch(error => {
                    return response.status(500).json({
                        status: false,
                        message: error.message

                    })

                })
                
            }
        })
            //Store user in db
            //Send verivication code 
    })    
       
    
    router.post('/verify', async (req, res) => {
        //Get code+email
        const {email,code}=req.body;
        //Check if code match
        Account.findOne({ email: email })
        .then(async account=> {
            if(parseInt(code)==parseInt(account.passcode)){
                account.isVerified =true;
                account.save()
                .then(account_update =>{
                    return res.status(200).json({
                        status:true,
                        message:account_update
                    })
                })
                .catch(error=>{
                    return res.status(500).json({
                        status:false,
                        message:error.message
                    })
                })
            }
            else{
                return res.status(500).json({
                    status:false,
                    message:'verify code not match'
                })
            }
        })
        .catch(error=>{
            return res.status(500).json({
                status:false,
                message:error.message
            })
        })
        //Update db false true

    })
    router.post('/login', async (req, res) => {
        //Get user login data
        const {email,password}=req.body;
        //Check if user exist and password match
        console.log(email);
        console.log(password);
        Account.findOne({email:email})
        .then(async account=>{
            const isMatch=await bcryptjs.compare(password ,account.password);
            if(isMatch && account.isVerified)
            {
                const data= {account};
                const token = await jwt.sign(data, '62C28A582F1DC55B1B66EFD2841BB')

                return res.status(200).json({
                    status:true,
                    message:account,
                    token:token
                })
            }
            else{
                return res.status(200).json({
                    status:false,
                    message:'username or password not match or account not verified' 
                })
            }
        })
        .catch(error =>{
            return res.status(500).json({
                status:false,
                message:error.message
            })
        })
        //Genertae JWT token
        //Response
    })

    //Update account
    router.put('/update_account',async(req,res)=>{

    })

    //update password
    router.put('/update_password',async(req,res)=>{

    })

    router.get('/getOverview', async (req, res) => {

    })
    export default router;