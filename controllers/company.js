import express from 'express';
const router=express.Router();

router.post('/create_company',async(req,res)=>{
    //check if compnay exist under the associate id!!!!!!
})


router.post('/update_company',async(req,res)=>{
    //check if compnay exist under the associate id!!!!!!
})



router.get('/greeting',async(request,response)=>{
    return response.status(200).json({
        message:'hello world'
    })
    
})
export default router;