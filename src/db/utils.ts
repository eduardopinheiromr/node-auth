import fs from "fs";
import path from "path";

export const getDbByEntity = (entity: string) => {
  const filePath = path.join(__dirname, "data", `${entity}.json`);

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    fs.writeFileSync(filePath, "[]");
    return [];
  }
};

export const saveDbByEntity = (entity: string, data: any) => {
  const filePath = path.join(__dirname, "data", `${entity}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data));
};
