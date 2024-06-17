import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../consts/jwt';

export const generateToken = (username: string | undefined) : string => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}