import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Schema for my collection business_contact in my database
const ContactSchema = new Schema ({
    contactName : String,
    contactNumber : String,
    emailAddress : String
}, {
    collection: "business_contact"
})

const Model = mongoose.model("business_contact", ContactSchema);

export default Model;