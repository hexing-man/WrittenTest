# Logger 日志系统文档

## 1. 系统概述

Logger 是一个 TypeScript 日志系统，提供统一的日志记录接口，支持多种日志级别和输出方式。

## 2. 功能特性

- **统一接口**：提供简洁的方法用于写入不同级别的日志
- **多日志级别**：支持 verbose、info、warning、error 四种级别
- **多输出方式**：支持控制台输出和文件输出（模拟实现）
- **可扩展性**：架构设计支持未来添加更多日志处理器
- **类型安全**：使用 TypeScript 确保类型安全

## 3. 代码结构

```
src/
├── logger/
│   ├── types.ts          # 类型定义和接口
│   ├── Logger.ts         # 主 Logger 类
│   ├── handlers/
│   │   ├── ConsoleLogHandler.ts  # 控制台日志处理器
│   │   └── FileLogHandler.ts     # 文件日志处理器
│   └── index.ts          # 导出文件
└── example.ts            # 使用示例
```

## 4. 使用方法

### 基本使用

```typescript
import { Logger, LogLevel, ConsoleLogHandler, FileLogHandler } from './logger';

// 创建 Logger 实例
const logger = new Logger({
  handlers: [
    new ConsoleLogHandler(),
    new FileLogHandler('app.log')
  ],
  level: LogLevel.VERBOSE
});

// 记录不同级别的日志
logger.verbose('This is a verbose message');
logger.info('This is an info message');
logger.warning('This is a warning message');
logger.error('This is an error message');

// 记录不同类型的数据
logger.info({ key: 'value', number: 42, array: [1, 2, 3] });
logger.error(new Error('Test error'));
```

### 日志级别说明

- **VERBOSE**：详细信息，通常用于调试
- **INFO**：一般信息，用于记录正常的运行状态
- **WARNING**：警告信息，表示可能的问题
- **ERROR**：错误信息，表示严重的问题

## 5. 设计理念

### 1. 分层设计

- **接口层**：定义了 `LogHandler` 接口，规范了日志处理器的行为
- **实现层**：提供了具体的日志处理器实现，如 `ConsoleLogHandler` 和 `FileLogHandler`
- **核心层**：`Logger` 类负责管理日志处理器和提供统一的日志接口

### 2. 可扩展性

- **处理器扩展**：通过实现 `LogHandler` 接口，可以添加新的日志处理器，如网络日志处理器、数据库日志处理器等
- **级别扩展**：通过修改 `LogLevel` 枚举，可以添加新的日志级别
- **格式化扩展**：通过修改 `formatMessage` 方法，可以支持更复杂的消息格式化

### 3. 灵活性

- **多处理器**：支持同时使用多个日志处理器，如同时输出到控制台和文件
- **级别过滤**：通过设置日志级别，可以过滤掉不需要的日志
- **消息类型**：支持字符串、对象和 Error 对象等多种消息类型

## 6. 未来扩展

### 1. 文件 I/O 实现

目前的 `FileLogHandler` 使用了模拟的 `NativeFileWriteSync` 函数，未来可以实现真正的文件 I/O 操作

### 2. 网络日志处理器

可以添加网络日志处理器，将日志发送到远程服务器

### 3. 配置管理

可以添加配置管理功能，支持从配置文件或环境变量中读取日志配置

### 4. 日志轮转

对于文件日志，可以添加日志轮转功能，避免日志文件过大
