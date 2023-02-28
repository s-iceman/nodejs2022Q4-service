import { v4 } from 'uuid';
import { Transform, TransformFnParams } from 'class-transformer';
import { InvalidBoolType } from './exceptions';

const generateUuid = (existingValues: Map<string, any>): string => {
  while (true) {
    const userId = v4();
    if (!existingValues.has(userId)) {
      return userId;
    }
  }
};

function ToBoolean(): (value: any, key: string) => void {
  return Transform((params: TransformFnParams) => {
    const { value } = params;
    if (!['true', 'false', true, false].includes(value)) {
      throw new InvalidBoolType();
    }
    return value === 'true' || value === true;
  });
}

const getNotFoundMsg = (key: string, id: string): string => {
  return `${key} with id=${id} was not found`;
};

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date): string {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

export { generateUuid, ToBoolean, getNotFoundMsg, formatDate };
