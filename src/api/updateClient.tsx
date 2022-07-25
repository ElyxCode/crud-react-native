import axios from 'axios';
import {UserFormData} from '../interface/UserFormData';

export const updateClient = async (data: UserFormData) => {
  try {
    const resp = await axios.put(
      `http://192.168.50.9:3000/clients/${data.id}`,
      data,
    );
    if (resp.status != 200) {
      return false;
    }

    return true;
  } catch (err) {
    if (err instanceof TypeError) {
      return console.log(err);
    }

    if (err instanceof Error) {
      return console.log(err);
    }
  }
};
