export class UserEntity
{
    constructor(
      public name: string,
      public lastname: string,
      public username: string,
      public birthday: Date,
      public hasPassport: boolean,
      public age: number,
      public registeredAt: Date,
    )
    {}
}