import axios from 'axios';
import {UserFormData} from '../interface/UserFormData';

export const createClient = async (data: UserFormData) => {
  try {
    await axios.post('http://192.168.50.9:3000/clients', data);
  } catch (err) {
    if (err instanceof TypeError) {
      return console.log(err);
    }

    if (err instanceof Error) {
      return console.log(err);
    }
  }
};
