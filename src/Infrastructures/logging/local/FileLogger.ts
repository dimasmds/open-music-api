/* istanbul ignore file */

import fs from 'fs';
import path from 'path';
import { createSimpleFileLogger } from 'simple-node-logger';
import Logger from '../../../Applications/log/Logger';

class FileLogger implements Logger {
  async writeError(error: Error): Promise<void> {
    const filePath = path.resolve(process.cwd(), 'logs/error/');
    const fileName = `${FileLogger.getCurrentDate()}.log`;

    FileLogger.createLogFileIfItNotExists(filePath, fileName);

    const log = createSimpleFileLogger(`${filePath}/${fileName}`);

    log.error({
      time: new Date().toISOString(),
      stack: error.stack,
      error,
    });
  }

  private static createLogFileIfItNotExists(filePath: string, fileName: string) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(`${filePath}/${fileName}`, `log for date ${new Date().toLocaleDateString()}`);
    }
  }

  private static getCurrentDate(): string {
    return new Date().toLocaleDateString('id').replace(/[/\\*]/g, '-');
  }
}

export default FileLogger;
