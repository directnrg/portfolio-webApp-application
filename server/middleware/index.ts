import passport from "passport";
import passportLocal, { IVerifyOptions } from "passport-local";
import UserModel from "../models/user";
import { Request, Response } from "express";

const LocalStrategy = passportLocal.Strategy;

//definition of options
const strategyOptions: any = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

//information requested to user in login page, username and password
const loginFunction: any = async (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  const user: any = await UserModel.findOne({ username });

  if (!user) {
    return done(null, false, { message: "User not found" });
  }

  if (!(await user.isValidPassword(password))) {
    return done(null, false, { message: "Invalid password" });
  }

  console.log("User Authenticated Successfully");
  return done(null, user);
};

//method to create a user
const signupFunction = async (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  try {
    //deconstructing
    const { username, password, firstName, lastName, email } = req.body;
    console.log(req.body);
    
//if there is a file missing, it will not continue
    if (!username || !password || !email || !firstName || !lastName) {
      console.log("Invalid body fields");
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }, { email: email }],
    };

    console.log(query);

    const user = await UserModel.findOne(query);

    if (user) {
      console.log("User already exists");
      console.log(user);
      return done(null, false);
    } else {
      const userData = {
        username,
        password,
        email,
        displayName: firstName + " " + lastName,
      };

      const newUser = new UserModel(userData);
      await newUser.save();

      return done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

passport.use("login", new LocalStrategy(strategyOptions, loginFunction));
passport.use("signup", new LocalStrategy(strategyOptions, signupFunction));

//check if user is logged in or not
export const isLoggedIn = (
  req: Request,
  res: Response,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  done(null, req.user);
};

interface User {
  _id?: String;
}

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err: any, user: any) {
    done(err, user);
  })
});

export default passport;
