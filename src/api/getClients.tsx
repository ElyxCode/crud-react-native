import axios from 'axios';
import { UserFormData } from '../interface/UserFormData';

export const getClients = async () => {
    try {
        const resp = await axios.get<UserFormData[]>(
            'http://192.168.50.9:3000/clients',
        );
        const { data } = resp;
        return data;
    } catch (err) {
        if (err instanceof TypeError) {
            return console.log(err);
        }

        if (err instanceof Error) {
            return console.log(err);
        }
    }
};
