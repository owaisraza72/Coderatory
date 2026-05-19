import { createLogger, format, transports } from 'winston'
import util from 'util'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import path from 'path'

import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'

// ❌ remove this
// import 'winston-mongodb'
// import { MongoDBTransportInstance } from 'winston-mongodb'

// linking source map
sourceMapSupport.install()

const colorize = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const logFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorize(level.toUpperCase())

    const customTimestamp = green(timestamp as string)
    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('Meta')} ${customMeta}\n`

    return customLog
})

const fileFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        timestamp,
        message,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), logFormat)
            })
        ]
    }

    return []
}

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },

    // ✅ MongoDB logger removed
    transports: [...fileTransport(), ...consoleTransport()]
})