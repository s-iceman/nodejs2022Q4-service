class InvalidUuid extends Error {
  constructor() {
    super('Invalid id. Must be an uuid type');
  }
}

class UserNotFound extends Error {
  constructor(id: string) {
    super(`User with id=${id} was not found`);
  }
}

export { InvalidUuid, UserNotFound };
