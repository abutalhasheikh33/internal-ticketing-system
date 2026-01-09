export interface TokenService {
  sign(payload: object, options?: TokenSignOptions): string;
  verify<T = any>(token: string): T;
}

export type TokenSignOptions = {
  expiresIn?: string | number;
};
