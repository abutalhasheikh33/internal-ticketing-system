import chalk from 'chalk';
import type { Logger } from './logger';

function timeStamp(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

export const consoleLogger: Logger = {
    info(message: string) {
        console.log(
            chalk.gray(timeStamp()),
            chalk.blue('[INFO]'),
            message
        );
    },

    error(message: string) {
        console.error(
            chalk.gray(timeStamp()),
            chalk.red('[ERROR]'),
            message
        );
    },
};
