import fs from "fs/promises";
import { FileSystemError } from "../errors";

export const getFilenames = async (folderPath: string) => {
  try {
    return await fs.readdir(folderPath);
  } catch (error) {
    throw new FileSystemError("Unable to read the directory", { cause: error });
  }
};

export const createFolderIfNotExists = async (folderPath: string) => {
  try {
    // Check if the folder exists
    await fs.access(folderPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      // Folder doesn't exist, create it
      console.info(`[INFO] Folder does not exist. Creating: ${folderPath}`);
      await fs.mkdir(folderPath, { recursive: true });
    } else {
      throw error; // Rethrow other errors
    }
  }
};
