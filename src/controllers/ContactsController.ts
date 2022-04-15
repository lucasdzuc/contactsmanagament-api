import { request, Request, response, Response } from 'express';
import Contact from '../models/ContactsModel';
import User from '../models/UserModel';

// type UserProps = {
//   name: string;
//   lastname: string;
//   telephone: string;
//   birthdate: string;
//   email: string;
//   street: string;
//   complement: string;
//   district: string;
//   city: string;
//   uf: string;
//   user?: any;
// }

class Contacts {

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const userToken = req.decode;
      const contacts = await Contact.find().where({ user: userToken.id }).sort({ _id: -1 });

      // console.log(contacts);
      
      return res.status(200).send(contacts);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Failed load your list contacts!" });
    }
  }

  async show(req: Request, res: Response){
    try {
      const { id } = req.params;

      const contact = await Contact.findById({ _id: id });

      return res.status(200).send(contact);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Falied show contact!" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, lastname, telephone, birthdate, email, street, complement, district, city, uf } = req.body;
      const userToken = req.decode;

      const contacts = await Contact.create({ 
        name,
        lastname,
        telephone,
        birthdate,
        email,
        street,
        complement,
        district,
        city,
        uf,
        user: userToken._id,
      });

      return res.status(201).send({ contacts });
    } catch (error) {
      return res.status(400).json({ error: "Failed create contact!" })
    }
  }

  async update(req: Request, res: Response){
    try {
      const { id } = req.params;
      const { name, lastname, telephone, birthdate, email, street, complement, district, city, uf } = req.body;
      const user = request.decode;

      const existUser = await User.findById({ _id: user.id });
      if (!existUser) return res.status(401).json({ error: "User not exist!" });
      
      // const existContact = await Contact.findById({ _id: id });
      // if (existContact.user != user.id) return res.status(401).json({ error: "User not allowed!" });

      await Contact.findByIdAndUpdate(id, {
        name,
        lastname,
        telephone,
        birthdate,
        email,
        street,
        complement,
        district,
        city,
        uf,
    }, { new: true });

      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({ error: "Failed update contact!" });
    }
  }

  async delete(req: Request, res: Response){
    try {
      const { id } = req.params;

      await Contact.findByIdAndRemove({ _id: id });

      return res.send();
    } catch (error) {
      return res.status(400).json({ error: "Failed delete contact!" });
    }
  }
}

export default Contacts;