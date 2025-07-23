export interface CreateUserDTO
{
    name: string;
    lastname: string;
    username: string;
    birthdate: Date;
    hasPassport: boolean;
    age: number;
}

export interface UpdateUserDTO extends CreateUserDTO
{
  id: string;
  registeredAt: Date;
}