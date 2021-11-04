import express from "express";
import { AddContactPage, ContactEditPage, ListofContactsPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from "../controllers/contact";

 const router = express.Router();

// Get for contact_list page
 router.get("/list", ListofContactsPage);

//GET - display contact_edit page with id | /contact_list/edit/:id page
 router.get('/edit/:id', ContactEditPage);

//POST - process /contact-list/edit/:id page 
router.post('/edit/:id', ProcessEditPage);

//GET - display /contact-list/add page.
router.get('/add', AddContactPage);

//POST - process /contact-list/add page
router.post('/add', ProcessAddPage);

//GET - process contact_list/delete with id | /contact-list/delete/:id
router.get('/delete/:id', ProcessDeletePage);

export default router;
