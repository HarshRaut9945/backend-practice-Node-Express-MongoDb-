
import express from 'express'
const router = express.Router()

import {
     getContacts,
     showContacts, 
     addContacts,
      updateContactsPage,
       updateContact, 
       DeleteContacts } 
from '../controller/contacts.controller.js'
// Routes

router.get('/',  getContacts)

router.get('/show-contact/:id',showContacts )

router.get('/add-contact', (req, res) => {
  res.render('add-contact')
})

router.post('/add-contact', addContacts)

// ✅ FIX: added missing slash before :id
router.get('/update-contact/:id', updateContactsPage)

router.post('/update-contact/:id', updateContact)

// ✅ FIX: added missing slash before :id
router.get('/delete-contact/:id', DeleteContacts)

export default router

