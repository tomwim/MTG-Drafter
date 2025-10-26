import { BaseEntity, OmitBase } from './base';

export interface User extends BaseEntity {
    username: string;
    email: string;
}

export type CreateUserDto = OmitBase<User> & {
    password: string;
};

export type UpdateUserDto = Partial<Pick<User, 'username' | 'email'>>;