"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const types_1 = require("./types");
class Logger {
    constructor(config) {
        this.handlers = config.handlers;
        this.level = config.level;
    }
    shouldLog(level) {
        const levelOrder = [types_1.LogLevel.VERBOSE, types_1.LogLevel.INFO, types_1.LogLevel.WARNING, types_1.LogLevel.ERROR];
        const currentIndex = levelOrder.indexOf(this.level);
        const targetIndex = levelOrder.indexOf(level);
        return targetIndex >= currentIndex;
    }
    formatMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        if (message instanceof Error) {
            return `${message.message}\n${message.stack || ''}`;
        }
        try {
            return JSON.stringify(message);
        }
        catch (e) {
            return String(message);
        }
    }
    verbose(message) {
        if (this.shouldLog(types_1.LogLevel.VERBOSE)) {
            const formattedMessage = this.formatMessage(message);
            this.handlers.forEach(handler => handler.log(types_1.LogLevel.VERBOSE, formattedMessage));
        }
    }
    info(message) {
        if (this.shouldLog(types_1.LogLevel.INFO)) {
            const formattedMessage = this.formatMessage(message);
            this.handlers.forEach(handler => handler.log(types_1.LogLevel.INFO, formattedMessage));
        }
    }
    warning(message) {
        if (this.shouldLog(types_1.LogLevel.WARNING)) {
            const formattedMessage = this.formatMessage(message);
            this.handlers.forEach(handler => handler.log(types_1.LogLevel.WARNING, formattedMessage));
        }
    }
    error(message) {
        if (this.shouldLog(types_1.LogLevel.ERROR)) {
            const formattedMessage = this.formatMessage(message);
            this.handlers.forEach(handler => handler.log(types_1.LogLevel.ERROR, formattedMessage));
        }
    }
}
exports.Logger = Logger;
