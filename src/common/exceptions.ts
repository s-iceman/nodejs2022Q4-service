class InvalidUuid extends Error {
  constructor() {
    super('Invalid id. Must be an uuid type');
  }
}

class NotFound extends Error {
  constructor() {
    super('Element was not found');
  }
}

class UserNotFound extends Error {
  constructor(id: string) {
    super(`User with id=${id} was not found`);
  }
}

class ArtistNotFound extends Error {
  constructor(id: string) {
    super(`Artist with id=${id} was not found`);
  }
}

class WrongOldPassword extends Error {
  constructor() {
    super('Old password is wrong. Try again.');
  }
}

class InvalidBooolType extends Error {
  constructor() {
    super('Type of the field is wrong. Must be boolean.');
  }
}

export {
  NotFound,
  ArtistNotFound,
  UserNotFound,
  InvalidUuid,
  WrongOldPassword,
  InvalidBooolType,
};
