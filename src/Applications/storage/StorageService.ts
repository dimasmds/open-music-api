/* eslint-disable no-unused-vars */
import { Readable } from 'stream';

export type FileParameter = {
  file: Readable,
  meta: {
    filename: string,
    contentType: string,
  },
}

interface StorageService {
  writeFile(file: FileParameter): Promise<string>
}

export default StorageService;
