import { Contact } from "../models/Contact.js";

// get all contact

export const getAllContact=async (req,res)=>{
    const userContac= await Contact.find();

    if(!userContac) return res.json({message:"No Contact Exist",success:false})

        res.json({message:"All Contact Fetched",userContac,success:true})
}

//create new contact
export const newContact = async (req, res) => {
    try {
        const { name, email, phone, type } = req.body;

        // validation
        if (!name || !email || !phone || !type) {
            return res.json({
                message: "All fields are required",
                success: false
            });
        }
        // create contact
        const saveContact = await Contact.create({
            name,
            email,
            phone,
            type
        });

        return res.json({
            message: "Contact created successfully",
            success: true,
            data: saveContact
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.message
        });
    }


};

//update contact by id
export const updateContactByid=async(req,res)=>{
    const id=req.params.id;
    const { name, email, phone, type } = req.body;

   let updatecontact=await Contact.findByIdAndUpdate(
    id,
    {
        name,
        email,
        phone,
        type,
    },
      {new:true}
   );
      if(!updatecontact) return res.json({message:"No Contact Exist",success:false})
          res.json({message:"Contact uodated sucessfully",updatecontact,success:true})

};

// delete contact by id 
export const deleteContactByid=async(req,res)=>{
    const id=req.params.id;
    const { name, email, phone, type } = req.body;

   let deleteContact=await Contact.findByIdAndDelete(id);
      if(!deleteContact) return res.json({message:"No Contact Exist",success:false})
          res.json({message:"Contact deleted sucessfully....",deleteContact,success:true})

};


// get contact by id

export const getContactById=async(req,res)=>{

    const id=req.params.id
    const userContact=await Contact.findById(id);
     if(!userContact) return res.json({message:"No Contact Find",success:false})
          res.json({message:" Contact Fetched",userContact,success:true})
}


export const getContactByUserId=async(req,res)=>{

    const id=req.params.id
    const userContact=await Contact.find({user:id});
     if(!userContact) return res.json({message:"No Contact Find",success:false})
          res.json({message:" User Specific  Contact Fetched",userContact,success:true})
}
