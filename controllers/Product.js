import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Auth from './auth.js';
import Category from '../models/category.js';
import Brand from '../models/brand.js';
import Product from '../models/product.js';

router.get('/get_all_brands', Auth, async(req,res)=>{})
router.post('/create_new_brand', Auth, async(req,res)=>{})

router.get('/get_all_categories', Auth, async(req,res)=>{})

router.post('/create_new_category', Auth, async(req,res)=>{})

router.get('/get_all_products', Auth, async(req,res)=>{})

router.post('/create_new_product', Auth, async(req,res)=>{})
router.get('/get_all_brands', Auth, async(req,res)=>{})
router.get('/get_all_brands', Auth, async(req,res)=>{})
router.get('/get_all_brands', Auth, async(req,res)=>{})

