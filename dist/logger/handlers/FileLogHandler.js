"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogHandler = void 0;
function NativeFileWriteSync(filePath, buffer) {
    console.log(`[File IO ${filePath}] ${buffer}`);
}
class FileLogHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }
    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
        NativeFileWriteSync(this.filePath, logMessage);
    }
}
exports.FileLogHandler = FileLogHandler;
