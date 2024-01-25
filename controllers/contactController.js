const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
//description = get all contact
//route = get/api/contacts
//access is public
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});


//description = create new contact
//route = post/api/contacts
//access is public
const createContact = asyncHandler(async(req,res)=>{
    console.log("the request body is: ",req.body)
    const {name,email,phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,email,phone,
    });
    res.status(201).json(contact);
});



//description = get contact by id
//route = get/api/contacts/:id
//access is public
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");

    }
    res.status(200).json(contact);
});


//description = update contact by id
//route = put/api/contacts/:id
//access is public
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");

    }
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}

    );

    res.status(200).json(updatedcontact);
});




//description = delete contact
//route = delete/api/contacts/:id
//access is public
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");

    }
    await Contact.remove()
    res.status(200).json(contact);
});
module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};
 