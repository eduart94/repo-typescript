import { APIGatewayEvent, Handler } from 'aws-lambda'
import User from './types/user';
import AuthenticationInfo from './types/authenticationInfo';
import {generateToken} from './utilties/jwt'
import fs from 'fs';
import path from 'path';

export const handler: Handler = async (event: APIGatewayEvent): Promise<any> => {
    console.log(' Evento Api gateway --> ', event);
    try {
        let bodyAuthenticationStr: string | null = event.body;
        if(bodyAuthenticationStr === null){
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: 'credenziali errate, utente non autenticato'
                })
            }
        }

        let body: AuthenticationInfo = JSON.parse(bodyAuthenticationStr);
        let pathUser = path.resolve(__dirname, '..', 'user.json');
        // ottengo user dal DB
        let userDB: string = await fs.promises.readFile(pathUser, {encoding: 'utf-8'});
        let userObj: Array<Partial<User>> = JSON.parse(userDB);

        console.log(' USER DB -> ', userObj);

        let user: Partial<User> | undefined = userObj.find((user:Partial<User>) => (user.username === body.username && user.password === body.password));

        if(!user && user === undefined){
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: 'credenziali errate, utente non autenticato'
                })
            }
        }

        let tokenStr: string = generateToken(user.username);
        console.log(' generato token --> ', tokenStr);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Autenticato',
                token: tokenStr
            })
        }
        
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message
            })
        }
    }
}