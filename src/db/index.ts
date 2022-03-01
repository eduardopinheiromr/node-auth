import { getDbByEntity, saveDbByEntity } from "./utils";
import { nanoid } from "nanoid";

const create = (entity: string, data: any) => {
  const db = getDbByEntity(entity);
  const newEntry = { ...data, id: nanoid() };
  const updatedDb = [...db, newEntry];
  saveDbByEntity(entity, updatedDb);

  return newEntry;
};

const findAll = (entity: string) => {
  return getDbByEntity(entity);
};

const find = (entity: string, key: string, value: string) => {
  const db = getDbByEntity(entity);
  const foundData = db.find((item: any) => item[key] === value);
  return foundData;
};

const findById = (entity: string, id: string) => {
  const db = getDbByEntity(entity);
  const foundData = db.find((item: any) => item.id === id);
  return foundData;
};

const update = (entity: string, id: string, data: any) => {
  const db = getDbByEntity(entity);
  const newData = db.map((item: any) =>
    item.id === id ? { ...item, ...data } : item
  );
  saveDbByEntity(entity, newData);
  return data;
};

const remove = (entity: string, id: string) => {
  const db = getDbByEntity(entity);
  const newData = db.filter((item: any) => item.id !== id);

  saveDbByEntity(entity, newData);
};

export const db = {
  findAll,
  find,
  findById,
  create,
  update,
  remove,
};
