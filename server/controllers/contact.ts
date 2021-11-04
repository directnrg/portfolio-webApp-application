import express from "express";
import contactModel from "../models/contact";
import { UserDisplayName } from "../utils";

//Display Create/add Page
export function AddContactPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // show the edit view
  res.render("index", {
    title: "Add Contact",
    page: "business_contact/contact_edit",
    item: "",
    displayName: UserDisplayName(req)
  });
}

// Read - CRUD
export function ListofContactsPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  contactModel.find((err, contactCollection) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    //console.log(contactCollection);

    res.render("index", {
      title: "Contact List Page",
      page: "business_contact/contact_list",
      contactList: contactCollection,
      displayName: UserDisplayName(req)
    });
  });
}

//Display Edit Page
export function ContactEditPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let id = req.params.id;

  contactModel.findById(id, {}, {}, (err, contactItemToEdit) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    //console.log(contactItemToEdit);

    res.render("index", {
      title: "Contact Edit",
      page: "business_contact/contact_edit",
      item: contactItemToEdit,
      displayName: UserDisplayName(req)
    });
  });
}

// Process Edit page
export function ProcessEditPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let id = req.params.id;

  console.log(id);
  console.log(req.body);

  let updatedItem = new contactModel({
    _id: id,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    emailAddress: req.body.emailAddress,
  });

  contactModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact/list");
  });
}

// Process (C)reate page
export function ProcessAddPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  let newItem = new contactModel({
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    emailAddress: req.body.emailAddress,
  });

  contactModel.create(newItem, (err: any) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact/list");
  });
}

// Process (D)elete page
export function ProcessDeletePage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let id = req.params.id;

  contactModel.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact/list");
  });
}
