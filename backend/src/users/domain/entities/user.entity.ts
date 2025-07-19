import { v4 as uuidv4} from 'uuid';

export class UserEntity
{
    public id: string;

    constructor(
      public name: string,
      public lastname: string,
      public username: string,
      public birthday: Date,
      public hasPassport: boolean,
      public age: number,
      public registeredAt: Date,
    )
    {
        this.id = uuidv4();
    }
}