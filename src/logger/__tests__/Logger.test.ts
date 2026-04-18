import { Logger, LogLevel, ConsoleLogHandler, FileLogHandler } from '../index';

describe('Logger', () => {
  describe('LogLevel', () => {
    it('should have four log levels', () => {
      expect(Object.keys(LogLevel)).toHaveLength(4);
      expect(LogLevel.VERBOSE).toBe('verbose');
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.WARNING).toBe('warning');
      expect(LogLevel.ERROR).toBe('error');
    });
  });

  describe('ConsoleLogHandler', () => {
    it('should implement LogHandler interface', () => {
      const handler = new ConsoleLogHandler();
      expect(typeof handler.log).toBe('function');
    });

    it('should log without throwing', () => {
      const handler = new ConsoleLogHandler();
      expect(() => {
        handler.log(LogLevel.INFO, 'test message');
      }).not.toThrow();
    });
  });

  describe('FileLogHandler', () => {
    it('should implement LogHandler interface', () => {
      const handler = new FileLogHandler('test.log');
      expect(typeof handler.log).toBe('function');
    });

    it('should log without throwing', () => {
      const handler = new FileLogHandler('test.log');
      expect(() => {
        handler.log(LogLevel.INFO, 'test message');
      }).not.toThrow();
    });
  });

  describe('Logger', () => {
    let logger: Logger;
    let consoleHandler: ConsoleLogHandler;
    let fileHandler: FileLogHandler;

    beforeEach(() => {
      consoleHandler = new ConsoleLogHandler();
      fileHandler = new FileLogHandler('test.log');
      logger = new Logger({
        handlers: [consoleHandler, fileHandler],
        level: LogLevel.VERBOSE
      });
    });

    it('should create Logger instance', () => {
      expect(logger).toBeInstanceOf(Logger);
    });

    it('should log verbose messages', () => {
      expect(() => logger.verbose('verbose message')).not.toThrow();
    });

    it('should log info messages', () => {
      expect(() => logger.info('info message')).not.toThrow();
    });

    it('should log warning messages', () => {
      expect(() => logger.warning('warning message')).not.toThrow();
    });

    it('should log error messages', () => {
      expect(() => logger.error('error message')).not.toThrow();
    });

    it('should handle string messages', () => {
      expect(() => logger.info('string message')).not.toThrow();
    });

    it('should handle object messages', () => {
      expect(() => logger.info({ key: 'value' })).not.toThrow();
    });

    it('should handle array messages', () => {
      expect(() => logger.info([1, 2, 3])).not.toThrow();
    });

    it('should handle Error objects', () => {
      const error = new Error('test error');
      expect(() => logger.error(error)).not.toThrow();
    });

    it('should handle null and undefined', () => {
      expect(() => logger.info(null as any)).not.toThrow();
      expect(() => logger.info(undefined as any)).not.toThrow();
    });

    it('should filter logs based on level', () => {
      const filteredLogger = new Logger({
        handlers: [consoleHandler],
        level: LogLevel.ERROR
      });
      expect(() => filteredLogger.verbose('should not log')).not.toThrow();
      expect(() => filteredLogger.info('should not log')).not.toThrow();
      expect(() => filteredLogger.warning('should not log')).not.toThrow();
      expect(() => filteredLogger.error('should log')).not.toThrow();
    });
  });
});