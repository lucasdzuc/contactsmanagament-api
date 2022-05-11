import { Request, Response } from 'express';
import User from '../models/UserModel';

// interface IUser {
//     name: string;
//     lastname: string;
//     email: string;
//     password: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

class UserController {

    async index(request: Request, response: Response){
        try {
            const user = await User.find();

            // user.password = undefined;

            return response.send({ user });
        } catch (error) {
            return response.status(500).json({ error: 'Return failed!' });
        }
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const user = await User.findById({ _id: id });

        return response.send(user);
    }

    //count['count(*)'

    async create(request: Request, response: Response){
        try {
            const { name, lastname, email, password } = request.body;

            if(await User.findOne({ email })){
                return response.status(401).send({ error: 'User already exists!' });
            }

            const user = await User.create({ name, lastname, email, password});

            // user.password = undefined;
            return response.send({ user });
        } catch (err) {
            return response.status(400).json({ err: 'Register failed!' });
        }
    }

    async update(request: Request, response: Response){
        try {
            const { id }  = request.params;
            const { name } = request.body;

            const user = await User.findByIdAndUpdate({_id: id}, {
                name
            }, { new: true });

            // return response.send( user );
            return response.status(200).json(user);
        } catch (error) {
            console.log(error);
            return response.status(400).json({ error: 'Update user failed!' });
        }
    }

    async delete(request: Request, response: Response){
        try {
            const { userId } = request.params;

            await User.findByIdAndRemove(userId);

            return response.status(200);
        } catch (error) {
            return response.status(400).json({ error: 'Error deleting user!' });
        }
    }
    
}

export default UserController;