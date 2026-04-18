"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
// 创建 Logger 实例，使用控制台和文件处理器
const logger = new logger_1.Logger({
    handlers: [
        new logger_1.ConsoleLogHandler(),
        new logger_1.FileLogHandler('app.log')
    ],
    level: logger_1.LogLevel.VERBOSE
});
// 测试不同级别的日志
logger.verbose('This is a verbose message');
logger.info('This is an info message');
logger.warning('This is a warning message');
logger.error('This is an error message');
// 测试不同类型的消息
logger.info({ key: 'value', number: 42, array: [1, 2, 3] });
logger.error(new Error('Test error'));
