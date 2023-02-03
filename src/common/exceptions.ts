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

class WrongOldPassword extends Error {
  constructor() {
    super('Old password is wrong. Try again.');
  }
}

export { InvalidUuid, UserNotFound, WrongOldPassword };
