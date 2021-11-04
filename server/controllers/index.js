"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPageDisplay = exports.ServicesPageDisplay = exports.ProjectPageDisplay = exports.AboutPageDisplay = exports.HomePageDisplay = void 0;
const utils_1 = require("../utils");
function HomePageDisplay(req, res, next) {
    res.render("index", {
        title: "Home",
        page: "home",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.HomePageDisplay = HomePageDisplay;
function AboutPageDisplay(req, res, next) {
    res.render("index", {
        title: "About",
        page: "about",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.AboutPageDisplay = AboutPageDisplay;
function ProjectPageDisplay(req, res, next) {
    res.render("index", {
        title: "Projects",
        page: "projects",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.ProjectPageDisplay = ProjectPageDisplay;
function ServicesPageDisplay(req, res, next) {
    res.render("index", {
        title: "Services",
        page: "services",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.ServicesPageDisplay = ServicesPageDisplay;
function ContactPageDisplay(req, res, next) {
    res.render("index", {
        title: "Contact",
        page: "contact",
        displayName: (0, utils_1.UserDisplayName)(req)
    });
}
exports.ContactPageDisplay = ContactPageDisplay;
//# sourceMappingURL=index.js.map