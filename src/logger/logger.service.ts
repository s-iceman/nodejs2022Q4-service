import { Injectable, LoggerService, OnModuleDestroy } from '@nestjs/common';
import { formatDate } from 'src/common/helper';
import { join } from 'node:path';
import { FileHandle, stat, open, mkdir, rename } from 'node:fs/promises';
import { Mutex } from 'async-mutex';

const BYTES_PER_KB = 1024;
const DEFAULT_SIZE = 10;

interface ILog {
  handle: FileHandle | undefined;
  file: string;
  isError: boolean;
}

@Injectable()
export class LoggingService implements LoggerService, OnModuleDestroy {
  messageLog: ILog;
  errorLog: ILog;
  maxFileSize: number;
  mutex: Mutex;

  constructor() {
    this.messageLog = { handle: undefined, file: '', isError: false };
    this.errorLog = { handle: undefined, file: '', isError: true };
    const fileSizeInKBytes = +process.env.MAX_LOG_FILE_SIZE || DEFAULT_SIZE;
    this.maxFileSize = fileSizeInKBytes * BYTES_PER_KB;
    this.mutex = new Mutex();
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeFilehandle(this.messageLog);
    await this.closeFilehandle(this.errorLog);
  }

  async log(message: any): Promise<void> {
    const fullMsg = this.createFullMessage(message, 'LOG');
    console.log(fullMsg);
    await this.write(fullMsg, this.messageLog);
  }

  async warn(message: any): Promise<void> {
    const fullMsg = this.createFullMessage(message, 'WARNING');
    console.warn(fullMsg);
    await this.write(fullMsg, this.messageLog);
  }

  async error(message: any): Promise<void> {
    const fullMsg = this.createFullMessage(message, 'ERROR');
    console.error(fullMsg);
    await this.write(fullMsg, this.messageLog);
    await this.write(fullMsg, this.errorLog);
  }

  async debug(message: any): Promise<void> {
    const fullMsg = this.createFullMessage(message, 'DEBUG');
    console.debug(fullMsg);
    await this.write(fullMsg, this.messageLog);
  }

  async verbose(message: any, ...optionalParams: any[]): Promise<void> {
    const fullMsg = this.createFullMessage(message, 'VERBOSE');
    console.log(fullMsg, optionalParams);
    await this.write(fullMsg, this.messageLog);
  }

  private createFullMessage(msg: string, level: string): string {
    const date = formatDate(new Date());
    return `[${date}] [${level}:] ${msg}`;
  }

  private async write(fullMsg: string, log: ILog): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      if (!log.handle || !(await this.isFileExist(log.file))) {
        await this.initFileHandle(log);
      } else {
        const stats = await stat(log.file);
        const fileLen = stats.size + Buffer.byteLength(fullMsg, 'utf8');
        if (fileLen >= this.maxFileSize) {
          await log.handle.close();
          console.log('\n BEFORE RENAME');
          await rename(log.file, log.file.replace('.log', '.old.log'));
          await this.initFileHandle(log);
        }
      }
      console.log('\nWrite');
      await log.handle.writeFile(fullMsg + '\n');
    } finally {
      release();
    }
  }

  private async initFileHandle(log: ILog): Promise<void> {
    const dirName = log.isError ? 'error-logs' : 'logs';
    const timestamp = Date.now();
    await this.createDirIfNotExists(dirName);
    const fullpath = join(`./${dirName}`, timestamp.toString() + '.log');
    log.handle = await open(fullpath, 'w');
    log.file = fullpath;
  }

  private async closeFilehandle(log: ILog): Promise<void> {
    if (log.handle) {
      log.handle.write('CLOSE!!!!!!!!!!!!');
      await log.handle.close();
      log.handle = undefined;
      log.file = '';
    }
  }

  private async createDirIfNotExists(dirName: string): Promise<void> {
    const isDirNotExists = !(await stat(dirName).catch(() => false));
    if (isDirNotExists) {
      await mkdir(join('./', dirName), { recursive: true });
    }
  }

  private async isFileExist(path: string): Promise<boolean> {
    try {
      return (await stat(path)).isFile();
    } catch (err) {
      return false;
    }
  }
}
