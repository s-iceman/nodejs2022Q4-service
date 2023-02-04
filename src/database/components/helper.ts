import { NotFound } from 'src/common/exceptions';

async function getAll<T>(db: Map<string, any>): Promise<T[]> {
  const res: T[] = [];
  for (const [key, value] of db.entries()) {
    res.push({ id: key, ...value });
  }
  return new Promise((resolve) => resolve(res));
}

async function getElem<T>(
  db: Map<string, any>,
  id: string,
  filterFunc?: (e: any) => any,
): Promise<T> {
  const elem = db.get(id);
  if (!elem) {
    throw new NotFound();
  }
  const values = filterFunc ? filterFunc(elem) : elem;
  return new Promise((resolve) => resolve(elem ? { id, ...values } : null));
}

async function deleteElem<T>(db: Map<string, T>, id: string): Promise<void> {
  if (db.has(id)) {
    await db.delete(id);
  } else {
    throw new NotFound();
  }
}

export { getAll, getElem, deleteElem };
