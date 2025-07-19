import { v4 as uuidv4} from 'uuid';

export class UserEntity
{
    public readonly id: string;
    private readonly registeredAt: Date;

    constructor(
      public name: string,
      public lastname: string,
      public username: string,
      public birthday: Date,
      public hasPassport: boolean,
      public age: number,
    )
    {
      this.id = uuidv4();
      this.registeredAt = new Date();
    }
}