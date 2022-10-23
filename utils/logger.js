const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ maxFiles:20,filename: 'utils/logs/warn.log', level: 'warn' }),
        new winston.transports.File({ maxFiles:20,filename: 'utils/logs/error.log', level: 'error' })
    ]
})

module.exports = {
    logger
}