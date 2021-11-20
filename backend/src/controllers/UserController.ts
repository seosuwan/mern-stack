import express, { NextFunction, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import errorGenerator from "../errors/errorGenerator";
// import gravatar from 'gravatar';
import { check, validationResult } from "express-validator";
import { IUserInPutDTO } from "../interfaces/IUser";
import { UserService } from "../services";
import { nextTick } from "process";

// const router = express.Router();

// import auth from "../api/middleware/auth";
// import User from "../models/User";

const join = async (req: Request, res: Response, next: NextFunction) => {
    check("username", "Name is required").not().isEmpty();
    check("phone", "phone is required").not().isEmpty();
    check("birth", "birth is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address } : IUserInPutDTO = req.body;
    try{
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findEmail({ email });
        if(foundUser)   errorGenerator({ statusCode: 409 });  // 이미 가입한 유저


     

        const createdUser = await UserService.createUser({ username, email, password, phone, address, birth });

        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        jwt.join(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        next(err);
    }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("들어와따 ")
    console.log(req.method)
    // check("email", "Please include a valid email").isEmail();
    // check("password", "password is required").exists();
    // try{
    //     const errors = validationResult(req);
    //     if(!errors.isEmpty())   return errorGenerator({ statusCode: 400 });
        
    //     const { email } = req.body;
    //     const user = await UserService.findEmail({ email });
    //     if(!user){
    //         return errorGenerator({ statusCode : 401});
    //     }

        
    //     const payload = {
    //         user: {
    //             email: user.email,
    //         },
    //     };
    //     jwt.sign(
    //         payload,
    //         config.jwtSecret,
    //         { expiresIn: 36000 },
    //         (err, token) => {
    //             if(err)     throw err;
    //             res.json({ token }); 
    //         }
    //     );
    // } catch(err) {
    //     next(err);
    // }
    
}
export default {
    join,
    login
}

