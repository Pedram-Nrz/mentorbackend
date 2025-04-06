import { Mentor } from '../definitions/Mentor';
import { readJsonFile } from '../utils/HandleJSON';

async function getMentors(filePath: string): Promise<Mentor[]> {
  try {
    const mentorsData = await readJsonFile<{ mentors: Mentor[] }>(filePath);

    return mentorsData?.mentors || [];
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at ${filePath}:`, error);
    throw error;
  }
}

export { getMentors };
