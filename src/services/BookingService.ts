import { Booking } from '../definitions/Booking';
import { readJsonFile, updateJsonFile } from '../utils/HandleJSON';

async function getBookings(filePath: string): Promise<Booking[]> {
  try {
    const mentorsData = await readJsonFile<{ bookings: Booking[] }>(filePath);

    return mentorsData?.bookings || [];
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at ${filePath}:`, error);
    throw error;
  }
}

async function addBooking(filePath: string, booking: Booking): Promise<Booking[]> {
  try {
    const allBookings = await getBookings(filePath);
    const updatedBookings = {
      bookings: [...allBookings, booking],
    };
    await updateJsonFile(filePath, updatedBookings);
    const bookings = await getBookings(filePath);
    return bookings;
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at ${filePath}:`, error);
    throw error;
  }
}

export { getBookings, addBooking };
