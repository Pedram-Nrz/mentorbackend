import * as fs from 'fs/promises';

async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    return jsonData as T;
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at ${filePath}:`, error);
    throw error;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');

    console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to JSON file at ${filePath}:`, error);
    throw error;
  }
}

async function updateJsonFile<T>(filePath: string, update: Partial<T>): Promise<void> {
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData) as T;

    const updatedData = { ...jsonData, ...update };

    await writeJsonFile(filePath, updatedData);

    console.log(`JSON file at ${filePath} successfully updated`);
  } catch (error) {
    console.error(`Error updating JSON file at ${filePath}:`, error);
    throw error;
  }
}

export { readJsonFile, writeJsonFile, updateJsonFile };
