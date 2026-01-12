export type UserRole = 'REQUESTER' | 'AGENT' | 'ADMIN';

export type AccountStatus = 'PENDING_ACTIVATION' | 'ACTIVE' | 'DEACTIVATED';

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: UserRole[];
}

export interface UserFindModelOptions {
  email?: string;
  password?: string;
  name?: string;
  id?: string;
  recordStatus?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreateModelOptions {
  email: string;
  password?: string;
  name: string;
}

export interface UserCreateDTO {
  email: string;
  password?: string;
  name: string;
  recordStatus?: boolean;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  recordStatus: boolean;
}