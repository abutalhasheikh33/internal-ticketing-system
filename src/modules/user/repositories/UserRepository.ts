import { UserCreateDTO } from "../types";
import { UserRepositoryInterface } from "@/modules/interfaces/user/UserInterface";

export class UserRepository implements UserRepositoryInterface {
    constructor(private model: any) { }

    async findById(id: string) {
        const result = await this.model.findOne({
            where: { id }
        });
        return result;
    }

    async create(data: UserCreateDTO) {
        const result = await this.model.create(data);
        return result;
    }

    async activateUser(userId: string, passwordHash: string) {
        await this.model.update(
            { password: passwordHash, recordStatus: true },
            { where: { id: userId } }
        );
    }
}
