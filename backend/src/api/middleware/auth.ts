import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default (req : Request, res : Response, next : NextFunction) => {
    const token = req.header['authorization'].substring(7);

    if(!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try{
        const decoded = jwt.verify(token, config.jwtSecret);
        req.body.user = decoded;
        next();
    } catch(err){
        res.status(401).json({ msg: "Token is not valid" });
    }
};