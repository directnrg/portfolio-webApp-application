"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessAddPage = exports.ProcessEditPage = exports.ContactEditPage = exports.ListofContactsPage = exports.AddContactPage = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const utils_1 = require("../utils");
function AddContactPage(req, res, next) {
    res.render("index", {
        title: "Add Contact",
        page: "business_contact/contact_edit",
        item: "",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.AddContactPage = AddContactPage;
function ListofContactsPage(req, res, next) {
    contact_1.default.find((err, contactCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render("index", {
            title: "Contact List Page",
            page: "business_contact/contact_list",
            contactList: contactCollection,
            displayName: (0, utils_1.UserDisplayName)(req)
        });
    });
}
exports.ListofContactsPage = ListofContactsPage;
function ContactEditPage(req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id, {}, {}, (err, contactItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render("index", {
            title: "Contact Edit",
            page: "business_contact/contact_edit",
            item: contactItemToEdit,
            displayName: (0, utils_1.UserDisplayName)(req)
        });
    });
}
exports.ContactEditPage = ContactEditPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    console.log(req.body);
    let updatedItem = new contact_1.default({
        _id: id,
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        emailAddress: req.body.emailAddress,
    });
    contact_1.default.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contact/list");
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessAddPage(req, res, next) {
    let newItem = new contact_1.default({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        emailAddress: req.body.emailAddress,
    });
    contact_1.default.create(newItem, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contact/list");
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contact/list");
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=contact.js.map