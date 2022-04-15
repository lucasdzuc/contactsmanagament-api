import { Request, Response } from 'express';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserProps {
    _id: string;
    name: string;
    password: undefined;
    createdAt: string;
    updatedAt: string;
    __v: number;
    token: string;
    refreshtoken: string;
}

class SessionController {

    async create(request: Request, response: Response){
        const { email, password } = request.body;

        const user = await User.findOne<IUserProps>({ email }).select('+password');

        // console.log(user);

        if(!user){
            return response.status(400).send({ error: 'User not found!' });
        }

        if(!bcrypt.compare(password, user.password as any)){
            return response.status(400).send({ error: 'Invalid password!' });
        }

        user.password = undefined;

        // TIME TOKEN [ 43200 = 12 horas, 86400 = 1 dia, 604800 = 1 semana ]
        const JWRSECRET = process.env.JWT_SECRET;
        // const JWTREFRESHTOKEN = process.env.JWT_REFRESH_SECRET;
        const payload = { id: user._id }
        const token = jwt.sign(payload, JWRSECRET as string, { expiresIn: 86400 });
        // const refreshtoken = jwt.sign(payload, JWTREFRESHTOKEN as string, { expiresIn: 604800 });

        return response.status(201).send({ user, token });
    }

    // async refreshtoken(request: Request, response: Response){
    //     try {
    //       const user = request.decode;
    //       // const { refreshtoken } = request.body;
    //       // console.log(refreshtoken);
    
    //       const payload = { id: user._id};
    
    //       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });
    
    //       console.log("Novo token enviado ás", new Date().toLocaleTimeString());
    
    //       return response.status(201).send({ token });
    //     } catch (error) {
    //       console.log(error);
    //       return response.status(400).json({ error: "Failed refresh token!" });
    //     }
    // }
    
}

export default SessionController;