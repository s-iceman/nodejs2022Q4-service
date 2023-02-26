import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

class InvalidUuid extends BadRequestException {
  constructor() {
    super('Invalid id. Must be an uuid type');
  }
}

class WrongPassword extends ForbiddenException {
  constructor() {
    super('Password is wrong. Try again.');
  }
}

class InvalidBoolType extends BadRequestException {
  constructor() {
    super('Type of the field is wrong. Must be boolean.');
  }
}

class InvalidEntity extends UnprocessableEntityException {
  constructor() {
    super('Entity with required id is not exists.');
  }
}

class NotFound extends NotFoundException {
  constructor() {
    super('Object was not found');
  }
}

class TrackNotFound extends NotFoundException {
  constructor() {
    super('Track was not found');
  }
}

class ArtistNotFound extends NotFoundException {
  constructor() {
    super('Artist was not found');
  }
}

class AlbumNotFound extends NotFoundException {
  constructor() {
    super('Album was not found');
  }
}

class UserNotFound extends NotFoundException {
  constructor() {
    super('User was not found');
  }
}

export {
  AlbumNotFound,
  ArtistNotFound,
  TrackNotFound,
  UserNotFound,
  NotFound,
  InvalidUuid,
  WrongPassword,
  InvalidBoolType,
  InvalidEntity,
};
