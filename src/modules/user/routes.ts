import { Router } from 'express';
import { UserController } from './controllers/UserController';

export function createUserRoutes(controller: UserController) {
    const router = Router();

    router.get('/ping', controller.ping.bind(controller));
    router.post('/create-agent', controller.createAgent.bind(controller));
    router.post('/set-agent-password/:userId', controller.setAgentPassword.bind(controller));

    return router;
}
