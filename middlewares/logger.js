const { logger } = require('../utils/winston');

const info = (req, res, next) => {
    logger.info(`ruta ${req.url}, método ${req.method}`)
    next()
}


const errorRoute = (req, res, next) => {
    logger.warn(`ruta ${req.url}, método ${req.method} no implementada`)
    res.status(404).send({
        error: 404,
        descripción: `ruta ${req.url}, método ${req.method} no implementada`
    })
}

const catchError = (error, req, res, next) => {
    logger.error(error.message)
    res.status(500).send(error.message);
}

module.exports = {
    info,errorRoute,catchError
}