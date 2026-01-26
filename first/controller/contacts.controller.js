import Contact from '../models/contact.models.js'
import mongoose from 'mongoose'

// Get all contacts
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    }

    // const contacts = await Contact.find()
    const result = await Contact.paginate({}, options)

    // res.send(result)
    res.render('Home', {

      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs
    })



  } catch (err) {
    next(err)   // ✅ forward error
  }
}

// Show single contact
export const showContacts = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render('404', { message: "Invalid Contact Id" })
    }
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.render('404', { message: "Contact not found" })
    }
    res.render('show-contact', { contact })
  } catch (err) {
    next(err)   // ✅ forward error
  }
}

// Add new contact
export const addContacts = async (req, res, next) => {
  try {
    await Contact.create(req.body)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

// Show update page
export const updateContactsPage = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.render('404', { message: "Contact not found" })
    }
    res.render('update-contact', { contact })
  } catch (err) {
    next(err)
  }
}

// Update contact
export const updateContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

// Delete contact
export const DeleteContacts = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
