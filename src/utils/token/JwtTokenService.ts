import jwt from 'jsonwebtoken';
import { TokenService, TokenSignOptions } from './TokenService';

export class JwtTokenService implements TokenService {
    constructor(
        private readonly secret: string,
        private readonly defaultExpiresIn: string = '7d'
    ) { }

    sign(payload: object, options?: TokenSignOptions): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: (options?.expiresIn ?? this.defaultExpiresIn) as jwt.SignOptions['expiresIn'],
        });
    }

    verify<T = any>(token: string): T {
        return jwt.verify(token, this.secret) as T;
    }
}
