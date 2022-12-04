import express from 'express';
const router = express.Router();
import Auth from './auth.js';
import Company from '../models/company.js';
import mongoose from 'mongoose';
import { getDistance } from 'geolib';

/**
 * @swagger
 * /api/company/get_companies:
 *  get:
 *   summary: Return the comapnies
 *   tags: [Comapny]
 *   responses:
 *    200:
 *     description: This is the list of all companies
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *    500:
 *     description: Error was found
 */
router.get('/get_companies',Auth,async(req,res)=>{
    Company.find()
    .then( companies => {
        return res.status(200).json({
            message: companies
        })
    })
    .catch( error=> {
        return res.status(500).json({
            message: error.message
        })
    })
})

/**
 * @swagger
 * definitions:
 *  FindMyStore:
 *      type: object
 *      properties:
 *          latitude:
 *              type: integer
 *          longtitude:
 *              type: integer
 */

/**
 * @swagger
 * /api/company/getCompaniesDistance:
 *  post:
 *      summary: bla
 *      description: bla 
 *      tags: [Company]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/FindMyStore'
 *      responses:
 *          200:
 *              description: Success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *          500:
 *              description: Error was found
 */


router.post('/get/compainies/by/location',Auth,async(req,res)=>{
    const{latitude,longtitude}=req.body;
    Company.find()
    .then(companies=> {

        let formattedCompanies =[];
        companies.forEach(company=>{
            const distance = getDistance(
                { latitude: latitude, longitude: longtitude},
                { latitude: company.contact.latitude, longitude: company.contact.longitude }
            );
            const _company = {
                companyItem: company,
                distanceItem: distance
            }
            formattedCompanies.push(_company);
        })

        return res.status(200).json({
        
            message: formattedCompanies
        });
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        });
    })
})

router.post('/create_company',Auth, async (req, res) => {

    const user =req.user;
    const {companyName, contact} = req.body;
    const company = await Company.find({associateId:user._id});
    if(company.length > 0){
        // Check if company exist under the associate id
        return res.status(200).json({
            status: false,
            message: 'Company exist.'
        });
    }else{
        const id = mongoose.Types.ObjectId();
        const {companyName, contact} = req.body;
        //create company
        const _company = new Company({
            _id: id,
            associatedId: user._id,
            companyName: companyName,
            contact: contact,
            bio: ''
        })
        _company.save()
        .then(company_created => {
            return res.status(200).json({
                status: true,
                message: company_created
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        })
    }
       
})


router.post('/update_company',Auth, async (req, res) => {
    const user =req.user;
    //check if compnay exist under the associate id!!!!!!
    const { associateId, companyName, contact, logo, bio } = req.body;

    // Check if company exists
    Company.findById(associateId)
        .then(async company => {
            if (company) {
                
                company.companyName = companyName;
                company.contact = contact;
                company.logo = logo;
                company.bio = bio;
                company.save();

                // update the details
                return res.status(200).json({
                    status: true,
                    message: 'Company details got updated.'
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Company is not exists."
                });
            }
        })
})



router.get('/greeting', async (request, response) => {
    return response.status(200).json({
        message: 'hello world'
    })

})
export default router;