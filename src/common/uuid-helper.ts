import { v4 } from 'uuid';
import { Transform, TransformFnParams } from 'class-transformer';
import { InvalidBooolType } from './exceptions';

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
    if (!['true', 'false'].includes(value)) {
      throw new InvalidBooolType();
    }
    return value === 'true' || value === true;
  });
}

export { generateUuid, ToBoolean };
