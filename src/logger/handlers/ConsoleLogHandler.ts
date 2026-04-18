import { LogHandler, LogLevel } from '../types';

export class ConsoleLogHandler implements LogHandler {
  log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    switch (level) {
      case LogLevel.VERBOSE:
        console.log(logMessage);
        break;
      case LogLevel.INFO:
        console.info(logMessage);
        break;
      case LogLevel.WARNING:
        console.warn(logMessage);
        break;
      case LogLevel.ERROR:
        console.error(logMessage);
        break;
    }
  }
}
