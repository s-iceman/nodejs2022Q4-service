import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

class InvalidUuid extends BadRequestException {
  constructor() {
    super({ description: 'Invalid id. Must be an uuid type' });
  }
}

class NotFound extends NotFoundException {
  constructor() {
    super({ description: 'Element was not found' });
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

export { NotFound, InvalidUuid, WrongPassword, InvalidBoolType };
