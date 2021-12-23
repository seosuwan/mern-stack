import express, { NextFunction, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import errorGenerator from "../errors/errorGenerator";
import { check, validationResult } from "express-validator";
import { IUserInPutDTO } from "../interfaces/IUser";
import { UserService } from "../services";
import User from "../models/User";


// const router = express.Router();

// import auth from "../api/middleware/auth";
// import User from "../models/User";
// import token from "jsonwebtoken";

const modify2 = async (req: Request, res: Response, next: NextFunction) => {
    console.log("**********여기 회원가입")
    check("username", "Name is required").not().isEmpty();
    check("phone", "phone is required").not().isEmpty();
    check("birth", "birth is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address, user_interests, job }: IUserInPutDTO = req.body;
    try {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return console.log("비어서와씀?/"), res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findLogin({ email, password });
        if (foundUser) errorGenerator({ statusCode: 409 });  // 이미 가입한 유저 //

        const createdUser = await UserService.createUser({
            username, email, password, phone, address, birth, user_interests,
            job
        });
        res.status(201).json({ message: 'created', createdUserEmail: createdUser.email })

    } catch (err) {
        next(err);
    }
};

const modify = async (req: Request, res: Response, next: NextFunction) => {
    console.log("서버 들어옴~~")
    console.log(`*****req.body*******${JSON.stringify(req.body)}`)
    const { username, email, password, birth, phone, address, user_interests, job }: IUserInPutDTO = req.body;
    console.log(`*****email*******${JSON.stringify(email)}`)

    try {
        console.log(`*****username*******${JSON.stringify(username)}`)
        // console.log(`서버 data :: ${JSON.stringify(data)}`)
        check("email", "Please include a valid email").isEmail();
        const errors = validationResult(req);
        if (!errors.isEmpty()) return console.log("에러남"), errorGenerator({ statusCode: 400 });
        console.log(`*****신기*******${JSON.stringify(username)}`)
        const foundModifyUser = await UserService.findLogin({ email, password });
        console.log(`*****집념*******${JSON.stringify(username)}`)
        // if (foundModifyUser) errorGenerator({ statusCode: 409 });  // 이미 가입한 유저 //

        const modifyUser = await UserService.modifyUser({
            email, username, password, address, birth, job, phone, user_interests
        });

        // console.log(`======들어온 데이타====${JSON.stringify(modifyUser)}`)
        // if (modifyUser) {

        // return console.log("회원 수정 실패"), errorGenerator({ statusCode: 401 });
        // }
        // console.log(`=======석세스 데이타ㅏㅏㅏ${modifyUser}`)
        return res.status(201).json(modifyUser)
    } catch (err) {
        next(err);
    }
}
const exist = async (req: Request, res: Response, next: NextFunction) => {
    // const { email }: IUserInPutDTO = req.body;
    // console.log(req.url.substr(1))
    // console.log('email: ' + email)
    // console.log("중복체크와썹?")
    // console.log(check("email").isEmpty());
    try {
        // console.log(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) return console.log("에러남"), errorGenerator({ statusCode: 400 });

        const email = req.url.substring(1);
        // console.log(`************${email}`)
        const foundEmail = await UserService.findEmail({ email });
        console.log(foundEmail)
        if (foundEmail) {
            return console.log("이메일 찾았음"), errorGenerator({ statusCode: 401 });
        }
        console.log(foundEmail)
        return res.status(201).json(foundEmail)
    } catch (err) {
        next(err);
    }

}
// const token = 'MySecretKey1$1$234';
const join = async (req: Request, res: Response, next: NextFunction) => {
    console.log("**********여기 회원가입")
    check("username", "Name is required").not().isEmpty();
    check("phone", "phone is required").not().isEmpty();
    check("birth", "birth is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address, user_interests, job }: IUserInPutDTO = req.body;
    try {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return console.log("비어서와씀?/"), res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findLogin({ email, password });
        if (foundUser) errorGenerator({ statusCode: 409 });  // 이미 가입한 유저 //

        const createdUser = await UserService.createUser({
            username, email, password, phone, address, birth, user_interests,
            job
        });
        res.status(201).json({ message: 'created', createdUserEmail: createdUser.email })

        // const payload = {
        //     user: {
        //         email: createdUser.email,
        //     },
        // };
        // console.log("jwt============================")
        // const token = jwt.sign(
        //     payload,
        //     config.jwtSecret,
        //     { expiresIn: "7d" },
        //     (err, token) => {
        //         if(err) throw err;
        //         res.json({ token });
        //     }
        // );
        // console.log(`=================${JSON.stringify(jwt.JsonWebTokenError)}`)
    } catch (err) {
        next(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("로그인 들어와따 ")
    // console.log(req.body)
    check("email", "Please include a valid email").isEmail();
    check("password", "password is required").exists();
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return errorGenerator({ statusCode: 400 });

        const { email, password } = req.body;
        const user = await UserService.findLogin({ email, password });
        console.log(`user type: ${typeof user}`)
        console.log(user)
        if (!user) {
            return errorGenerator({ statusCode: 401 });
        }
        const payload = { usertoken: { email: user.email } };
        console.log(`payload: ${JSON.stringify(payload)}`)
        const myToken = jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '7s' },
            // (err, token) => {
            //     if (err) { throw err };
            //     console.log(`==========token=======${JSON.stringify(token)}`)
            //     // return res.json({ token });
            //     // console.log(`==========직전 user=======${JSON.stringify(user)}`)
            //     // return res.status(201).json(user)
            //     return JSON.stringify(token)
            // }
            );
            // const myToken = "test토큰"
            console.log(`------myToken :: ${myToken}`)
            // return res.status(201).json({userData : user, tokenData: myToken})
            return res.status(201).json({userData : user, tokenData: myToken})



        // else {
        // console.log(`=========email========${user.email}`)

        // const payload = {
        //     usertoken: {
        //         email: user.email,
        //     },
        // };
        // jwt.sign(
        //     payload,
        //     config.jwtSecret,
        //     { expiresIn: 36000 },
        //     (err, token) => {
        //         if (err) { throw err };
        //         console.log(`==========token=======${JSON.stringify(token)}`)
        //         res.json({ token });
        //         console.log(`==========직전 user=======${JSON.stringify(user)}`)
        //         // return res.status(201).json(user)

    
        //     }
        // );
        
        // console.log(`========jwtSecret=========${JSON.stringify(config.jwtSecret)}`)
        // console.log(`=======verify==========${JSON.stringify(jwt.verify)}`)
        // return jwt.sign
        // // }
    } catch (err) {
        console.log(`ERROR: ${err}`)
        next(err);
    }
}
export default {
    join,
    login,
    exist,
    modify
}