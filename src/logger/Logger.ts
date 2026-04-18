import { LogHandler, LogLevel, LoggerConfig } from './types';

export class Logger {
  private handlers: LogHandler[];
  private level: LogLevel;

  constructor(config: LoggerConfig) {
    this.handlers = config.handlers;
    this.level = config.level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levelOrder = [LogLevel.VERBOSE, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR];
    const currentIndex = levelOrder.indexOf(this.level);
    const targetIndex = levelOrder.indexOf(level);
    return targetIndex >= currentIndex;
  }

  private formatMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }
    if (message instanceof Error) {
      return `${message.message}\n${message.stack || ''}`;
    }
    try {
      return JSON.stringify(message);
    } catch (e) {
      return String(message);
    }
  }

  verbose(message: any): void {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      const formattedMessage = this.formatMessage(message);
      this.handlers.forEach(handler => handler.log(LogLevel.VERBOSE, formattedMessage));
    }
  }

  info(message: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const formattedMessage = this.formatMessage(message);
      this.handlers.forEach(handler => handler.log(LogLevel.INFO, formattedMessage));
    }
  }

  warning(message: any): void {
    if (this.shouldLog(LogLevel.WARNING)) {
      const formattedMessage = this.formatMessage(message);
      this.handlers.forEach(handler => handler.log(LogLevel.WARNING, formattedMessage));
    }
  }

  error(message: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const formattedMessage = this.formatMessage(message);
      this.handlers.forEach(handler => handler.log(LogLevel.ERROR, formattedMessage));
    }
  }
}
