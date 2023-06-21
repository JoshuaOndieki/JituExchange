import joi from 'joi'

const signinSchema = joi.object({
identifier: joi.string().required(),
password: joi.string().required()
})

export default signinSchema