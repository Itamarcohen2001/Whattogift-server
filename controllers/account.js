import express, { request, response } from 'express';
const router=express.Router();

router.get('/greeting',async(request,response)=>{
    return response.status(200).json({
        message:'hello world'
    })
    
})
export default router;