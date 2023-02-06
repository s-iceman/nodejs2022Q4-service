import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

class InvalidUuid extends BadRequestException {
  constructor() {
    super({ description: 'Invalid id. Must be an uuid type' });
  }
}

class NotFound extends NotFoundException {
  constructor() {
    super({ description: 'Object was not found' });
  }
}

class WrongPassword extends ForbiddenException {
  constructor() {
    super({ description: 'Password is wrong. Try again.' });
  }
}

class InvalidBoolType extends BadRequestException {
  constructor() {
    super({ description: 'Type of the field is wrong. Must be boolean.' });
  }
}

class InvalidEntity extends UnprocessableEntityException {
  constructor() {
    super({ desription: 'Entity with required id is not exists.' });
  }
}

export { NotFound, InvalidUuid, WrongPassword, InvalidBoolType, InvalidEntity };
