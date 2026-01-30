import express from 'express'
import { deleteContactByid, getAllContact, getContactById, newContact, updateContactByid, } from '../controllers/contact.js';

import {isAuthenticated} from "../Middlewares/Auth.js"
const router=express.Router();

//user routes
//@api dsc :- creating contact
//@api method-post
//@api endpoint - /api/contact/new

router.post('/new',isAuthenticated,newContact)
router.get('/',getAllContact)
//get contact by id
router.get('/:id',getContactById)
//Update contact by id
router.put('/:id',isAuthenticated,updateContactByid)
//delete contact by id
router.delete('/:id',isAuthenticated,deleteContactByid)
router.get('/userid/:id',getContactById)


export default router;