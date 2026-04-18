export enum LogLevel {
  VERBOSE = 'verbose',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface LogHandler {
  log(level: LogLevel, message: string): void;
}

export interface LoggerConfig {
  handlers: LogHandler[];
  level: LogLevel;
}
