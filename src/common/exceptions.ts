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

class WrongPassword extends Error {
  constructor() {
    super('Password is wrong. Try again.');
  }
}

class InvalidBoolType extends Error {
  constructor() {
    super('Type of the field is wrong. Must be boolean.');
  }
}

export { NotFound, InvalidUuid, WrongPassword, InvalidBoolType };
