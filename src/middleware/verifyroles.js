const commonHelper = require('../helper/common');

const verify = (permission) => {
    return (req, res, next) => {
        const userRole = req.payload.role
        if (permission.includes(userRole)) {
            next()
        } else {
            return commonHelper.response(res, null, 401, 'You dont have permission')
        }
    }
}

module.exports = { verify }