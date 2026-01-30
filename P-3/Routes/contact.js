import express from 'express'
import { getAllContact, getContactById, newContact, updateContactByid, } from '../controllers/contact.js';

const router=express.Router();

//user routes
//@api dsc :- creating contact
//@api method-post
//@api endpoint - /api/contact/new

router.post('/new',newContact)
router.get('/',getAllContact)
//get contact by id
router.get('/:id',getContactById)
router.put('/:id',updateContactByid)
export default router;