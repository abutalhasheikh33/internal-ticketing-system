import { UserCreateDTO, UserResponseDTO, UserFindModelOptions } from "@/modules/user/types";

export interface UserServiceInterface {
    createAgent(data: UserCreateDTO): Promise<UserResponseDTO | void>;
    setAgentPassword(userId: string, password: string): Promise<void>;
}

export interface UserRepositoryInterface {
    create(data: UserCreateDTO): Promise<UserResponseDTO>;
    findById(id: string): Promise<UserResponseDTO | null>;
    activateUser(userId: string, passwordHash: string): Promise<void>;
}