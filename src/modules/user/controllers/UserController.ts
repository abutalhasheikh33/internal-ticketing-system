import { Request, Response } from 'express';
import { UserServiceInterface } from '@/modules/interfaces/user/UserInterface';

export class UserController {
    constructor(private readonly userService: UserServiceInterface) { }

    async ping(req: Request, res: Response) {
        res.json({ message: 'pong' });
    }

    async createAgent(req: Request, res: Response) {
        try {
            await this.userService.createAgent(req.body);
            res.status(201).json("User created successfully");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async setAgentPassword(req: Request, res: Response) {
        try {
            await this.userService.setAgentPassword(req.params.userId, req.body.password);
            res.status(200).json("Password set successfully");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
