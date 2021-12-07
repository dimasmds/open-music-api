/* eslint-disable no-unused-vars */
import * as Stream from 'stream';

type FileParameter = {
  file: Stream.Readable,
  meta: {
    filename: string,
    contentType: string,
  },
}

interface StorageService {
  writeFile(file: FileParameter): Promise<string>
}

export default StorageService;
