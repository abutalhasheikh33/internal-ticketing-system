import { BcryptPasswordHasher } from './crypto/BcryptPasswordHasher';
import { JwtTokenService } from './token/JwtTokenService';
import { config } from '../config/env';

export const utils = {
    passwordHasher: new BcryptPasswordHasher(),
    tokenService: new JwtTokenService(config.JWT_SECRET),
};

export type Utils = typeof utils;
