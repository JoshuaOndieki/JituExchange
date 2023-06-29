import joi from 'joi'

const newQuestionSchema = joi.object({
    summary: joi.string().required(),
    details: joi.string().required(),
    tags: joi.array().required().items(joi.string().pattern(new RegExp(/^[a-zA-Z0-9-]+$/)))
})

export default newQuestionSchema