/* eslint-disable no-unused-vars */

interface Logger {
  writeError(error: Error): Promise<void>
}

export default Logger;
