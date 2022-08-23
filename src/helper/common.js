const response = (res, result, status, message, pagination) => {
    const resultPrint = {}
    resultPrint.status = 'Success'
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    resultPrint.pagination = pagination || null
    res.status(status).json(resultPrint)
}

module.exports = {response}