import { Contact } from "../models/Contact.js";

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
