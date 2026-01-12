import { UserRepositoryInterface } from '@/modules/interfaces/user/UserInterface';
import { PasswordHasher } from '@/utils/crypto/PasswordHasher';
import { UserCreateDTO } from '../types';
import { randomBytes } from 'node:crypto';
import { MailService } from '@/infrastructure/email/MailService';

export class UserService {
    constructor(
        private readonly userRepo: UserRepositoryInterface,
        private readonly passwordHasher: PasswordHasher,
        private readonly mailService: MailService,
        private readonly transaction?: any
    ) { }

    async createAgent(data: UserCreateDTO) {
        const transaction = this.transaction;
        await transaction(async () => {
            const hashedPassword = randomBytes(32).toString('hex');
            const result = await this.userRepo.create({
                ...data,
                password: hashedPassword,
                recordStatus: false
            });
            // send activation email
            await this.mailService.sendEmail(result.email, 'Activate your account', `<p>Click the link below to activate your account:</p><p><a href="http://localhost:3000/activate/${result.id}">Activate</a></p>`);
        })

    }

    async setAgentPassword(userId: string, password: string) {
        const hashedPassword = await this.passwordHasher.hash(password);
        await this.userRepo.activateUser(userId, hashedPassword);
    }
}
