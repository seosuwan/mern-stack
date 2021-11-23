import express, { NextFunction, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import errorGenerator from "../errors/errorGenerator";
import { check, validationResult } from "express-validator";
import { IUserInPutDTO } from "../interfaces/IUser";
import { UserService } from "../services";


// const router = express.Router();

// import auth from "../api/middleware/auth";
// import User from "../models/User";
export const token = require("jsonwebtoken")

const join = async (req: Request, res: Response, next: NextFunction) => {
    console.log("들어왔니?")
    check("username", "Name is required").not().isEmpty();
    check("phone", "phone is required").not().isEmpty();
    check("birth", "birth is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address } : IUserInPutDTO = req.body;
    try{

        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return console.log("비어서와씀?/"), res.status(400).json({ errors: errors.array() });
        }
        
        const foundUser = await UserService.findEmail({ email,password });
        if(foundUser)errorGenerator({ statusCode: 409 });  // 이미 가입한 유저

        const createdUser = await UserService.createUser({ username, email, password, phone, address, birth });
        res.status(201).json({ message: 'created', createdUserEmail: createdUser.email })
        
        // const payload = {
        //     user: {
        //         email: createdUser.email,
        //     },
        // };
     
    //     jwt.sign(
    //         payload,
    //         config.jwtSecret,
    //         { expiresIn: 36000 },
    //         (err, token) => {
    //             if(err) throw err;
    //             res.json({ token });
    //         }
    //     );
    } catch (err) {
        next(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("들어와따 ")
    console.log(req.body)
    check("email", "Please include a valid email").isEmail();
    check("password", "password is required").exists();
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())return console.log("에러남"), errorGenerator({ statusCode: 400 });
        
        const { email, password } = req.body;
        const user = await UserService.findEmail({ email,password });
        if(!user){
            return console.log("에러남2"), errorGenerator({ statusCode : 401});
        }
        console.log(user)
        return res.status(201).json({user})

        
        // const payload = {
        //     user: {
        //         email: user.email,
        //     },
        // };

        // jwt.sign(
        //     payload,
        //     config.jwtSecret,
        //     { expiresIn: 36000 },
        //     (err, token) => {
        //         if(err)     throw err;
        //         res.json({ token }); 
        //     }
        // );
    } catch(err) {
        next(err);
    }
    
}
export default {
    join,
    login
}

