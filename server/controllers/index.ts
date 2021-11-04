import express from "express";
import { UserDisplayName } from "../utils";

//render of main pages
export function HomePageDisplay(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.render("index", {
    title: "Home",
    page: "home",
    displayName: UserDisplayName(req)
  });
}

export function AboutPageDisplay(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.render("index", {
    title: "About",
    page: "about",
    displayName: UserDisplayName(req)
  });
}

export function ProjectPageDisplay(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.render("index", {
    title: "Projects",
    page: "projects",
    displayName: UserDisplayName(req)
  });
}

export function ServicesPageDisplay(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.render("index", {
    title: "Services",
    page: "services",
    displayName: UserDisplayName(req)
  });
}

export function ContactPageDisplay(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.render("index", { 
    title: "Contact", 
    page: "contact", 
    displayName: UserDisplayName(req) 
  });
}
