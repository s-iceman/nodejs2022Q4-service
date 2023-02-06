interface IUser {
  id: string;
  login: string;
  password?: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

type UserPartial = Omit<IUser, 'id'>;

export { IUser, UserPartial };
