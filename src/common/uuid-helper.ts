import { v4 } from 'uuid';

const generateUuid = (existingValues: Map<string, any>): string => {
  while (true) {
    const userId = v4();
    if (!existingValues.has(userId)) {
      return userId;
    }
  }
};

export { generateUuid };
