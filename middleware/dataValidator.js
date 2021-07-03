function DataValidator(check = "body",schema) {
    return (req, res, next) => {
        var data = req[check]
        const { error, value } = schema.validate(data)
        if (error) {
            res.status(406).json({
                msg: error.details[0].message,
            })
        } else {
            req[req] = value
            next()
        }
    }
}

module.exports.DataValidator = DataValidator