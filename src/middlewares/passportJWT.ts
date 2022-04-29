import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

const middlewaresJWT = function(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;

    if(!token){
        res.status(401).send({ message: 'Unauthorized: No token provided'});
    } else {
        const JWTSECRET = process.env.JWT_SECRET;
        jwt.verify(token as string, JWTSECRET as string, function(err, decoded: any) {
            if(err){
              console.log("Erro na verificação do token");
              return( res.status(401).send({ message: 'Unauthorized access!' }) );
            } else {
                const user = decoded;

                const existUser = User.findById({ _id: user.id });

                if(!existUser) {
                    return res.status(401).send({ message: 'Not allowed!' });
                } 

                request.decode = decoded;
                
                next();
            }
        });
    }
};

export default middlewaresJWT;