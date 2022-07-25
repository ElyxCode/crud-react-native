import axios from 'axios';

export const deleteClient = async (id: number) => {
  try {
    const resp = await axios.delete(`http://192.168.50.9:3000/clients/${id}`);
    console.log(resp);
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
