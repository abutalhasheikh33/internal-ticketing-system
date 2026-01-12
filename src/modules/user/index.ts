import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
import { createUserRoutes } from './routes';
import { Utils } from '@/utils';
import { MailService } from '@/infrastructure/email/MailService';
type UserModuleUtil = Pick<
    Utils,
    'passwordHasher' | 'tokenService'
>;



export function buildUserModule(deps: {
    db: any;        // optional, if repos need transactions
    util: UserModuleUtil;
    models: Pick<any, 'User'>;
    mailService: MailService;
}) {
    const userRepo = new UserRepository(deps.models.User);

    const userService = new UserService(
        userRepo,
        deps.util.passwordHasher,
        deps.mailService,
        deps.db.transaction
    );

    const userController = new UserController(userService);
    const router = createUserRoutes(userController);

    return {
        userService,
        userController,
        router
    };
}
