const winston = require("winston");
const {combine , timestamp , prettyPrint } = winston.format 
require("winston-mongodb");
const config = require("config");
const logger = winston.createLogger({
    level:"debug",
    format : combine(
        timestamp({
            format : "MMM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint()
    ),
    transports : [
        new winston.transports.File({filename : "logger.log"}),
        new winston.transports.MongoDB({
            level : "error",
            db : `mongodb+srv://${config.get("username")}:${config.get("password")}@cluster0.ue3lqy9.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`,
            options : {
                useUnifiedTopology : true
            },
            collection : "LogErrorCollection"
        })
    ]
})
module.exports = logger;