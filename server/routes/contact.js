"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_1 = require("../controllers/contact");
const router = express_1.default.Router();
router.get("/list", contact_1.ListofContactsPage);
router.get('/edit/:id', contact_1.ContactEditPage);
router.post('/edit/:id', contact_1.ProcessEditPage);
router.get('/add', contact_1.AddContactPage);
router.post('/add', contact_1.ProcessAddPage);
router.get('/delete/:id', contact_1.ProcessDeletePage);
exports.default = router;
//# sourceMappingURL=contact.js.map