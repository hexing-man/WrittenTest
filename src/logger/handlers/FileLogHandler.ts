import { LogHandler, LogLevel } from '../types';

function NativeFileWriteSync(filePath: string, buffer: string): void {
  console.log(`[File IO ${filePath}] ${buffer}`);
}

export class FileLogHandler implements LogHandler {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    NativeFileWriteSync(this.filePath, logMessage);
  }
}
