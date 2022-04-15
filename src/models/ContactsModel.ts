import { Types } from 'mongoose';
import mongoose from '../database';

// interface IAddress {
//   street: string;
//   complement: string;
//   district: string;
//   city: string;
//   uf: string;
// }

interface IContact {
  name: string
  lastname: string
  telephone: string;
  birthdate: string;
  email: string;
  street: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new mongoose.Schema<IContact>({
    name: {
        type: String,
        require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    telephone: {
      type: String,
      require: true,
    },
    birthdate: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      required: false,
    },
    complement: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    uf: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;