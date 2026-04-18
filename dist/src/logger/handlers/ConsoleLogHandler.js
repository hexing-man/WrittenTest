"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogHandler = void 0;
const types_1 = require("../types");
class ConsoleLogHandler {
    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        switch (level) {
            case types_1.LogLevel.VERBOSE:
                console.log(logMessage);
                break;
            case types_1.LogLevel.INFO:
                console.info(logMessage);
                break;
            case types_1.LogLevel.WARNING:
                console.warn(logMessage);
                break;
            case types_1.LogLevel.ERROR:
                console.error(logMessage);
                break;
        }
    }
}
exports.ConsoleLogHandler = ConsoleLogHandler;
