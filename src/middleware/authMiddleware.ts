import { NextFunction, Request, Response } from "express";

const FRONTEND_URL = process.env.FRONTEND_URL;

const isAuthenticated = () => (request: Request, response: Response, next: NextFunction) => {
  if (request.user) {
    console.log("REQUEST.USER EXISTS");
    response.cookie("loggedIn", true);
    return next();
  }
  // if user is not logged in, redirect.
  return response.status(401).redirect(`${FRONTEND_URL}/login?loggedIn=false`);
};

export default isAuthenticated;
