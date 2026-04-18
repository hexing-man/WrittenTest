import { Logger, LogLevel, ConsoleLogHandler, FileLogHandler } from './logger';

// 创建 Logger 实例，使用控制台和文件处理器
const logger = new Logger({
  handlers: [
    new ConsoleLogHandler(),
    new FileLogHandler('app.log')
  ],
  level: LogLevel.VERBOSE
});

// 测试不同级别的日志
logger.verbose('This is a verbose message');
logger.info('This is an info message');
logger.warning('This is a warning message');
logger.error('This is an error message');

// 测试不同类型的消息
logger.info({ key: 'value', number: 42, array: [1, 2, 3] });
logger.error(new Error('Test error'));
