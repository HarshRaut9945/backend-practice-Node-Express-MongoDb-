import express from 'express'
import { newContact } from '../controllers/contact.js';

const router=express.Router();

//user routes
//@api dsc :- creating contact
//@api method-post
//@api endpoint - /api/contact/new

router.post('/new',newContact)

export default router;